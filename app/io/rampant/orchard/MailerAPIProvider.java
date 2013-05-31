/*
 * Created by IntelliJ IDEA.
 * User: jonathan
 * Date: 5/29/13
 * Time: 10:11 PM
 */
package io.rampant.orchard;

import com.google.inject.Provider;
import com.typesafe.plugin.MailerAPI;
import com.typesafe.plugin.MailerPlugin;

public class MailerAPIProvider implements Provider<MailerAPI> {
	public MailerAPI get() {
		return play.Play.application().plugin(MailerPlugin.class).email();
	}
}
