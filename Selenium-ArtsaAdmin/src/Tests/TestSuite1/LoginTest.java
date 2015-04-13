package Tests.TestSuite1;

import java.io.IOException;

import org.junit.Assume;
import org.junit.Before;
import org.junit.Test;

import Tests.TestBase;
import util.TestUtil;

public class LoginTest extends TestBase{

	@Before
	//Call the initialize function
	public void beforeTest() throws IOException{
		//code to read from xls file
		//TestUtil.isSkip("LoginTest");//make testname you pass in the same as TCID in excel file
		//Assume.assumeTrue(false);
		initialize();
	}
 
	@Test
	public void loginTest(){
	
		//open site and send bad username and correct password
		dr.get(CONFIG.getProperty("testSiteName"));
		getObject("user_name_input").sendKeys("admin");
		getObject("password_field").sendKeys("qa");
		getObject("sign_on_button").click();
		
		//verify error message exists and close it
		getObject("bad_username_msg");
		getObject("error_close").click();
		
		//clear fields, send correct username and bad password
		getObject("user_name_input").clear();
		getObject("user_name_input").sendKeys("qa");
		getObject("password_field").clear();
		getObject("password_field").sendKeys("admin");
		getObject("sign_on_button").click();
		
		//verify error message exists and close it
		getObject("Login_error");
		getObject("error_close").click();
		
		//send correct username and password and login
		getObject("user_name_input").clear();
		getObject("user_name_input").sendKeys("qa");
		getObject("password_field").clear();
		getObject("password_field").sendKeys("qa");
		getObject("sign_on_button").click();
		
		
	}

}
