package Tests.TestSuite1;

import java.io.IOException;

import org.junit.Assume;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.Select;

import util.TestUtil;
import Tests.TestBase;

public class CheckAccountDefaults extends TestBase{

	public static void main(String[] args) {
		// TODO Auto-generated method stub

	}
	
	@Test
	public void checkDefaults(){
		
		//checks defaults of account fields
		
		getObject("Add_Account_Button").click();
		
		//Check default of Account Type field 
		boolean AT = new Select(driver.findElement(By.xpath("//select[@ng-model='account.accountType']"))).getFirstSelectedOption().getText().equalsIgnoreCase("Internal");		
		
		/*
		How can I ensure default input field date is one year from creation date?
		getObject("ExpDateInputField").sendKeys("04/14/2014"); 
		*/

		//Check default of Daily Maximum Article Limit
		boolean DMA = new Select(driver.findElement(By.xpath("//select[@ng-model='account.maxVolumeLimit']"))).getFirstSelectedOption().getText().equalsIgnoreCase("80,000");
		
		//Check default of Maximum Topic Limit
		boolean MTL = new Select(driver.findElement(By.xpath("//select[@ng-model='account.maxTopicLimit']"))).getFirstSelectedOption().getText().equalsIgnoreCase("15");
		
		//Check default of Maximum User Limit field and print - this is not printing - how do I find default input field value
		String MUL = driver.findElement(By.xpath("//input[@name='maxUserLimit']")).getText();
		System.out.println(MUL);

		//Check default placeholder of Professional Services Owner field 
		getObject("PSOwner").getAttribute("placeholder").equalsIgnoreCase("(Optional");

		//Check default placeholder text of Notes field
		getObject("NotesInput").getAttribute("placeholder").equalsIgnoreCase("(Optional)");
			
		//Check default placeholder text of Address field 
		getObject("ACAddress").getAttribute("placeholder").equalsIgnoreCase("(Optional)");
		
		//Check default placeholder text of City field 
		getObject("ACCity").getAttribute("placeholder").equalsIgnoreCase("(Optional)");
		
		//Check default placeholder text of State field
		getObject("ACState").getAttribute("placeholder").equalsIgnoreCase("(Optional)");
		
		//Check default placeholder text of Zip field
		getObject("ACZip").getAttribute("placeholder").equalsIgnoreCase("(Optional)");
		
		//Cancel
		getObject("Cancel_button").click();
				
	}
	


}
