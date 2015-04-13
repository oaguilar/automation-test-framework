package Tests;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Properties;
import java.util.concurrent.TimeUnit;

import org.junit.Assert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.events.EventFiringWebDriver;
import util.TestUtil;
import datatable.Xls_Reader;

public class TestBase {

public static Properties CONFIG=null;
public static Properties OR=null;
public static WebDriver dr=null;
public static EventFiringWebDriver driver=null;

public static boolean isLoggedIn=false;
//tells the test case whether the user is logged in or not
	
	
public void initialize() throws IOException{
if(driver == null){

	//initialize config properties file	
	CONFIG= new Properties();
	FileInputStream fn = new FileInputStream(System.getProperty("user.dir")+"//src//config//config.properties");
	CONFIG.load(fn);
	
	//initialize xpaths file
	OR= new Properties();
	fn = new FileInputStream(System.getProperty("user.dir")+"//src//config//OR.properties");
	OR.load(fn);
	
	//initialize browser
	//if(CONFIG.getProperty("browser").equals("Firefox")){
		dr = new FirefoxDriver();

	//}else if (CONFIG.getProperty("browser").equals("Chrome")){
		//System.setProperty("webdriver.chrome.driver", ("user.dir")+"//src//chromedriver.exe");
		//dr = new ChromeDriver();
		
	//}
	driver = new EventFiringWebDriver(dr);
	driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
		
	
	}
}
public static WebElement getObject(String xpathKey){
//returns object present at that xpath
	try{
	return driver.findElement(By.xpath(OR.getProperty(xpathKey)));
	}catch(Throwable t){
		//report error
		return null;
	
}
}

}
