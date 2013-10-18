package controllers.admin;

import be.objectify.deadbolt.java.actions.Group;
import be.objectify.deadbolt.java.actions.Restrict;
import io.rampant.orchard.mongo.dao.UserDAO;
import io.rampant.orchard.play.Controller;
import play.mvc.Result;

import javax.inject.Inject;

/**
 * @author jonathan
 */

@Restrict({@Group("ADMIN")})
public class Users extends Controller {
	UserDAO userDAO;

	@Inject
	public Users(UserDAO users) {
		userDAO = users;
	}

	public Result index() {
		addComponent("userList");
		addData("users", userDAO.find().asList());
		return ok(views.html.admin.users.render("Users", userDAO.current(), getPageData()));
	}
}
