package models;

import be.objectify.deadbolt.core.models.Permission;
import be.objectify.deadbolt.core.models.Role;
import be.objectify.deadbolt.core.models.Subject;
import com.github.jmkgreen.morphia.annotations.Entity;
import com.github.jmkgreen.morphia.annotations.Id;
import com.google.common.base.Strings;
import org.bson.types.ObjectId;
import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.codehaus.jackson.annotate.JsonProperty;
import org.codehaus.jackson.annotate.JsonSetter;
import play.data.validation.Constraints;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * @author jonathan
 */
@Entity("users")
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.NONE, getterVisibility = JsonAutoDetect.Visibility.NONE)
public class User implements Subject {
	public final static String AUTH_COOKIE_NAME = "tmp_orchard_cookie";

	@Id
	private ObjectId id;
	private List<String> tokens = new ArrayList<>();

	@JsonProperty
	@Constraints.Required
	public String email;

	@JsonProperty
	public String displayName;

	@JsonProperty
	public String getDisplayName() {
		return Strings.isNullOrEmpty(displayName) ? email : displayName;
	}

	@JsonProperty
	public String getId() {
		if( null != id ) {
			return id.toString();
		}
		return null;
	}

	@JsonSetter
	public void setId(String id) {
		this.id = new ObjectId(id);
	}

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
