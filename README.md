## OSGi Web Console

The OSGI Web Console is a tool for inspecting and managing OSGi framework instances using a Web Browser.
It is very similar to the [Apache Felix Web Console][0] but is not exactly the same!

The Web UI is built with [Sencha Ext JS 4.1.x][1] RIA framework and is supposed to be easily
extendible by developing various plug-ins.

Why do we need yet another OSGi Web Console? Although beginning with Release 1.2.8 the [Apache Felix Web Console][0] is using [JQuery][2]
to enhance the user experience and keep Web browser support on the broadest possible basis, for me it is still not quite enough.
I believe that [Sencha Ext JS 4.1.x][1] is the right choice for the time being. Even if I am wrong, in the worst case this application
will be a nice example of using this amazing RIA framework.

![Bundles Tab Screenshot](https://github.com/danielpacak/osgi-enterprise-webconsole/raw/master/README/osgi-web-console-bundles-tab.png)

![Services Tab Screenshot](https://github.com/danielpacak/osgi-enterprise-webconsole/raw/master/README/osgi-web-console-services-tab.png)

![Log Viewer Tab Screenshot](https://github.com/danielpacak/osgi-enterprise-webconsole/raw/master/README/osgi-web-console-log-viewer-tab.png)

![Groovy Console Tab Screenshot](https://github.com/danielpacak/osgi-enterprise-webconsole/raw/master/README/osgi-web-console-groovy-console-tab.png)

    import org.osgi.framework.Bundle
    import org.osgi.framework.ServiceReference
    import org.osgi.service.metatype.MetaTypeService
    import org.osgi.service.metatype.MetaTypeInformation
    import org.osgi.service.metatype.ObjectClassDefinition
    import org.osgi.service.metatype.AttributeDefinition

    ServiceReference metatypeRef = bundleContext.getServiceReference(MetaTypeService.class.name)
    MetaTypeService service = (MetaTypeService) bundleContext.getService(metatypeRef)

    Bundle myBundle = bundleContext.getBundle(19) // TODO you might need to change this ID

    MetaTypeInformation information = service.getMetaTypeInformation(myBundle)

    ObjectClassDefinition ocd = information.getObjectClassDefinition("org.apache.felix.fileinstall", null)
    AttributeDefinition[] attributes = ocd?.getAttributeDefinitions(ObjectClassDefinition.ALL)

    attributes.each {
        println "id = $it.ID name=$it.name description=$it.description defaultValue=$it.defaultValue"
        println it.validate('some random value')
    }

## Extensions

![Extensions Tab Screenshot](https://github.com/danielpacak/osgi-enterprise-webconsole/raw/master/README/osgi-web-console-extensions-tab.png)

## Requirements

The OSGi Web Console only has the following dependencies:

 + Running implementation of the OSGi Http Service Specification
 + TBD


[0]: http://felix.apache.org/site/apache-felix-web-console.html
[1]: http://www.sencha.com/products/extjs/
[2]: http://jquery.com/