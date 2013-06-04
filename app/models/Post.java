package models;

import com.github.jmkgreen.morphia.annotations.Embedded;
import com.github.jmkgreen.morphia.annotations.Reference;

import java.util.Date;

/**
 * @author jonathan
 */
@Embedded
public class Post {
	public String contentSource;
	public String contentHtml;
	public Date createdOn;
	public Date modifiedOn;

	@Reference(lazy = true)
	public User modifiedBy;
	@Reference(lazy = true)
	public User author;

}
