package controllers;

import org.joda.time.Seconds;
import play.mvc.Controller;
import play.mvc.Result;

/**
 * @author jonathan
 */
public class Auth extends Controller {

	public Result login() {
		return ok("login method");
	}

	public Result logout() {
		// Clear Cookie
		return ok("logout method");
	}

	public Result authenticate(String authToken) {
		/**
		 * TODO: Replace this with checking for the token in the DB.
		 */
		if( authToken.isEmpty() ) {
			// TODO: Maybe this is a 403?
			return redirect(routes.Auth.login());
		}
		else {
			// Generate a new app token
			String appToken = "1";

			// Determine Cookie Max Age
			// If the Auth Token record had "remember me", set this for a year
			/**
			 * TODO: replace this with a proper check of the record.
			 */
			//Seconds maxAge = Seconds.secondsBetween(DateTime.now(), DateTime.now().plusYears(1));
			Seconds maxAge = Seconds.seconds(0);

			// Set it in a cookie
			response().setCookie("tmp_orchard_cookie", appToken, maxAge.getSeconds());

			// Send us back to the index.
			return redirect(routes.Application.index());
		}
	}

}
