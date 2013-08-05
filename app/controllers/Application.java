package controllers;

import com.google.inject.Inject;
import io.rampant.orchard.dao.UserDAO;
import play.mvc.Controller;
import play.mvc.Result;
import views.html.index;

public class Application extends Controller {
	private UserDAO userDAO;

	@Inject
	public Application(UserDAO userDAO) {
		this.userDAO = userDAO;
	}

	public Result index() {
		return ok(index.render("OrchardBBS", userDAO.current()));
	}
}