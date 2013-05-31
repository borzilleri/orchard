package models;

/**
 * @author jonathan
 */
public class LoginForm extends User {
	public Boolean rememberMe = false;

	public void setEmail(String email) {
		this.email = email;
	}
	public String getEmail() {
		return email;
	}

}
