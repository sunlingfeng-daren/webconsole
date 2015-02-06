package org.danielsoft.webconsole.ui;

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;

import org.apache.commons.io.IOUtils;
import org.osgi.framework.Bundle;
import org.osgi.framework.BundleContext;
import org.osgi.framework.BundleEvent;
import org.osgi.framework.BundleListener;

// this extender is supposed to listen for new bundles installed and uninstalled!
public class Extender implements BundleListener {

	public static final String WEB_CONSOLE_EXTENSION_HEADER = "WebConsole-Extension";

	private ExtensionManager extensionManager;

	public Extender(ExtensionManager extensionManager) {
		this.extensionManager = extensionManager;
	}

	public void bundleChanged(BundleEvent event) {
		Bundle bundle = event.getBundle();
		if (BundleEvent.STARTED == event.getType()) {
			System.out.println("Bundle started: " + bundle.getSymbolicName());
			// check if this bundle is a web console extension, it should have a WebConsole-Extension manifest header
			// pointing to webconsole-plugin.xml location
			String header = (String) bundle.getHeaders().get(WEB_CONSOLE_EXTENSION_HEADER);
			System.out.println("Web console - extension: " + header);
			if (header != null) {
				URL url = bundle.getResource(header);
				try {
					InputStream is = url.openStream();
					System.out.println("is: " + is);
					String content = IOUtils.toString(is);
					System.out.println("ccc: " + content);
					extensionManager.register(null);
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		} else if (BundleEvent.STOPPED == event.getType()) {
			System.out.println("Bundle stopped: " + event.getBundle().getSymbolicName());
		}
	}

}
