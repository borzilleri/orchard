package controllers.api;

import be.objectify.deadbolt.java.actions.SubjectPresent;
import com.google.inject.Inject;
import io.rampant.orchard.markdown.MarkdownService;
import io.rampant.orchard.mongo.dao.ThreadDAO;
import io.rampant.orchard.mongo.dao.UserDAO;
import io.rampant.orchard.util.StringUtils;
import models.Topic;
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
	ThreadDAO topics;
	UserDAO users;
	MarkdownService markdown;
	StringUtils stringUtils;

	@Inject
	public TopicAPI(ThreadDAO threadDAO, UserDAO userDAO, MarkdownService markdownService, StringUtils sUtil) {
		topics = threadDAO;
		users = userDAO;
		markdown = markdownService;
		stringUtils = sUtil;
	}

	private Topic fill(Topic t) {
		t.slug = stringUtils.slugify(t.title);
		t.contentHtml = markdown.parse(t.contentSource);
		return t;
	}

	public Result list() {
		return ok(Json.toJson(topics.find().asList()));
	}

	public Result get(String id) {
		Topic t = topics.get(id);
		if( t == null || t.deleted ) {
			return notFound();
		}
		return ok(Json.toJson(t));
	}

	public Result getBySlug(String slug) {
		Topic t = topics.findBySlug(slug);
		if( t == null || t.deleted ) {
			return notFound();
		}
		return ok(Json.toJson(t));
	}

	public Result create() {
		Form<Topic> form = Form.form(Topic.class).bindFromRequest();
		if( form.hasErrors() || form.hasGlobalErrors() ) {
			return badRequest(form.errorsAsJson());
		}

		Topic t = fill(form.get());
		t.author = users.current();
		t.createdOn = DateTime.now();
		topics.save(t);
		return ok(Json.toJson(t));
	}

	public Result update(String topicId) {
		Form<Topic> form = Form.form(Topic.class).bindFromRequest();
		if( !form.field("id").valueOr(topicId).equalsIgnoreCase(topicId) ) {
			form.reject("id", "Form id differs from URI id.");
		}
		if( form.hasErrors() ) {
			return badRequest(form.errorsAsJson());
		}
		Topic t = fill(form.get());

		// TODO: User is admin check.
		if( !t.author.getId().equalsIgnoreCase(users.current().getId()) ) {
			return unauthorized("You do not have permission to edit this topic.");
		}

		t.modifiedBy = users.current();
		t.modifiedOn = DateTime.now();
		topics.save(t);
		return ok(Json.toJson(t));
	}

	public Result close(String topicId) {
		Topic t = topics.get(topicId);
		if( !t.author.getId().equalsIgnoreCase(users.current().getId()) ) {
			return unauthorized("You do not have permission to close this topic.");
		}
		t.closed = true;
		topics.save(t);
		return ok(Json.toJson(t));
	}

	public Result destroy(String topicId) {
		Topic t = topics.get(topicId);
		if( !t.author.getId().equalsIgnoreCase(users.current().getId()) ) {
			return unauthorized("You do not have permission to delete this topic.");
		}
		t.deleted = true;
		topics.save(t);
		return ok(Json.toJson(t));
	}

}
