package io.rampant.orchard.util;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import play.libs.Json;

import java.util.HashMap;
import java.util.Map;

/**
 * @author jonathan
 */
public class JsonUtils {

	public static ObjectNode buildPageData(ObjectNode data, String key, Object value) {
		data.put(key, Json.toJson(value));
		return data;
	}

	public static JsonNode jsonError(String msg) {
		Map<String, String> error = new HashMap<>();
		error.put("error", msg);
		return Json.toJson(error);
	}


}
