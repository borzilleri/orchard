package io.rampant.orchard.security;

import play.Play;
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
		Http.Cookie c = ctx.request().cookie(Play.application().configuration()
			.getString("auth.cookie.name"));
		if( c == null || c.value().isEmpty() ) {
			return null;
		}
		return c.value();
	}
}
