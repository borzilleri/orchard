package io.rampant.orchard.modules;

import com.google.inject.AbstractModule;
import com.google.inject.Provides;
import com.typesafe.config.Config;
import com.typesafe.config.ConfigFactory;
import io.rampant.orchard.security.AppTokenService;
import io.rampant.orchard.security.PlayAppTokenService;
import play.mvc.Http;

/**
 * @author jonathan
 */

public class PlayModule extends AbstractModule {
	@Override
	protected void configure() {
	}

	@Provides
	public AppTokenService tokenServiceProvider() {
		try {
			return new PlayAppTokenService(Http.Context.current());
		}
		catch( RuntimeException e ) {
			// This probably means there's no Http Context available.
			return null;
		}
	}

	@Provides
	public Config appConfigProvider() {
		return ConfigFactory.load("application");
	}


}
