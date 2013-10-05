package io.rampant.orchard.security;

import be.objectify.deadbolt.core.models.Role;

public enum Roles implements Role {
	ADMIN;

	@Override
	public String getName() {
		return name();
	}
}
