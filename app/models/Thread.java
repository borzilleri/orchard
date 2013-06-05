package models;

import com.github.jmkgreen.morphia.annotations.Embedded;
import com.github.jmkgreen.morphia.annotations.Entity;
import com.github.jmkgreen.morphia.annotations.Id;
import org.bson.types.ObjectId;
import play.data.validation.Constraints;

import java.util.List;

/**
 * @author jonathan
 */
@Entity("threads")
public class Thread {
	@Id
	public ObjectId id;

	@Constraints.Required
	public String title;
	public String slug;
	@Embedded
	public List<Post> posts;
}
