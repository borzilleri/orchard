package io.rampant.orchard;

import play.GlobalSettings;

/**
 * @author Jonathan Bozilleri
 */
public class Global extends GlobalSettings {

	@Override
	public <A> A getControllerInstance(Class<A> aClass) throws Exception {
		return aClass.newInstance();
	}
}
