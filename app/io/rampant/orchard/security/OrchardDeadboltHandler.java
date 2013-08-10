package io.rampant.orchard.security;

import be.objectify.deadbolt.core.models.Subject;
import be.objectify.deadbolt.java.DeadboltHandler;
import be.objectify.deadbolt.java.DynamicResourceHandler;
import io.rampant.orchard.Global;
import io.rampant.orchard.mongo.dao.UserDAO;
import models.User;
import play.mvc.Http;
import play.mvc.Result;

import static play.mvc.Results.forbidden;

/**
 * @author jonathan
 */
public class OrchardDeadboltHandler implements DeadboltHandler {

	@Override
	public Result beforeAuthCheck(Http.Context context) {
		return null;
	}

	@Override
	public Subject getSubject(Http.Context context) {
		Http.Cookie c = context.request().cookie(User.AUTH_COOKIE_NAME);
		// No Cookie, no auth'd user.
		if( null != c ) {
			String appToken = c.value();

			/**
			 * This is a touch hacky. We can't use proper Dependency Injection here,
			 * because this will get executed outside any context we have control
			 * over. But we can get the global object we defined, which is hanging
			 * on to the Guice injector. So we'll just grab our injector and get our
			 * instance manually.
			 */
			UserDAO dao = Global.getInjector().getInstance(UserDAO.class);
			return dao.findByToken(appToken);
		}
		return null;
	}

	@Override
	public Result onAuthFailure(Http.Context ctx, String content) {
		return forbidden("You do not have access to this resource.");
	}

	@Override
	public DynamicResourceHandler getDynamicResourceHandler(Http.Context context) {
		return null;
	}
}
