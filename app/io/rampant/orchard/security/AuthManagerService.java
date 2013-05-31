package io.rampant.orchard.security;

import models.User;

/**
 * @author jonathan
 */
public interface AuthManagerService {
	public String generateAuthToken(String email, boolean persistentLogin);

	public boolean authTokenExists(String authToken);

	public User getUser(String authToken);

	public boolean isPersistentLogin(String authToken);

	public void resolveAuthToken(String authToken);
}
