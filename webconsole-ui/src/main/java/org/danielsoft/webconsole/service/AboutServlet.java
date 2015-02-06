package org.danielsoft.webconsole.service;

import org.codehaus.jackson.map.ObjectMapper;
import org.danielsoft.webconsole.extension.IAboutWindowExtension;
import org.danielsoft.webconsole.extension.WebConsoleExtension;
import org.osgi.framework.*;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

// lists available extension to web console
@SuppressWarnings("serial")
public class AboutServlet extends HttpServlet {

	private BundleContext bundleContext;

	public AboutServlet(BundleContext bundleContext) {
		this.bundleContext = bundleContext;
	}

	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		resp.setContentType("application/json");
		resp.setCharacterEncoding("UTF-8");
		ServiceReference[] extensions = getInstalledExtensions();
		JsonExtension jsonExtension = new JsonExtension(extensions[0]);
		ObjectMapper om = new ObjectMapper();
		om.writeValue(resp.getWriter(), jsonExtension);
	}

	class JsonExtensions {
		JsonExtension jsonExtensions;
		public JsonExtensions(ServiceReference extensions) {
			if (extensions != null) {
				jsonExtensions = new JsonExtension(extensions);
				 //只返回一个


			}
		}
		public  JsonExtension  getExtensions() {
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
			String webConsoleExtensionFilter = String.format("(objectClass=%s)", IAboutWindowExtension.class.getName());
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
