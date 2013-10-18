package controllers;

import com.fasterxml.jackson.databind.node.ObjectNode;
import com.google.inject.Inject;
import com.typesafe.plugin.MailerAPI;
import io.rampant.orchard.mongo.dao.UserDAO;
import io.rampant.orchard.security.AuthManagerService;
import models.LoginForm;
import models.User;
import org.joda.time.DateTime;
import org.joda.time.Seconds;
import play.Configuration;
import play.Logger;
import play.Play;
import play.data.Form;
import play.libs.F;
import play.libs.Json;
import play.libs.WS;
import play.mvc.Controller;
import play.mvc.Http;
import play.mvc.Result;
import views.html.auth.login;
import views.html.auth.tokenSentEmailHtml;
import views.html.auth.tokenSentEmailText;

import java.util.Map;

import static play.data.Form.form;

/**
 * @author jonathan
 */
public class Auth extends Controller {
	private MailerAPI mailer;
	private UserDAO userDAO;
	private AuthManagerService tokenManager;

	@Inject
	public Auth(MailerAPI mailer, AuthManagerService tokenManagerService, UserDAO userDAO) {
		this.mailer = mailer;
		this.tokenManager = tokenManagerService;
		this.userDAO = userDAO;
	}

	public Result admin() {
		return ok(views.html.auth.admin.render(null));
	}

	public Result adminLogin() {
		Map<String, String[]> data = request().body().asFormUrlEncoded();
		if( !data.containsKey("password") || data.get("password").length == 0 ) {
			return badRequest(views.html.auth.admin.render(null));
		}
		String password = data.get("password")[0];

		if( !Play.application().configuration().getString("auth.admin.password").equalsIgnoreCase(password) ) {
			return unauthorized(views.html.auth.admin.render("Invalid Password"));
		}

		// FIXME: Inject this.

		User admin = userDAO.findByEmail("admin");
		String appToken = admin.makeToken();

		Logger.info("app token made: " + appToken);
		userDAO.save(admin);
		// Set it in a cookie
		response().setCookie(Play.application().configuration()
			.getString("auth.cookie.name"), appToken, null);
		return redirect(routes.Application.index());
	}

	public Result login() {
		return ok(views.html.auth.login.render(form(LoginForm.class)));
	}

	public F.Promise<Result> sendToken() {
		final Form<LoginForm> loginForm = form(LoginForm.class).bindFromRequest();

		if( loginForm.hasErrors() ) {
			return F.Promise.promise(new F.Function0<Result>() {
				@Override
				public Result apply() throws Throwable {
					return badRequest(login.render(loginForm));
				}
			});
		}
		else {
			LoginForm loginUser = loginForm.get();
			User user = userDAO.findByEmail(loginForm.get().email);
			if( null == user || !user.canLogin() ) {
				loginForm.reject("email", "Invalid email address.");
				return F.Promise.promise(new F.Function0<Result>() {
					@Override
					public Result apply() throws Throwable {
						return forbidden(login.render(loginForm));
					}
				});
			}
			String authToken = tokenManager.generateAuthToken(loginUser.email, loginUser.rememberMe);

			// FIXME: Dep-Inject this.
			Configuration conf = Play.application().configuration();
			String loginUrl = "http://" + request().host() + "/login/" + authToken;
			// FIXME: Abstract this email sending out somewhere.
			ObjectNode mailData = Json.newObject();
			mailData.put("From", conf.getString("mailer.from"));
			mailData.put("To", loginForm.get().email);
			// TODO: Date & Time Here.
			mailData.put("Subject", "Orchard BBS Login Link");
			mailData.put("HtmlBody", tokenSentEmailHtml.render(loginUrl).body());
			mailData.put("TextBody", tokenSentEmailText.render(loginUrl).body());
			F.Promise<WS.Response> mailResponse = WS.url(conf.getString("postmark.api.url"))
					.setHeader(conf.getString("postmark.api.header"), conf.getString("postmark.api.key"))
					.post(mailData);

			return mailResponse.map(new F.Function<WS.Response, Result>() {
				@Override
				public Result apply(WS.Response response) throws Throwable {
					Logger.debug(response.getStatus() + " " + response.getStatusText());
					return ok(views.html.auth.tokenSent.render(loginForm.get().email));
				}
			});
		}
	}

	public Result logout() {
		response().discardCookie(Play.application().configuration()
				.getString("auth.cookie.name"));
		return redirect(routes.Application.index());
	}

	public Result authenticate(String authToken) {
		if( !tokenManager.authTokenExists(authToken) ) {
			/**
			 * Maybe display some error here?
			 */
			return redirect(routes.Auth.login());
		}
		else {
			User user = tokenManager.getUser(authToken);
			boolean persistLogin = tokenManager.isPersistentLogin(authToken);

			// Generate a new app token
			String appToken = user.makeToken();

			Logger.info("app token made: " + appToken);
			userDAO.save(user);

			// Determine Cookie Max Age
			// If the Auth Token record had "remember me", set this for a year
			Integer maxAge = null;
			if( persistLogin ) {
				maxAge = Seconds.secondsBetween(DateTime.now(), DateTime.now().plusYears(1)).getSeconds();
				Logger.info("Persisting login, cookie maxAge:" + maxAge);
			}

			// Set it in a cookie
			response().setCookie(Play.application().configuration()
					.getString("auth.cookie.name"), appToken, maxAge);

			tokenManager.resolveAuthToken(authToken);

			// Send us back to the index.
			return redirect(routes.Application.index());
		}
	}

}
