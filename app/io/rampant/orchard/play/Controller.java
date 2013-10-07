package io.rampant.orchard.play;

import play.libs.Json;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

/**
 * @author jonathan
 */
public class Controller extends play.mvc.Controller {
	private Set<String> components = new HashSet<>();
	private Map<String, Object> pageData = new HashMap<>();

	protected void addComponent(String component) {
		components.add(component);
	}

	protected void addData(String key, Object value) {
		pageData.put(key, value);
	}

	protected String getPageData() {
		//components.add("adminBar");

		Map<String, Object> data = new HashMap<String, Object>();
		data.put("components", components);
		data.put("data", pageData);
		return Json.toJson(data).toString();
	}

}
