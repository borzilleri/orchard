package io.rampant.orchard.dao;

import com.github.jmkgreen.morphia.Morphia;
import com.github.jmkgreen.morphia.dao.BasicDAO;
import com.mongodb.Mongo;
import org.bson.types.ObjectId;

import javax.inject.Inject;

/**
 * @author jonathan
 */
public class ThreadDAO extends BasicDAO<models.Thread, ObjectId> {

	@Inject
	public ThreadDAO(Mongo mongo, Morphia morphia) {
		// TODO: Put this string in a config file
		super(mongo, morphia, "orchard");
	}

	public models.Thread findBySlug(String slug) {
		return ds.createQuery(entityClazz).field("slug").equal(slug).get();
	}

}
