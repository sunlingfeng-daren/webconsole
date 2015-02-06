package org.danielsoft.webconsole.extension.chart;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.codehaus.jackson.map.ObjectMapper;
import org.osgi.framework.BundleContext;

@SuppressWarnings("serial")
public class DataServlet extends HttpServlet {

	private BundleContext bundleContext;

	public DataServlet(BundleContext bundleContext) {
		this.bundleContext = bundleContext;
	}

	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		resp.setContentType("application/json");
		resp.setCharacterEncoding("UTF-8");
		
		List<JsonPoint> jsonPoints = getData();
		ObjectMapper om = new ObjectMapper();
		om.writeValue(resp.getWriter(), jsonPoints);
	}

	List<JsonPoint> getData() {
		List<JsonPoint> points = new ArrayList<JsonPoint>();
		for (int i = 0; i < 20; i++) {
			points.add(new JsonPoint(i, i * i));
		}
		return points;
	}

	class JsonPoint {
		private double x;
		private double y;
		JsonPoint(double x, double y) {
			this.x = x;
			this.y = y;
		}
		public double getX() {
			return x;
		}
		public double getY() {
			return y;
		}
	}

}
