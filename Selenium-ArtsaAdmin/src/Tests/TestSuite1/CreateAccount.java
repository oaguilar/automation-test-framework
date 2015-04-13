package Tests.TestSuite1;

import java.io.IOException;
import java.util.Arrays;
import java.util.Collection;
import java.util.concurrent.TimeUnit;

import org.junit.Assume;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;
import org.junit.runners.Parameterized.Parameters;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;

import util.TestUtil;
import Tests.TestBase;
@RunWith(Parameterized.class)

//Currently this test case just runs through creating a basic account.  Need to add testing for each available value in each field

public class CreateAccount extends TestBase{
//declaring variables I want to parameterize
	public String accountName;
	public String MaxUser;
	public String ProServOwner;
	public String ContactName;
	public String ContactEmail;
	public String AdminUserName;
	public String AdminUserEmail;
	public String AdminUserPass;
	public String AdminConfPass;
	
	//Declare constructor that accepts my parameters
	public CreateAccount(String accountName, String MaxUser, String ProServOwner, String ContactName, 
			String ContactEmail, String AdminUserName, String AdminUserEmail, String AdminUserPass, String AdminConfPass){
		this.accountName=accountName;
		this.MaxUser=MaxUser;
		this.ProServOwner=ProServOwner;
		this.ContactName=ContactName;
		this.ContactEmail=ContactEmail;
		this.AdminUserName=AdminUserName;
		this.AdminUserEmail=AdminUserEmail;
		this.AdminUserPass=AdminUserPass;
		this.AdminConfPass=AdminConfPass;
			}
	
	//@Before
	//public void beforeTest() throws IOException{
	
		//code to read from xls file
	//TestUtil.isSkip("CreateAccount");//make testname you pass in the same as TCID in excel file
	//Assume.assumeTrue(false);
	
	//initialize();
	//}
	
	@Test
	public void MakeAccount(){
		
		//put in parameterized ids in place of hard coded values
		//driver.get(CONFIG.getProperty("testSiteName"));
		getObject("Add_Account_Button").click();
		getObject("CreateAccount_Name_input").sendKeys(accountName);
		getObject("AccTypeDropDownList").sendKeys("Internal");
		getObject("AccTypeDropDownList").sendKeys("Internal");
		getObject("ExpDateInputField").clear();
		getObject("ExpDateInputField").sendKeys("04/14/2015");
		getObject("DailyMaxArticle").sendKeys("40,000");
		getObject("MaxTopicLim").sendKeys("10");
		getObject("Max_User_Limit").clear();
		getObject("Max_User_Limit").sendKeys(MaxUser);
		getObject("NotesInput").sendKeys("This is an account created for automated testing.");
		getObject("PSOwner").sendKeys(ProServOwner);
		getObject("ACName").sendKeys(ContactName);
		getObject("ACEmail").sendKeys(ContactEmail);
		getObject("AAUser").sendKeys(AdminUserName);
		getObject("AAEmail").sendKeys(AdminUserEmail);
		getObject("AAPass").sendKeys(AdminUserPass);
		getObject("AaConfPass").sendKeys(AdminConfPass);
		getObject("SubmitButton").click();
		
		getObject("Account_success_field");
		if(driver.getPageSource().contains("AutoTest")){
			System.out.println("New Account is present in account list");
		}else{
			System.out.println("New Account is not present in account list");
		};
		
		driver.findElement(By.linkText("AutoTest")).click();
		driver.getPageSource().contains("Edit Account - AutoTest");
		
	}
	
	
	
	@Parameters
	public static Collection<Object[]> dataSupplier(){
	//this method supplies the test data to use in parameters
			
		Object[][] data = new Object[1][9];
		//Creates an array to store 1 set of data and 9 rows
		
		//assign values to each row in first set
		data[0][0]="AutoTest";
		data[0][1]="30";
		data[0][2]="Bill Smith";
		data[0][3]="Jane Jones";
		data[0][4]="smarchant@attensity.com";
		data[0][5]="admin";
		data[0][6]="smarchant@attensity.com";
		data[0][7]="Admin1234";
		data[0][8]="Admin1234";
		
		//assign values to each row in second set
		//data[1][0]="AutoTest1";
		//data[1][1]="20";
		//data[1][2]="Don Smith";
		//data[1][3]="Jenny Brown";
		//data[1][4]="smarchant@attensity.com";
		//data[1][5]="admin";
		//data[1][6]="smarchant@attensity.com";
		//data[1][7]="Admin1234";
		//data[1][8]="Admin1234";
		
		return Arrays.asList(data);
		//returning the array info to the Collection
	}

}