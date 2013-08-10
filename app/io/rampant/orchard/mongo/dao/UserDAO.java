package io.rampant.orchard.mongo.dao;

import com.github.jmkgreen.morphia.Morphia;
import com.github.jmkgreen.morphia.dao.BasicDAO;
import com.mongodb.Mongo;
import com.typesafe.config.Config;
import io.rampant.orchard.security.AppTokenService;
import models.User;
import org.bson.types.ObjectId;

import javax.annotation.Nullable;
import javax.inject.Inject;
import java.util.ArrayList;

/**
 * @author jonathan
 */
public class UserDAO extends BasicDAO<User, ObjectId> {
	Config appConfig;
	AppTokenService tokenService;

	@Inject
	public UserDAO(Mongo mongo, Morphia morphia, Config conf, @Nullable AppTokenService service) {
		// TODO: Put this string in a config file
		super(mongo, morphia, "orchard");
		this.appConfig = conf;
		this.tokenService = service;
	}

	public void setTokenService(AppTokenService service) {
		tokenService = service;
	}

	public User get(String id) {
		return get(new ObjectId(id));
	}

	public User findByEmail(String email) {
		return ds.createQuery(entityClazz).field("email").equal(email).get();
	}

	public User findByToken(String appToken) {
		ArrayList<String> t = new ArrayList<>();
		t.add(appToken);
		return ds.createQuery(entityClazz).field("tokens").hasAnyOf(t).get();
	}

	public User current() {
		return findByToken(tokenService.current());
	}
}
