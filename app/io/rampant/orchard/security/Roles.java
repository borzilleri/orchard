package io.rampant.orchard.security;

import be.objectify.deadbolt.core.models.Role;

public enum Roles implements Role {
	POST,
	REPLY,
	ADMIN;

	@Override
	public String getName() {
		return name();
	}
}
