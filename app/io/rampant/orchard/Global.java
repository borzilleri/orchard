package io.rampant.orchard;

import com.github.jmkgreen.morphia.logging.MorphiaLoggerFactory;
import com.github.jmkgreen.morphia.logging.slf4j.SLF4JLogrImplFactory;
import com.google.inject.Guice;
import com.google.inject.Injector;
import io.rampant.orchard.mongo.dao.UserDAO;
import io.rampant.orchard.modules.OrchardModule;
import io.rampant.orchard.modules.PlayModule;
import io.rampant.orchard.security.Roles;
import models.User;
import org.joda.time.DateTime;
import org.joda.time.Period;
import play.Application;
import play.GlobalSettings;
import play.Logger;
import play.mvc.Action;
import play.mvc.Http;

import java.lang.reflect.Method;

/**
 * @author Jonathan Bozilleri
 */
public class Global extends GlobalSettings {
	static Injector injector;

	@Override
	public Action onRequest(Http.Request request, Method actionMethod) {
		final DateTime start = DateTime.now();
		Action result = super.onRequest(request, actionMethod);
		Logger.info("[" + new Period(start, DateTime.now()).getMillis() + "ms] " + request.method() + " " + request.uri());
		return result;
	}

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
		User user = dao.findByEmail("admin");
		if( null == user ) {
			user = new User();
			user.email = "admin";
			user.displayName = "Administrator";
			user.roles.add(Roles.ADMIN);
			dao.save(user);
		}
		user = dao.findByEmail("jonathan@borzilleri.net");
		if( null == user ) {
			user = new User();
			user.email = "jonathan@borzilleri.net";
			user.displayName = "Jonathan";
			user.roles.add(Roles.ADMIN);
			user.roles.add(Roles.POST);
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
