package org.danielsoft.webconsole.ui;

import java.util.List;

public interface ExtensionManager {

	void register(Extension extension);

	void unregister(Extension extension);

	List<Extension> getExtensions();

}
