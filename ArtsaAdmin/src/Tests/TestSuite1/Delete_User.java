package Tests.TestSuite1;

import org.junit.Test;
import org.openqa.selenium.By;

import Tests.TestBase;

public class Delete_User extends TestBase {

	@Test
	public void DeleteUserTest(){
	
		//DeleteEditorUser
		getObject("Delete_Editor_User").click();
		getObject("Delete_User_Confirm").click();
		getObject("Delete_User_Successful");
		getObject("Delete_ProServ_User").click();
		getObject("Delete_User_Confirm").click();
		getObject("Delete_User_Successful");
		getObject("Delete_ReadOnly_User").click();
		getObject("Delete_User_Confirm").click();
		getObject("Delete_User_Successful");
		

	}
}
