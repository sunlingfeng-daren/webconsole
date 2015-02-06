package org.danielsoft.webconsole.extension.chart;

import java.util.Arrays;
import java.util.List;

import org.danielsoft.webconsole.extension.WebConsoleExtension;

public class ChartWebConsoleExtension implements WebConsoleExtension {

	public String getName() {
		return "Chart";
	}

	public String getDescription() {
		return "Displays a number of exported packages in each bundle";
	}

	public String getComponentClass() {
		return "chart.ChartWindow";
	}

	public List<String> getResources() {
		return Arrays.asList("chart/ChartWindow.js");
	}

}
