package io.rampant.orchard.util;

import java.text.Normalizer;
import java.util.Locale;
import java.util.regex.Pattern;

/**
 * @author jonathan
 */
public class StringUtils {
	static final Pattern WHITESPACE = Pattern.compile("[\\s]");
	static final Pattern NONLATIN = Pattern.compile("[^\\w-]");

	public String slugify(String source) {
		source = WHITESPACE.matcher(source).replaceAll("-");
		source = Normalizer.normalize(source, Normalizer.Form.NFD);
		source = NONLATIN.matcher(source).replaceAll("");
		return source.toLowerCase(Locale.ENGLISH);
	}
}
