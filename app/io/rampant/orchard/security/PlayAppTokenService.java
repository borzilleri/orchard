package io.rampant.orchard.security;

import models.User;
import play.mvc.Http;

/**
 * @author jonathan
 */
public class PlayAppTokenService implements AppTokenService {
	private Http.Context ctx;

	public PlayAppTokenService(Http.Context context) {
		ctx = context;
	}

	@Override
	public String current() {
		// TODO: Probably want to inject that string too
		Http.Cookie c = ctx.request().cookie(User.AUTH_COOKIE_NAME);
		if( c == null || c.value().isEmpty() ) {
			return null;
		}
		return c.value();
	}
}
