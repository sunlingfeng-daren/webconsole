import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.node.ObjectNode;
import org.junit.Test;


public class LearningTest {
	
	public void testMe() throws Exception {
		ObjectMapper om = new ObjectMapper();
		Map<String, String> map = new HashMap<String, String>();
		map.put("key", "value");
		map.put("key2", "ccc");
		om.writeValue(System.out, map);
	}
	
	@Test
	public void testMe2() throws Exception {
		ObjectMapper mapper = new ObjectMapper();
		  mapper.writeValue(System.out, new Bundle(1l, "dfasdfas"));
		  // ... and so forth	}
	}
	
	class Bundle implements Serializable {
		Long id;
		String symbolicName;
		
		public Bundle(Long id, String symbolicName) {
			this.id = id;
			this.symbolicName = symbolicName;
		}
		public Long getId() {
			return id;
		}
		
		public String getSymbolicName() {
			return symbolicName;
		}
	}

}
