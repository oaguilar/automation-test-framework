package Tests.TestSuite1;

import org.junit.Test;
import org.openqa.selenium.By;
import Tests.TestBase;


public class ReportsPage extends TestBase{

	public static void main(String[] args) {
		

	}
	
	@Test
	public void checkReportsPage(){
	
		//verify clicking Reports link takes you to reports page
		getObject("Reports_Link").click();
		driver.findElement(By.xpath("//html/body/div[1]/div/div[2]/h3")).getText().equalsIgnoreCase("Reports");
		
		//Click on AMR link and verify it takes you to AMR page
		driver.findElement(By.linkText("Accounts Management Report")).click();
		getObject("Export_Button").getText().equalsIgnoreCase("Export");
	}
	}
	