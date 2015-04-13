package Tests.TestSuite1;
import java.io.IOException;
import java.util.Iterator;
import java.util.Set;

import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.By;

import Tests.TestBase;

public class VerifyNavItems extends TestBase{
	
	@Before
	//Call the initialize function
	public void beforeTest() throws IOException{
		//code to read from xls file
		//TestUtil.isSkip("LoginTest");//make testname you pass in the same as TCID in excel file
		//Assume.assumeTrue(false);
		initialize();
	}

	
	@Test
	public void VerifyTopNav() throws InterruptedException{
		
	//verify nav image exists	
	getObject("ArtsaAdmin_nav_image");
	
	//verify Reports link exists and works
	getObject("Reports_Link").click();
	driver.findElement(By.xpath("//html/body/div[1]/div/div[2]/h3")).getText().equalsIgnoreCase("Reports");
	
	//verify Accounts link exists and works
	getObject("Accounts_Link").click();
	getObject("Accounts_header").getText().equalsIgnoreCase("Accounts");

	//verify Help
	getObject("Help_Link").click();
	
	//switch control to help window
	Set<String> ids = driver.getWindowHandles();
	Iterator<String> iter = ids.iterator();
	String mainWindow = iter.next();
	String helpWindowID = iter.next();
	Thread.sleep(2000L);
	
	driver.switchTo().window(helpWindowID);

	//Verify on help page and close driver
	driver.getPageSource().contains("WebHelp");
	driver.close();

	//Switch back to original browser
	driver.switchTo().window(mainWindow);

	//click on About link
	getObject("About_Link").click();
	
	//Verify items on About page
	getObject("Illumi_Admin_Header").getText().equalsIgnoreCase("Illumi Admin");
	getObject("Version_Info").getText().equalsIgnoreCase("0.8");
	String Build = getObject("Build_Info").getText();
	System.out.println(Build);
	getObject("Copyright_Info").getText().equalsIgnoreCase("© 2014 Attensity. All rights reserved.");
	
	getObject("OK_Button").getText().equalsIgnoreCase("OK");
	
	//Close About Modal
	getObject("OK_Button").click();

	Thread.sleep(2000L);
	
	
		
	}

}
