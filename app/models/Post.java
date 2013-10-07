package models;

import com.github.jmkgreen.morphia.annotations.PostLoad;
import com.github.jmkgreen.morphia.annotations.PrePersist;
import com.github.jmkgreen.morphia.annotations.Reference;
import com.github.jmkgreen.morphia.annotations.Transient;
import org.joda.time.DateTime;
import org.joda.time.DateTimeZone;
import play.data.validation.Constraints;

import java.util.Date;

/**
 * @author jonathan
 */
public class Post {
	private Date createDate;
	private String createDateTZ;
	private Date modifiedDate;
	private String modifiedDateTZ;
	@Transient
	public DateTime createdOn;
	@Transient
	public DateTime modifiedOn;

	@Reference
	public User author;

	@Constraints.Required
	public String contentSource;
	public String contentHtml;

	@Reference(lazy = true)
	public User modifiedBy;

	public boolean deleted = false;


	@PrePersist
	public void prePersist() {
		createDate = createdOn.toDate();
		createDateTZ = createdOn.getZone().getID();
		if( null != modifiedOn ) {
			modifiedDate = modifiedOn.toDate();
			modifiedDateTZ = createdOn.getZone().getID();
		}
	}

	@PostLoad
	public void postLoad() {
		createdOn = new DateTime(createDate, DateTimeZone.forID(createDateTZ));
		if( null == modifiedDate ) {
			modifiedOn = new DateTime(modifiedDate, DateTimeZone.forID(modifiedDateTZ));
		}
	}
}
