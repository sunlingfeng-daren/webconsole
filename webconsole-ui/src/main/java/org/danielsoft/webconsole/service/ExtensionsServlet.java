package org.danielsoft.webconsole.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.codehaus.jackson.map.ObjectMapper;
import org.danielsoft.webconsole.extension.WebConsoleExtension;
import org.osgi.framework.Bundle;
import org.osgi.framework.BundleContext;
import org.osgi.framework.Constants;
import org.osgi.framework.InvalidSyntaxException;
import org.osgi.framework.ServiceReference;

// lists available extension to web console
@SuppressWarnings("serial")
public class ExtensionsServlet extends HttpServlet {

	private BundleContext bundleContext;

	public ExtensionsServlet(BundleContext bundleContext) {
		this.bundleContext = bundleContext;
	}

	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		resp.setContentType("application/json");
		resp.setCharacterEncoding("UTF-8");
		ServiceReference[] extensions = getInstalledExtensions();
		JsonExtensions jsonExtensions = new JsonExtensions(extensions);
		ObjectMapper om = new ObjectMapper();
		om.writeValue(resp.getWriter(), jsonExtensions);
	}

	class JsonExtensions {
		List<JsonExtension> jsonExtensions;
		public JsonExtensions(ServiceReference[] extensions) {
			if (extensions != null) {
				jsonExtensions = new ArrayList<JsonExtension>(extensions.length);
				for (ServiceReference ex : extensions) {
					jsonExtensions.add(new JsonExtension(ex));
				}
			}
		}
		public List<JsonExtension> getExtensions() {
			return jsonExtensions;
		}
	}

	class JsonExtension {
		ServiceReference serviceReference;
		WebConsoleExtension extension;
		public JsonExtension(ServiceReference serviceReference) {
			this.serviceReference = serviceReference;
			this.extension = (WebConsoleExtension) bundleContext.getService(serviceReference);
		}
		public Long getId() {
			return (Long) serviceReference.getProperty(Constants.SERVICE_ID);
		}
		public String getName() {
			return extension.getName();
		}
		public String getDescription() {
			return extension.getDescription();
		}
		public String getComponentClass() {
			return extension.getComponentClass();
		}
		public JsonBundle getBundle() {
			return new JsonBundle(serviceReference.getBundle());
		}
        public String getResources(){
            return extension.getResources().get(0);
        }
	}

	class JsonBundle {
		Bundle bundle;
		JsonBundle(Bundle bundle) {
			this.bundle = bundle;
		}
		public Long getId() {
			return bundle.getBundleId();
		}
		public String getSymbolicName() {
			return bundle.getSymbolicName();
		}
	}

	ServiceReference[] getInstalledExtensions() {
		//List<WebConsoleExtension> extensions = new ArrayList<WebConsoleExtension>();
		try {
			String webConsoleExtensionFilter = String.format("(objectClass=%s)", WebConsoleExtension.class.getName());
			return bundleContext.getServiceReferences(null, webConsoleExtensionFilter);
			/*if (refs != null) {
				for (ServiceReference ref : refs) {
					extensions.add((WebConsoleExtension) bundleContext.getService(ref));
				}
			}*/
		} catch (InvalidSyntaxException e) {
			// IGNORE THIS DUMB OSGi EXCEPTION
			return null;
		}
		//return extensions;
	}

}
