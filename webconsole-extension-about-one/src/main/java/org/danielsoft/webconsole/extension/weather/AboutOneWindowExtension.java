package org.danielsoft.webconsole.extension.weather;

import java.util.Arrays;
import java.util.List;

import org.danielsoft.webconsole.extension.IAboutWindowExtension;
import org.danielsoft.webconsole.extension.WebConsoleExtension;

public class AboutOneWindowExtension implements IAboutWindowExtension {

	public String getName() {
		return "About One";
	}

	public String getDescription() {
		return "Displays weather forecast for a specific location";
	}

	public List<String> getResources() {
		return Arrays.asList("about/one/AboutWindow.js");
	}

	public String getComponentClass() {
		return "about.one.AboutWindow";
	}

}
