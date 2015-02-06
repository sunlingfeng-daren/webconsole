package org.danielsoft.webconsole.service;

import java.io.IOException;
import java.io.Serializable;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.codehaus.jackson.map.ObjectMapper;

@SuppressWarnings("serial")
public class SystemInfoServlet extends HttpServlet {

	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		resp.setContentType("application/json");
		
		JsonSystemInfo jsonSystemInfo = new JsonSystemInfo();
		ObjectMapper om = new ObjectMapper();
		om.writeValue(resp.getWriter(), jsonSystemInfo);
	}

	class JsonSystemInfo implements Serializable {
		public String getJavaRuntime() {
			return System.getProperty("java.runtime.name") + "(build "
					+ System.getProperty("java.runtime.version") + ")";
		}

		public String getJavaVirtualMachine() {
			return System.getProperty("java.vm.name") + "(build "
					+ System.getProperty("java.vm.version") + ", "
					+ System.getProperty("java.vm.info") + ")";
		}

		public long getFreeMemory() {
			return Runtime.getRuntime().freeMemory() / 1024;
		}

		public long getTotalMemory() {
			return Runtime.getRuntime().totalMemory() / 1024;
		}

		public long getUsedMemory() {
			return getTotalMemory() - getFreeMemory();
		}

		public int getNumberOfProcessors() {
			return Runtime.getRuntime().availableProcessors();
		}

	}

}
