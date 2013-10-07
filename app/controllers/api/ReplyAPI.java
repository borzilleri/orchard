package controllers.api;

import be.objectify.deadbolt.java.actions.SubjectPresent;
import com.google.inject.Inject;
import io.rampant.orchard.markdown.MarkdownService;
import io.rampant.orchard.mongo.dao.ThreadDAO;
import io.rampant.orchard.mongo.dao.UserDAO;
import io.rampant.orchard.util.StringUtils;
import models.Topic;
import models.Reply;
import org.joda.time.DateTime;
import play.data.Form;
import play.libs.F;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;

@SubjectPresent(content = "xhr")
public class ReplyAPI extends Controller {
	ThreadDAO topics;
	UserDAO users;
	MarkdownService markdown;
	StringUtils stringUtils;

	@Inject
	public ReplyAPI(ThreadDAO threadDAO, UserDAO userDAO, MarkdownService markdownService, StringUtils sUtil) {
		topics = threadDAO;
		users = userDAO;
		markdown = markdownService;
		stringUtils = sUtil;
	}

	public F.Promise<Result> create(final String topicId) {
		return F.Promise.promise(new F.Function0<Result>() {
			@Override
			public Result apply() throws Throwable {
				Topic t = topics.get(topicId);
				if( null == t ) {
					return notFound();
				}
				Form<Reply> form = Form.form(Reply.class).bindFromRequest();
				if( form.hasErrors() ) {
					return badRequest(form.errorsAsJson());
				}
				Reply r = form.get();
				r.author = users.current();
				r.contentHtml = markdown.parse(r.contentSource);
				r.createdOn = DateTime.now();
				t.replies.add(r);
				topics.save(t);
				return ok(Json.toJson(r));
			}
		});
	}

	public Result update(final String topicId, final Integer replyIndex) {
		Topic t = topics.get(topicId);
		if( null == t || replyIndex >= t.replies.size() ) {
			return notFound();
		}
		Form<Reply> form = Form.form(Reply.class).bindFromRequest();
		if( form.hasErrors() ) {
			return badRequest(form.errorsAsJson());
		}
		Reply r = form.get();
		r.contentHtml = markdown.parse(r.contentSource);
		r.modifiedBy = users.current();
		r.modifiedOn = DateTime.now();
		t.replies.set(replyIndex, r);
		topics.save(t);
		return ok(Json.toJson(r));
	}
}
