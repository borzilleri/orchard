package io.rampant.orchard.util;

import org.codehaus.jackson.JsonNode;
import play.libs.Json;

import java.util.HashMap;
import java.util.Map;

/**
 * @author jonathan
 */
public class JsonUtils {

	public static JsonNode jsonError(String msg) {
		Map<String, String> error = new HashMap<>();
		error.put("error", msg);
		return Json.toJson(error);
	}
}
