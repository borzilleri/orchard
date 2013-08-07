package models;

import com.github.jmkgreen.morphia.annotations.Embedded;
import com.github.jmkgreen.morphia.annotations.Entity;
import com.github.jmkgreen.morphia.annotations.Id;
import controllers.routes;
import org.bson.types.ObjectId;
import play.data.validation.Constraints;

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

	@Embedded
	public List<Post> posts;

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
		return null == posts ? author.getDisplayName() :
		       posts.get(0).author.getDisplayName();
	}

}
