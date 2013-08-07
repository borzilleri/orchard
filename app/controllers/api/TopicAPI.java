package controllers.api;

import be.objectify.deadbolt.java.actions.SubjectPresent;
import com.google.inject.Inject;
import io.rampant.orchard.dao.ThreadDAO;
import io.rampant.orchard.dao.UserDAO;
import io.rampant.orchard.markdown.MarkdownService;
import io.rampant.orchard.util.StringUtils;
import models.Post;
import models.Topic;
import org.bson.types.ObjectId;
import org.joda.time.DateTime;
import play.data.Form;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;

/**
 * @author jonathan
 */
@SubjectPresent(content = "xhr")
public class TopicAPI extends Controller {
	ThreadDAO threads;
	UserDAO users;
	MarkdownService markdown;
	StringUtils stringUtils;

	@Inject
	public TopicAPI(ThreadDAO threadDAO, UserDAO userDAO, MarkdownService markdownService, StringUtils sUtil) {
		threads = threadDAO;
		users = userDAO;
		markdown = markdownService;
		stringUtils = sUtil;
	}

	public Result create() {
		Form<Topic> form = Form.form(Topic.class).bindFromRequest();

		if( form.hasErrors() || form.hasGlobalErrors() ) {
			return badRequest(form.errorsAsJson());
		}

		Topic t = form.get();
		t.slug = stringUtils.slugify(t.title);
		t.author = users.current();
		t.createdOn = new DateTime();
		t.contentHtml = markdown.parse(t.contentSource);

		threads.save(t);
		return ok(Json.toJson(t));
	}

	public Result updatePost(String threadId, Integer postIndex) {
		Topic t = threads.get(new ObjectId(threadId));
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
