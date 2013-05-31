package io.rampant.orchard;

import com.github.jmkgreen.morphia.logging.MorphiaLoggerFactory;
import com.github.jmkgreen.morphia.logging.slf4j.SLF4JLogrImplFactory;
import com.google.inject.Guice;
import com.google.inject.Injector;
import io.rampant.orchard.dao.UserDAO;
import io.rampant.orchard.modules.OrchardModule;
import io.rampant.orchard.modules.PlayModule;
import models.User;
import play.Application;
import play.GlobalSettings;

/**
 * @author Jonathan Bozilleri
 */
public class Global extends GlobalSettings {
	static Injector injector;

	@Override
	public void beforeStart(Application application) {
		MorphiaLoggerFactory.reset();
		MorphiaLoggerFactory.registerLogger(SLF4JLogrImplFactory.class);
		injector = Guice.createInjector(new OrchardModule(), new PlayModule());
	}

	@Override
	public void onStart(Application application) {
		/**
		 * FIXME: Abstract this out somewhere?
		 *
		 * This is sort of hacky. We probably want to initialize some database
		 * data. This is a great place to *trigger* it, but not a great place to
		 * keep it. meh.
		 */
		UserDAO dao = injector.getInstance(UserDAO.class);
		User user = dao.findByEmail("jonathan@borzilleri.net");
		if( null == user ) {
			user = new User();
			user.email = "jonathan@borzilleri.net";
			dao.save(user);
		}
	}

	@Override
	public <A> A getControllerInstance(Class<A> aClass) throws Exception {
		return injector.getInstance(aClass);
	}

	public static Injector getInjector() {
		return injector;
	}
}
