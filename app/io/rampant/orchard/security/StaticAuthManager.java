package io.rampant.orchard.security;

import com.google.inject.Inject;
import com.google.inject.Singleton;
import com.typesafe.config.Config;
import io.rampant.orchard.mongo.dao.UserDAO;
import models.User;
import org.joda.time.DateTime;

import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

/**
 * @author jonathan
 */
@Singleton
public class StaticAuthManager implements AuthManagerService {
	private UserDAO dao;
	private Config appConfig;
	private ConcurrentHashMap<String, TokenUser> tokenMap = new ConcurrentHashMap<>();

	@Inject
	public StaticAuthManager(UserDAO userDAO, Config conf) {
		this.dao = userDAO;
		this.appConfig = conf;
	}

	@Override
	public String generateAuthToken(String email, boolean persistentLogin) {
		String authToken = UUID.randomUUID().toString();
		tokenMap.put(authToken, new TokenUser(email, persistentLogin,
			appConfig.getInt("auth.token.timeout")));
		return authToken;
	}

	@Override
	public boolean authTokenExists(String authToken) {
		if( tokenMap.containsKey(authToken) ) {
			if( tokenMap.get(authToken).isExpired() ) {
				tokenMap.remove(authToken);
				return false;
			}
			return true;
		}
		return false;
	}

	@Override
	public User getUser(String authToken) {
		if( authTokenExists(authToken) ) {
			return dao.findByEmail(tokenMap.get(authToken).email);
		}
		return null;
	}

	@Override
	public boolean isPersistentLogin(String authToken) {
		return authTokenExists(authToken) && tokenMap.get(authToken).persistLogin;
	}

	@Override
	public void resolveAuthToken(String authToken) {
		tokenMap.remove(authToken);
	}

	class TokenUser {
		String email;
		boolean persistLogin;
		DateTime expiresOn;

		public TokenUser(String email, boolean persistLogin, int expiresInMinutes) {
			this.email = email;
			this.persistLogin = persistLogin;
			this.expiresOn = DateTime.now().plusMinutes(expiresInMinutes);
		}

		public boolean isExpired() {
			return expiresOn.isBeforeNow();
		}

	}
}
