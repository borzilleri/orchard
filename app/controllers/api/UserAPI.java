package controllers.api;

import be.objectify.deadbolt.java.actions.Group;
import be.objectify.deadbolt.java.actions.Restrict;
import be.objectify.deadbolt.java.actions.SubjectPresent;
import io.rampant.orchard.mongo.dao.UserDAO;
import io.rampant.orchard.util.JsonUtils;
import models.User;
import play.data.Form;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;

import javax.inject.Inject;

/**
 * @author jonathan
 *
 * TODO: Handle "Deleted" users correctly.
 */
@SubjectPresent(content = "xhr")
public class UserAPI extends Controller {
	UserDAO users;

	@Inject
	public UserAPI(UserDAO userDAO) {
		users = userDAO;
	}

	private boolean isUserOrAdmin(String userId) {
		return users.current().isAdmin() || users.current().getId().equalsIgnoreCase(userId);
	}

	public Result get(String id) {
		User user = users.get(id);
		if( null == user ) {
			return notFound(JsonUtils.jsonError("Unknown userId: " + id));
		}
		return ok(Json.toJson(user));
	}

	/**
	 * A user may only update themselves, ADMIN users may update anyone.
	 *
	 * @return
	 */
	public Result update(String id) {
		if( !isUserOrAdmin(id) ) {
			return unauthorized(JsonUtils.jsonError("You may not update that user."));
		}
		User u = users.get(id);
		if( null == u ) {
			return notFound(JsonUtils.jsonError("Unknown userId: " + id));
		}
		return ok();
	}

	/**
	 * A user may remove themselves, ADMIN users may remove anyone.
	 * <p/>
	 * NOTE: An ADMIN user CAN remove themselves. Don't do that.
	 *
	 * @return
	 */
	public Result remove(String id) {
		if( !isUserOrAdmin(id) ) {
			return unauthorized(JsonUtils.jsonError("You may not update that user."));
		}
		User u = users.get(id);
		if( null == u ) {
			return notFound(JsonUtils.jsonError("Unknown userId: " + id));
		}
		// TODO: maybe abstract this?
		if( u.email.equalsIgnoreCase("admin") ) {
			return badRequest(JsonUtils.jsonError("Cannot delete system admin."));
		}
		u.deleted = true;
		users.save(u);
		return ok();
	}


	@Restrict({@Group("ADMIN")})
	public Result add() {
		Form<User> form = Form.form(User.class).bindFromRequest();
		if( form.hasErrors() ) {
			return badRequest(form.errorsAsJson());
		}
		User u = form.get();

		if( null != users.findByEmail(u.email) ) {
			return status(CONFLICT, JsonUtils.jsonError("Email address already exists."));
		}

		users.save(u);
		return ok(Json.toJson(u));
	}

}
