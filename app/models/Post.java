package models;

import com.github.jmkgreen.morphia.annotations.Reference;
import org.codehaus.jackson.annotate.JsonIgnore;
import play.data.validation.Constraints;

import java.util.Date;

/**
 * @author jonathan
 */
public class Post {
	@Constraints.Required
	public String contentSource;
	public String contentHtml;
	public Date createdOn;
	public Date modifiedOn;

	@Reference(lazy = true)
	public User modifiedBy;

	@Reference
	public User author;

}
