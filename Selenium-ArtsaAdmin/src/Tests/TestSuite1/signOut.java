package Tests.TestSuite1;
import java.util.Iterator;
import java.util.Set;

import org.junit.Test;
import org.openqa.selenium.By;

import Tests.TestBase;

public class signOut extends TestBase {

	@Test
	public void trySignOut(){
		
		//Verify Sign Out Link has appropriate text
		getObject("Sign_Out_Link").getText().equalsIgnoreCase("Sign Out");
		
		//sign out
		getObject("Sign_Out_Link").click();
		
		//Verify back at login page
		getObject("sign_on_button").getText().equalsIgnoreCase("Sign On");
		
	}
		
}
