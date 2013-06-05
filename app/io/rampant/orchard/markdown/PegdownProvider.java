package io.rampant.orchard.markdown;

import com.google.inject.Provider;
import org.pegdown.Parser;
import org.pegdown.PegDownProcessor;

/**
 * @author jonathan
 */
public class PegDownProvider implements Provider<PegDownProcessor> {
	int options = Parser.SMARTYPANTS & Parser.HARDWRAPS & Parser.AUTOLINKS &
		Parser.FENCED_CODE_BLOCKS & Parser.SUPPRESS_ALL_HTML;

	@Override
	public PegDownProcessor get() {
		return new PegDownProcessor(options);
	}
}
