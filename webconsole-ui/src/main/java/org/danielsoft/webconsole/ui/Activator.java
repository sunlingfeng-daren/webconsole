package org.danielsoft.webconsole.ui;

import org.danielsoft.webconsole.service.*;
import org.osgi.framework.BundleActivator;
import org.osgi.framework.BundleContext;
import org.osgi.framework.ServiceEvent;
import org.osgi.framework.ServiceListener;
import org.osgi.framework.ServiceReference;
import org.osgi.service.http.HttpService;

public class Activator implements BundleActivator, ServiceListener {

	private BundleContext bundleContext;
	private HttpService httpService;
	private Extender extender;

	public void start(BundleContext bundleContext) throws Exception {
		this.bundleContext = bundleContext;
		String httpServiceFilter = String.format("(objectClass=%s)", HttpService.class.getName());
		ServiceReference[] httpServiceRefs = bundleContext.getServiceReferences(null, httpServiceFilter);
		
		if (httpServiceRefs != null) {
			registerServletsAndResources(httpServiceRefs[0]);
		} else {
			bundleContext.addServiceListener(this, httpServiceFilter);
		}
		
		this.extender = new Extender(null);
		bundleContext.addBundleListener(extender);
	}

	public void stop(BundleContext bundleContext) throws Exception {
		if (httpService != null) {
			httpService.unregister("/webconsole");
		}
		bundleContext.removeServiceListener(this);
		bundleContext.removeBundleListener(extender);
	}

	public void serviceChanged(ServiceEvent event) {
		if (event.getType() == ServiceEvent.REGISTERED) {
			registerServletsAndResources(event.getServiceReference());
		}
	}

	void registerServletsAndResources(ServiceReference httpServiceRef) {
		try {
			httpService = (HttpService) bundleContext.getService(httpServiceRef);
			httpService.registerResources("/webconsole", "/web", null);
			
			IndexServlet indexServlet = new IndexServlet(bundleContext);
			BundlesServlet bundleServlet = new BundlesServlet(bundleContext);
			SystemInfoServlet systemInfoServlet = new SystemInfoServlet();
			BundleInstallServlet bundleInstallServlet = new BundleInstallServlet(bundleContext);
			ServicesServlet servicesServlet = new ServicesServlet(bundleContext);
			GroovyServlet groovyServlet = new GroovyServlet(bundleContext);
			LogServlet logServlet = new LogServlet(bundleContext);
			ExtensionsServlet extensionServlet = new ExtensionsServlet(bundleContext);
            AboutServlet aboutServlet = new AboutServlet(bundleContext);

			httpService.registerServlet("/webconsole/index.html", indexServlet, null, null);
			httpService.registerServlet("/webconsole/service/bundles", bundleServlet, null, null);
			httpService.registerServlet("/webconsole/service/bundles/install", bundleInstallServlet, null, null);
			httpService.registerServlet("/webconsole/service/system", systemInfoServlet, null, null);
			httpService.registerServlet("/webconsole/service/services", servicesServlet, null, null);
			httpService.registerServlet("/webconsole/service/groovy", groovyServlet, null, null);
			httpService.registerServlet("/webconsole/service/log", logServlet, null, null);
			httpService.registerServlet("/webconsole/service/extensions", extensionServlet, null, null);
            httpService.registerServlet("/webconsole/service/about", aboutServlet, null, null);

		} catch (Exception e) {
			System.err.println("Error while registering resources and servlets: " + e);
		}

	}

}
