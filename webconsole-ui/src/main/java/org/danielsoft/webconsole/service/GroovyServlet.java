package org.danielsoft.webconsole.service;

import groovy.lang.Binding;
import groovy.lang.GroovyShell;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.PrintStream;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.codehaus.jackson.map.ObjectMapper;
import org.osgi.framework.BundleContext;

@SuppressWarnings("serial")
public class GroovyServlet extends HttpServlet {

	private BundleContext bundleContext;

	public GroovyServlet(BundleContext bundleContext) {
		this.bundleContext = bundleContext;
	}

	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		resp.setContentType("application/json");
		resp.setCharacterEncoding("UTF-8");
		
		JsonStatus status = new JsonStatus(evaluateScript(req.getParameter("script")));
		ObjectMapper om = new ObjectMapper();
		om.writeValue(resp.getWriter(), status);
	}
	
	class JsonStatus {
		private String consoleOutput;
		public JsonStatus(String consoleOutput) {
			this.consoleOutput = consoleOutput;
		}
		public String getConsoleOutput() {
			return consoleOutput;
		}
	}

	String evaluateScript(String scriptText) {
		PrintStream out = System.out;
		try {
			Binding binding = new Binding();
			binding.setVariable("bundleContext", this.bundleContext);
			ByteArrayOutputStream consoleOutput = new ByteArrayOutputStream();
			GroovyShell shell = new GroovyShell(binding);
			System.setOut(new PrintStream(consoleOutput));
			shell.evaluate(scriptText);
			return new String(consoleOutput.toByteArray());
		} finally {
			System.setOut(out);
		}
	}

}
