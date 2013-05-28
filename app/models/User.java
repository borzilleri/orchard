package models;

import be.objectify.deadbolt.core.models.Permission;
import be.objectify.deadbolt.core.models.Role;
import be.objectify.deadbolt.core.models.Subject;

import java.util.ArrayList;
import java.util.List;

/**
 * @author jonathan
 */
public class User implements Subject {
	public String email;
	public String displayName;

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
