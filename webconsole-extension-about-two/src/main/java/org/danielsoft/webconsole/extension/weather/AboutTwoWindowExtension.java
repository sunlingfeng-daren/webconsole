package org.danielsoft.webconsole.extension.weather;

import java.util.Arrays;
import java.util.List;

import org.danielsoft.webconsole.extension.IAboutWindowExtension;
import org.danielsoft.webconsole.extension.WebConsoleExtension;

public class AboutTwoWindowExtension implements IAboutWindowExtension {

	public String getName() {
		return "Two About";
	}

	public String getDescription() {
		return "Displays weather forecast for a specific location";
	}

	public List<String> getResources() {
		return Arrays.asList("about/two/AboutWindow.js");
	}

	public String getComponentClass() {
		return "about.two.AboutWindow";
	}

}
