package Tests.TestSuite1;

import org.junit.Test;
import org.openqa.selenium.By;

import Tests.TestBase;

public class Edit_User extends TestBase{

	//this test case needs to be rewritten to reflect new password standards and bug-fixes - still runs but needs to be fleshed out
	
	@Test
	public void EditUserTest(){
		
		//Edit "admin" User
		driver.findElement(By.linkText("admin")).click();
		
		
		//Verify labels and buttons on the page
		getObject("User_Info_Label").getText().equalsIgnoreCase("User Info");
		getObject("Role_Label").getText().equalsIgnoreCase("Roles");
		getObject("User_ID_Label").getText().equalsIgnoreCase("User ID");
		getObject("Email_Label").getText().equalsIgnoreCase("Email");
		getObject("User_Role_Label").getText().equalsIgnoreCase("User Role");
		getObject("Enabled_Label").getText().equalsIgnoreCase("Enabled");
		getObject("Update_Button").getText().equalsIgnoreCase("Update");
		getObject("Cancel_Button").getText().equalsIgnoreCase("Cancel");
		
		
		/*test entering invalid email format - re-enable when ART-244 is complete.
		getObject("Email_Input").clear();
		getObject("Email_Input").sendKeys("smarchant@aol");
		getObject("Update_Button").click();
		
		//Verify error message exists		
		driver.findElement(By.xpath("html/body/div[1]/div/div[2]/div/div/span")).getAttribute("value").equalsIgnoreCase("Error Updating User!");*/
		
		//test entering blank email
		
		getObject("Email_Input").clear();
		getObject("Email_Required_Label").isDisplayed();
		getObject("Email_Required_Input").isDisplayed();
		
		//test entering too long email address - wait to test this until they fix the error message issue
		//getObject("Email_Required_Input").sendKeys("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa@aaa.com");  Wait till they fix this option
		
		//enter valid email address
		getObject("Email_Required_Input").sendKeys("abc@attensity.com");
		
		//Update User
		getObject("Update_Button").click();
		
		//Verify email exists
		driver.getPageSource().contains("abc@attensity.com");
		
		//Edit User again
		driver.findElement(By.linkText("admin")).click();
		
		//Update Password
		getObject("Update_Password_Checkbox").click();
		
		//Verify Password fields appear
		getObject("Password_Update_Label");
		getObject("Password_Update_Field");
		getObject("Confirm_Password_Update_Label");
		getObject("Confirm_Password_Update_Field");
		
		//Enter short password, verify message, clear
		getObject("Password_Update_Field").sendKeys("passw");
		getObject("Pass_Short_Warning");
		getObject("Password_Update_Field").clear();
		
		//Enter weak password, verify message, clear
		
		getObject("Password_Update_Field").sendKeys("password");
		getObject("Pass_Weak_Warning");
		
		//Clear password, verify message
		getObject("Password_Update_Field").clear();
		getObject("Pass_Missing_Warning");
		
		//Very strong password, verify message
		
		getObject("Password_Update_Field").sendKeys("Admin1234*");
		getObject("Pass_VeryStrong_Warning");
		
		//.getAttribute("value").equalsIgnoreCase("The password is very strong.");
		getObject("Password_Update_Field").clear();
		
		//Strong password, verify message, clear
		
		getObject("Password_Update_Field").sendKeys("Admin1234");
		getObject("Pass_Strong_Warning");
		
		//Blank Confirm Password field and non-matching verification
		
		//getObject("Confirm_Pass_Required_Warning"); re-enable once ART-245 is fixed
		//.getAttribute("value").equalsIgnoreCase("This field is required.");
		getObject("Confirm_Password_Update_Field").sendKeys("Admin");
		getObject("Confirm_Pass_Match_Warning");
		
		//.getAttribute("value").equalsIgnoreCase("The passwords must match");
		
		//Send matching password
		getObject("Confirm_Password_Update_Field").clear();
		getObject("Confirm_Password_Update_Field").sendKeys("Admin1234");
		
		//Change User Role
		
		getObject("User_Role_Select").sendKeys("E");
		
		//Deselect Enabled checkbox
		
		getObject("Enabled_Checkbox").click();
		//Once Artsa is stable will need to insert test where I test this user against artsa module to verify not enabled
		
		//Update user
		getObject("Update_Button_After_PW").click();

		//Edit User again and cancel
		driver.findElement(By.linkText("admin")).click();
		getObject("Cancel_Button").click();
		
		//Edit User again and cancel using breadcrumb
		driver.findElement(By.linkText("admin")).click();
		getObject("User_Breadcrumb").click();
	

		}	
				
	}

