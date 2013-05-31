package io.rampant.orchard.security;

/**
 * @author jonathan
 */
public interface AppTokenService {

	/**
	 * Returns the "current" App Token.
	 * <p/>
	 * This will be the app token currently stored in the cookie/session/whatever
	 * that the web framework has access to.
	 *
	 * @return The current app token.
	 */
	public String current();
}
