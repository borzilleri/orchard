package controllers.api;

import com.google.inject.Inject;
import io.rampant.orchard.dao.ThreadDAO;
import io.rampant.orchard.dao.UserDAO;
import io.rampant.orchard.markdown.MarkdownService;
import io.rampant.orchard.util.StringUtils;
import models.Post;
import org.bson.types.ObjectId;
import play.data.Form;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;

import java.util.Date;

/**
 * @author jonathan
 */
public class ThreadAPI extends Controller {
	ThreadDAO threads;
	UserDAO users;
	MarkdownService markdown;
	StringUtils stringUtils;

	@Inject
	public ThreadAPI(ThreadDAO threadDAO, UserDAO userDAO, MarkdownService markdownService, StringUtils sUtil) {
		threads = threadDAO;
		users = userDAO;
		markdown = markdownService;
		stringUtils = sUtil;
	}

	public Result create() {
		Form<models.Thread> form = Form.form(models.Thread.class).bindFromRequest();

		if( form.hasErrors() || form.hasGlobalErrors() ) {
			return badRequest(form.errorsAsJson());
		}

		models.Thread t = form.get();
		t.slug = stringUtils.slugify(t.title);

		threads.save(t);
		return ok(Json.toJson(t));
	}

	public Result updatePost(String threadId, Integer postIndex) {
		models.Thread t = threads.get(new ObjectId(threadId));
		if( t.posts.size() <= postIndex ) {
			// TODO: Proper JS Error here.
			return badRequest();
		}

		Form<Post> form = Form.form(Post.class).bindFromRequest();
		// TODO: maybe call our own validation?
		if( form.hasErrors() || form.hasGlobalErrors() ) {
			// TODO: Proper JS Error here.
			return badRequest();
		}

		t.posts.set(postIndex, form.get());
		threads.save(t);

		return ok(Json.toJson(t.posts.get(postIndex)));
	}

	public Result getAll() {
		return ok(Json.toJson(threads.find().asList()));
	}
}
