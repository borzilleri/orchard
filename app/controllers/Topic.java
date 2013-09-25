package controllers;

import be.objectify.deadbolt.java.actions.SubjectPresent;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.google.inject.Inject;
import io.rampant.orchard.mongo.dao.ThreadDAO;
import io.rampant.orchard.mongo.dao.UserDAO;
import io.rampant.orchard.util.JsonUtils;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;

/**
 * @author jonathan
 */
public class Topic extends Controller {
	ThreadDAO threads;
	UserDAO users;

	@Inject
	public Topic(ThreadDAO threadDAO, UserDAO userDAO) {
		threads = threadDAO;
		users = userDAO;
	}

	@SubjectPresent
	public Result create() {
		return ok(views.html.thread.create.render(users.current()));
	}

	public Result get(String slug) {
		ObjectNode pageData = Json.newObject();

		models.Topic t = threads.findBySlug(slug);
		if( null == t ) {
			return notFound("Unknown thread.");
		}
		pageData = JsonUtils.buildPageData(pageData, "topic", t);
		return ok(views.html.thread.view.render(users.current(), t, pageData.toString()));
	}
}
