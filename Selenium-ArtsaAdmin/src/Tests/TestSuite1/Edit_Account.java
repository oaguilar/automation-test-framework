package Tests.TestSuite1;

import java.util.Arrays;
import java.util.Collection;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;
import org.junit.runners.Parameterized.Parameters;
import org.openqa.selenium.By;
import org.openqa.selenium.support.ui.Select;

import Tests.TestBase;
@RunWith(Parameterized.class)

public class Edit_Account extends TestBase{
	
	public String accountName;
	public String MaxUser;
	public String ProServOwner;
	public String ContactName;
	public String ContactEmail;
	public String CAddress;
	public String CCity;
	public String CState;
	public String CZip;
	
	//Declare constructor that accepts my parameters
	public Edit_Account(String accountName, String MaxUser, String ProServOwner, String ContactName, 
			String ContactEmail, String CAddress, String CCity, String CState, String CZip){
		this.accountName=accountName;
		this.MaxUser=MaxUser;
		this.ProServOwner=ProServOwner;
		this.ContactName=ContactName;
		this.ContactEmail=ContactEmail;
		this.CAddress=CAddress;
		this.CCity=CCity;
		this.CState=CState;
		this.CZip=CZip;
			}

	
	@Test
	public void EditExistingAccount(){
	
	//check all labels are present and contain correct text
	getObject("Account_Id_Label").getText().equalsIgnoreCase("Account ID");
	getObject("Account_Name_Label").getText().equalsIgnoreCase("Account Name");
	getObject("Account_Type_Label").getText().equalsIgnoreCase("Account Type");
	getObject("Expiration_Date_Label").getText().equalsIgnoreCase("Expiration Date");
	getObject("Daily_Max_Limit_Label").getText().equalsIgnoreCase("Daily Maximum Article Limit");
	getObject("Max_Topic_Lim_Label").getText().equalsIgnoreCase("Maximum Topic Limit");
	getObject("Max_User_Limit_Label").getText().equalsIgnoreCase("Maximum User Limit");
	getObject("Prof_Serv_Label").getText().equalsIgnoreCase("Professional Services Owner");
	getObject("Notes_Label").getText().equalsIgnoreCase("Notes");
	getObject("AAName_Label").getText().equalsIgnoreCase("Name");
	getObject("AAEmail_Label").getText().equalsIgnoreCase("Email");
	getObject("AAAddress_Label").getText().equalsIgnoreCase("Address");
	getObject("AACity_Label").getText().equalsIgnoreCase("City");
	getObject("AAState_Label").getText().equalsIgnoreCase("State");
	getObject("AAZip_Label").getText().equalsIgnoreCase("Zip");
	getObject("Account_Contact_Info_Header").getText().equalsIgnoreCase("Account Contact Information");
	
	//Edit and change values
	getObject("Account_Id_Value");
	getObject("CreateAccount_Name_input").clear();
	getObject("CreateAccount_Name_input").sendKeys(accountName);
	getObject("AccTypeDropDownList").sendKeys("Demo");
	getObject("ExpDateInputField").clear();
	getObject("ExpDateInputField").sendKeys("12/31/2017");
	getObject("DailyMaxArticle").sendKeys("640,000");
	getObject("MaxTopicLim").sendKeys("5");
	getObject("Max_User_Limit").clear();
	getObject("Max_User_Limit").sendKeys(MaxUser);
	getObject("NotesInput").clear();
	getObject("NotesInput").sendKeys("The notes field has been updated");
	getObject("PSOwner").clear();
	getObject("PSOwner").sendKeys(ProServOwner);
	getObject("ACName").clear();
	getObject("ACName").sendKeys(ContactName);
	getObject("ACEmail").clear();
	getObject("ACEmail").sendKeys(ContactEmail);
	getObject("ACAddress").clear();
	getObject("ACAddress").sendKeys(CAddress);
	getObject("ACCity").clear();
	getObject("ACCity").sendKeys(CCity);
	getObject("ACState").clear();
	getObject("ACState").sendKeys(CState);
	getObject("ACZip").clear();
	getObject("ACZip").sendKeys(CZip);
	

	
	//Verify Update text and Click Update
	getObject("Update_button").getText().equalsIgnoreCase("Update");
	getObject("Update_button").click();
	
	
	//Verify Account Updated Text Present
	getObject("Account_success_field");
	if(driver.getPageSource().contains("Account '1' Updated Successfully")){
		System.out.println("Updated Account is present in account list");
	}else{
		System.out.println("New Account is not present in account list");
	};
	
	//Verify Account Success Field has close option and execute
	getObject("Account_success_field_close").click();
	
	//Verify Account Name Displayed in List
	driver.findElement(By.linkText("1"));
	
	//Use Search Function to isolate account info
	getObject("Search_Account_Name").sendKeys("1");
		
	//Verify New Account Type Displayed in List
	getObject("Account_Type_Isolated").getText().equalsIgnoreCase("Demo");
	
	//Verify Updated PS Owner Name Displayed in List
	getObject("PS_Owner_Isolated").getText().equalsIgnoreCase("Bob Jones");
	
	//Verify Updated Expiration Date Displayed in List
	getObject("Expiration_Date_Isolated").getText().equalsIgnoreCase("Dec 31, 2017");

	//Click Account Edit Link 
	driver.findElement(By.linkText("1")).click();
	
	//Verify the values have been updated according to edits made earlier
	getObject("Account_Name_input").getAttribute("original-account-name").equalsIgnoreCase("1");
	getObject("Account_Name_input").getAttribute("original-account-name").equalsIgnoreCase("1");
	boolean AT = new Select(driver.findElement(By.xpath("//select[@ng-model='account.accountType']"))).getFirstSelectedOption().getText().equalsIgnoreCase("Demo");		
	boolean DMA = new Select(driver.findElement(By.xpath("//select[@ng-model='account.maxVolumeLimit']"))).getFirstSelectedOption().getText().equalsIgnoreCase("40,000");
	boolean MTL = new Select(driver.findElement(By.xpath("//select[@ng-model='account.maxTopicLimit']"))).getFirstSelectedOption().getText().equalsIgnoreCase("5");
	getObject("ExpDateInputField").getAttribute("value").equalsIgnoreCase("12/31/2017");
	getObject("Max_User_Limit").getAttribute("value").equalsIgnoreCase("10");
	getObject("PSOwner").getAttribute("value").equalsIgnoreCase("Bob Jones");
	getObject("ACName").getAttribute("value").equalsIgnoreCase("Jane Jones");
	getObject("ACEmail").getAttribute("value").equalsIgnoreCase("tmemmott@attensity.com");
	getObject("ACAddress").getAttribute("value").equalsIgnoreCase("123 Main Street");
	getObject("ACCity").getAttribute("value").equalsIgnoreCase("Salt Lake City");
	getObject("ACState").getAttribute("value").equalsIgnoreCase("UT");
	getObject("ACZip").getAttribute("value").equalsIgnoreCase("84101");
	
	//Verify Cancel button has correct text and executes
	getObject("Cancel_button").getText().equalsIgnoreCase("Cancel");
	getObject("Cancel_button").click();
	
}
	@Parameters
	public static Collection<Object[]> dataSuppliers(){
	//this method supplies the test data to use in parameters
			
		Object[][] data2 = new Object[1][9];
		//Creates an array to store 1 set of data and 9 rows
		
		//assign values to each row in first set
		data2[0][0]="1";
		data2[0][1]="10";
		data2[0][2]="Bob Jones";
		data2[0][3]="Jane Jones";
		data2[0][4]="tmemmott@attensity.com";
		data2[0][5]="123 Main Street";
		data2[0][6]="Salt Lake City";
		data2[0][7]="UT";
		data2[0][8]="84101";
		
		return Arrays.asList(data2);
		//returning the array info to the Collection
	}
	}
