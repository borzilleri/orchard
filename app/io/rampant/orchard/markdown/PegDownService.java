package io.rampant.orchard.markdown;

import com.google.inject.Inject;
import org.pegdown.PegDownProcessor;

/**
 * @author jonathan
 */
public class PegDownService implements MarkdownService {
	PegDownProcessor processor;

	@Inject
	public PegDownService(PegDownProcessor processor) {
		this.processor = processor;
	}

	@Override
	public String parse(String markdown) {
		return processor.markdownToHtml(markdown);
	}
}
