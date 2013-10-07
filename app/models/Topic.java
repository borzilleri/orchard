package models;

import com.github.jmkgreen.morphia.annotations.Embedded;
import com.github.jmkgreen.morphia.annotations.Entity;
import com.github.jmkgreen.morphia.annotations.Id;
import controllers.routes;
import org.bson.types.ObjectId;
import play.data.validation.Constraints;

import java.util.ArrayList;
import java.util.List;

/**
 * @author jonathan
 */
@Entity("topics")
public class Topic extends Post {
	@Id
	private ObjectId id;

	@Constraints.Required
	public String title;
	public String slug;
	public boolean closed = false;

	@Embedded
	public List<Reply> replies = new ArrayList<>();

	public void setId(String id) {
		this.id = new ObjectId(id);
	}

	public String getId() {
		if( null != id ) {
			return id.toString();
		}
		return null;
	}

	public String getUrl() {
		return routes.Topic.get(slug).url();
	}

	public String getLastAuthor() {
		return replies.size() == 0 ? author.getDisplayName() :
		       replies.get(0).author.getDisplayName();
	}

}
