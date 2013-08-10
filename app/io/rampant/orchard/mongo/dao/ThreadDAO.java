package io.rampant.orchard.mongo.dao;

import com.github.jmkgreen.morphia.Morphia;
import com.github.jmkgreen.morphia.dao.BasicDAO;
import com.mongodb.Mongo;
import models.Topic;
import org.bson.types.ObjectId;

import javax.inject.Inject;

/**
 * @author jonathan
 */
public class ThreadDAO extends BasicDAO<Topic, ObjectId> {

	@Inject
	public ThreadDAO(Mongo mongo, Morphia morphia) {
		// TODO: Put this string in a config file
		super(mongo, morphia, "orchard");
	}

	public Topic findBySlug(String slug) {
		return ds.createQuery(entityClazz).field("slug").equal(slug).get();
	}

	public Topic get(String id) {
		return get(new ObjectId(id));
	}

}
