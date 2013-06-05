package models;

import com.github.jmkgreen.morphia.annotations.Embedded;
import com.github.jmkgreen.morphia.annotations.Reference;
import play.data.validation.Constraints;

import java.util.Date;

/**
 * @author jonathan
 */
@Embedded
public class Post {
	@Constraints.Required
	public String contentSource;
	public String contentHtml;
	public Date createdOn;
	public Date modifiedOn;

	@Reference(lazy = true)
	public User modifiedBy;
	@Reference(lazy = true)
	public User author;

}
