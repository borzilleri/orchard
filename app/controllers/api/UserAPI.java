package controllers.api;

import io.rampant.orchard.mongo.dao.UserDAO;
import io.rampant.orchard.util.JsonUtils;
import models.User;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;

import javax.inject.Inject;

/**
 * @author jonathan
 */
public class UserAPI extends Controller {
	UserDAO users;

	@Inject
	public UserAPI(UserDAO userDAO) {
		users = userDAO;
	}


	public Result get(String id) {
		User user = users.get(id);
		if( null == user ) {
			return notFound(JsonUtils.jsonError("Unknown userId: "+id));
		}
		return ok(Json.toJson(user));
	}
}
