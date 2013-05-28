package io.rampant.orchard.security;

import be.objectify.deadbolt.core.models.Subject;
import be.objectify.deadbolt.java.DeadboltHandler;
import be.objectify.deadbolt.java.DynamicResourceHandler;
import play.mvc.Http;
import play.mvc.Result;

import static play.mvc.Results.forbidden;

/**
 * @author jonathan
 */
public class OrchardDeadboltHandler implements DeadboltHandler {
	public final static String AUTH_COOKIE_NAME = "tmp_orchard_cookie";

	@Override
	public Result beforeAuthCheck(Http.Context context) {
		return null;
	}

	@Override
	public Subject getSubject(Http.Context context) {
		Http.Cookie c = context.request().cookie(AUTH_COOKIE_NAME);
		if( null != c ) {

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
