package models;

import com.github.jmkgreen.morphia.annotations.Converters;
import com.github.jmkgreen.morphia.annotations.Reference;
import io.rampant.orchard.mongo.DateTimeConverter;
import org.joda.time.DateTime;
import play.data.validation.Constraints;

/**
 * @author jonathan
 */
@Converters(DateTimeConverter.class)
public class Post {
	@Constraints.Required
	public String contentSource;
	public String contentHtml;
	public DateTime createdOn;
	public DateTime modifiedOn;

	@Reference(lazy = true)
	public User modifiedBy;

	@Reference
	public User author;

}
