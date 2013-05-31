package io.rampant.orchard.modules;

import com.github.jmkgreen.morphia.Morphia;
import com.google.inject.Provides;
import com.google.inject.Singleton;
import com.mongodb.Mongo;
import com.mongodb.MongoClient;
import com.typesafe.plugin.MailerAPI;
import io.rampant.orchard.MailerAPIProvider;
import io.rampant.orchard.security.AuthManagerService;
import io.rampant.orchard.security.StaticAuthManager;

import java.net.UnknownHostException;

public class OrchardModule extends com.google.inject.AbstractModule {
	protected void configure() {
		bind(AuthManagerService.class).to(StaticAuthManager.class).in(Singleton.class);
		bind(MailerAPI.class).toProvider(MailerAPIProvider.class);
	}

	@Provides
	@Singleton
	public Morphia provideMorphia() {
		return new Morphia();
	}

	@Provides
	@Singleton
	public Mongo provideMongo() throws UnknownHostException {
		return new MongoClient();
	}
}
