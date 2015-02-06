package org.danielsoft.webconsole.service;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.danielsoft.webconsole.extension.WebConsoleExtension;
import org.osgi.framework.BundleContext;
import org.osgi.framework.InvalidSyntaxException;
import org.osgi.framework.ServiceReference;

@SuppressWarnings("serial")
public class IndexServlet extends HttpServlet {
	
	private BundleContext bundleContext;
	
	public IndexServlet(BundleContext bundleContext) {
		this.bundleContext = bundleContext;
	}
	
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException ,IOException {
		resp.setContentType("text/html");
		PrintWriter out = resp.getWriter();
		out.println(getContent());
	}
	
	String getContent() {
		StringBuilder sb = new StringBuilder();
		sb.append("<!DOCTYPE html>\n");
		sb.append("<!--\n");
		sb.append("Copyright 2010-2011 Daniel Pacak, Inc. All rights reserved.\n");
		sb.append("-->\n");
		sb.append("<html>\n");
		sb.append("<head>\n");
		sb.append("<meta http-equiv='Content-Type' content='text/html; charset=UTF-8' />\n");
		sb.append("<meta name='Author' content='Daniel Pacak, pacak.daniel@gmail.com' />\n");
		sb.append("<title>OSGi Web Console</title>\n");
		sb.append("<link rel='stylesheet' type='text/css' href='../extjs/4.1.0/resources/css/ext-all.css'>\n");
		sb.append("<link rel='stylesheet' type='text/css' href='./css/web-console.css'>\n");
		sb.append("<script type='text/javascript' src='../extjs/4.1.0/bootstrap.js'></script>\n");
		sb.append("<script type='text/javascript' src='./WebConsole.js'></script>\n");
		sb.append("<script type='text/javascript' src='./BundleInfoPanel.js'></script>\n");
		sb.append("<script type='text/javascript' src='./BundleInstallWindow.js'></script>\n");
		sb.append("<script type='text/javascript' src='./AboutWindow.js'></script>\n");
		sb.append("<script type='text/javascript' src='./MainPanel.js'></script>\n");
		sb.append("<script type='text/javascript' src='./BundlesPanel.js'></script>\n");
		sb.append("<script type='text/javascript' src='./ServicesPanel.js'></script>\n");
		sb.append("<script type='text/javascript' src='./SystemInfoPanel.js'></script>\n");
		sb.append("<script type='text/javascript' src='./GroovyConsolePanel.js'></script>\n");
		sb.append("<script type='text/javascript' src='./LogViewerPanel.js'></script>\n");
		sb.append("<script type='text/javascript' src='./BundlesDependenciesPanel.js'></script>\n");
		sb.append("<script type='text/javascript' src='./ExtensionsPanel.js'></script>\n");
		
		// extensions
		/*List<WebConsoleExtension> extensions = getInstalledExtensions();
		for (WebConsoleExtension extension : extensions) {
			sb.append(getScript(extension));
			sb.append("\n");
		}*/
		
		
		sb.append("<script type='text/javascript'>\n");
		sb.append("Ext.Loader.setConfig({enabled : true});\n");
		sb.append("Ext.Loader.setPath('Ext.ux', '../extjs/4.1.0/ux');\n");
		sb.append("Ext.require(['Ext.grid.*', 'Ext.data.*', 'Ext.ux.RowExpander'])\n");
		sb.append("Ext.onReady(function() {\n");
		sb.append("  Ext.QuickTips.init();\n");
		sb.append("  var app = Ext.create('WebConsole');\n");
		sb.append("});\n");
		sb.append("</script>\n");
		sb.append("</head>\n");
		sb.append("<body>\n");
		sb.append("</body>\n");
		sb.append("</html>\n");
		return sb.toString();
	}

	String getScript(WebConsoleExtension extension) {
		StringBuilder sb = new StringBuilder();
		sb.append("<!-- Web Console Extension : " + extension.getName() + " -->\n");
		for (String path : extension.getResources()) {
			sb.append(String.format("<script type='text/javascript' src='./%s'></script>\n", path));
		}
		return sb.toString();
	}

	List<WebConsoleExtension> getInstalledExtensions() {
		List<WebConsoleExtension> extensions = new ArrayList<WebConsoleExtension>();
		try {
			String webConsoleExtensionFilter = String.format("(objectClass=%s)", WebConsoleExtension.class.getName());
			ServiceReference[] refs = bundleContext.getServiceReferences(null, webConsoleExtensionFilter);
			if (refs != null) {
				for (ServiceReference ref : refs) {
					extensions.add((WebConsoleExtension) bundleContext.getService(ref));
				}
			}
		} catch (InvalidSyntaxException e) {
			// IGNORE THIS DUMB OSGi EXCEPTION
		}
		return extensions;
	}

}
