package Tests.TestSuite1;


import org.junit.Test;
import org.junit.runner.RunWith;
import org.openqa.selenium.By;
import org.openqa.selenium.support.ui.Select;

import Tests.TestBase;

public class AddUser extends TestBase{
	
	@Test
	public void AddUsers(){
		
		//Click on user for account 1, newly created through test
		getObject("User_link").click();
		
		//Verify on User Page for account 1
		if(driver.getPageSource().contains("Users - 1")){
			System.out.println("Correct Account User page opened");
		}else{
			System.out.println("Incorrect Account User page opened");
		};
		
		//Add Second User (admin user already exists for account)
		getObject("Add_User_Button").click();
		
		//Verify labels exist on user page and are correct
		getObject("Add_New_User_label").getText().equalsIgnoreCase("Add New User");
		getObject("User_Info_Label").getText().equalsIgnoreCase("User Info");
		getObject("Roles_Label").getText().equalsIgnoreCase("Roles");
		getObject("User_Name_Label").getText().equalsIgnoreCase("User Name");
		getObject("Email_Label").getText().equalsIgnoreCase("Email");
		getObject("Time_Zone_Label").getText().equalsIgnoreCase("Time Zone");
		getObject("Password_Label").getText().equalsIgnoreCase("Password");
		getObject("Confirm_Password_Label").getText().equalsIgnoreCase("Confirm Password");
		getObject("User_Role_Label").getText().equalsIgnoreCase("User Role");
		getObject("Enabled_Label").getText().equalsIgnoreCase("Enabled");
		
		//Verify input fields exist and have correct defaults
		getObject("User_Name_Input").getAttribute("placeholder").equalsIgnoreCase("(Required)");
		getObject("Email_Input").getAttribute("placeholder").equalsIgnoreCase("(Required)");
		getObject("Password_Input").getAttribute("placeholder").equalsIgnoreCase("(Required)");
		getObject("Confirm_Pass_Input").getAttribute("placeholder").equalsIgnoreCase("(Required)");
		getObject("User_Role_Select").getText().equalsIgnoreCase("Account ID");//stopped here
		boolean UR = new Select(driver.findElement(By.xpath("//select[@name='userRole']"))).getFirstSelectedOption().getText().equalsIgnoreCase("Editor");			
		getObject("Enabled_Checkbox").isSelected();
		getObject("Add_User_Button").getText().equalsIgnoreCase("Add User");	
		
		//Enter User Information
		getObject("User_Name_Input").sendKeys("EditorU");
		getObject("Email_Input").sendKeys("smarchant@attensity.com");
		getObject("Password_Input").sendKeys("Admin1234");
		getObject("Confirm_Pass_Input").sendKeys("Admin1234");
		getObject("User_Role_Select").sendKeys("E");
		
		if(getObject("Enabled_Checkbox").isSelected()){
			System.out.println("User is enabled");
		}else{
			getObject("Enabled_Checkbox").click();
			System.out.println("User is now enabled");
		}
		
		getObject("Add_User_Button").click();
		
		//Verify Second User Exists
		driver.findElement(By.linkText("EditorU"));

		//Add Third User
		getObject("Add_User_Button").click();
		getObject("User_Name_Input").sendKeys("ReadOnlyU");
		getObject("Email_Input").sendKeys("smarchant@attensity.com");
		getObject("Password_Input").sendKeys("Admin1234");
		getObject("Confirm_Pass_Input").sendKeys("Admin1234");
		getObject("User_Role_Select").sendKeys("R");
		
		if(getObject("Enabled_Checkbox").isSelected()){
			System.out.println("User is enabled");
		}else{
			getObject("Enabled_Checkbox").click();
			System.out.println("User is now enabled");
		}
		
		getObject("Add_User_Button").click();
		
		//Verify Third User Exists
		driver.findElement(By.linkText("ReadOnlyU"));
		
		//Add Fourth User
		getObject("Add_User_Button").click();
		getObject("User_Name_Input").sendKeys("ProServU");
		getObject("Email_Input").sendKeys("smarchant@attensity.com");
		getObject("Password_Input").sendKeys("Admin1234");
		getObject("Confirm_Pass_Input").sendKeys("Admin1234");
		getObject("User_Role_Select").sendKeys("P");
			
		if(getObject("Enabled_Checkbox").isSelected()){
			System.out.println("User is enabled");
			}else{
				getObject("Enabled_Checkbox").click();
				System.out.println("User is now enabled");
			}
				
		getObject("Add_User_Button").click();
				
		//Verify Fourth User Exists
		driver.findElement(By.linkText("ProServU"));
		
		
				
	}

}
