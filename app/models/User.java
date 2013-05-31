package models;

import be.objectify.deadbolt.core.models.Permission;
import be.objectify.deadbolt.core.models.Role;
import be.objectify.deadbolt.core.models.Subject;
import com.github.jmkgreen.morphia.annotations.Entity;
import com.github.jmkgreen.morphia.annotations.Id;
import org.bson.types.ObjectId;
import play.data.validation.Constraints;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * @author jonathan
 */
@Entity("users")
public class User implements Subject {
	public final static String AUTH_COOKIE_NAME = "tmp_orchard_cookie";

	@Id
	public ObjectId id;

	@Constraints.Required
	public String email;
	public String displayName;
	public List<String> tokens = new ArrayList<>();

	/**
	 * Check to see if this user is allowed to login.
	 * <p/>
	 * For now this returns true. Real functionality should be added later.
	 *
	 * @return True if this user may login.
	 */
	public boolean canLogin() {
		return true;
	}

	public String makeToken() {
		String newToken = UUID.randomUUID().toString();
		tokens.add(newToken);
		return newToken;
	}

	@Override
	public List<? extends Role> getRoles() {
		return new ArrayList<>();
	}

	@Override
	public List<? extends Permission> getPermissions() {
		return new ArrayList<>();
	}

	@Override
	public String getIdentifier() {
		return email;
	}
}
