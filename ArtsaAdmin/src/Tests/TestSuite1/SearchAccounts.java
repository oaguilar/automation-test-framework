package Tests.TestSuite1;

import org.junit.Test;
import org.openqa.selenium.By;
import Tests.TestBase;


public class SearchAccounts extends TestBase{

	public static void main(String[] args) {
		

	}
	
	@Test
	public void checkSearch(){
	//Verify Search Function works
		getObject("Search_Account_Name").sendKeys("Attensity");
		driver.findElement(By.linkText("Attensity")).click();
		
		//make sure right account opened then return to nav page
		getObject("Account_Name_input").getAttribute("original-account-name").equalsIgnoreCase("Attensity");
		getObject("Return_Account_Link").click();
		
		//Run another search then clear search field, ensure all accounts display
		getObject("Search_Account_Name").sendKeys("Attensity");
		driver.findElement(By.linkText("Attensity"));
		getObject("Clear_Search_Button").click();
		driver.findElement(By.linkText("Linguist")).click();
		
		//need to add quite a bit to this, but it's a start
	}
}
