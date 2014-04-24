package util;

import org.openqa.selenium.By;

import Tests.TestBase;

public class TestUtil extends TestBase{
	
	public static void doLogin(String username, String password){
	//log the user into the application
		if(isLoggedIn){
			logout();
		}
		
		getObject("user_name_input").sendKeys(username);
		getObject("password_field").sendKeys(password);
		getObject("sign_on_button").click();
		
		//check to see whether login error msg exists
		//write some code which checks for the presence of the text, if not present
		//return false - make isLoggedIn equal to false
		//If I don't do that, an exception will be thrown saying the user was not found
		//so better way would be to put this in a try catch block
		//but I don't want an error just for not being logged in, so I won't use GetObject in my trycatch
		
		/*Now If this was reg module and wanted to verify username could find xpath of username
		Thread.sleep(5000L);
		String displayedUserName=getObject(username_top_link").getText();
		//put if statement
		if(displayedUserName.equals(username)){
		isLoggedIn = true; //meaning I have actually logged them into the app
		}else{
		isLoggedIn =false;
		}
		Instead I will base it on if the title of the page is now ArtsaAdmin
		*/
		try{
		String SignOut = driver.findElement(By.xpath(OR.getProperty("Sign_Out_Link"))).getText();
		//instead of writing GetObject, I'm using driver.findElement, because I don't want the GetObject function to report
		//an error if the user is not logged in.  Because sometimes I don't WANT to be logged in.

		if(SignOut.equals("Sign Out")){
			isLoggedIn=true;
		}else{
			isLoggedIn=false;
		}
		}catch(Throwable t){
			isLoggedIn=false;
		}
		}
		//no try catch needed because try/catch will be present in TestBase
		
	}

public static void logout(){
	if(isLoggedIn){
		getObject("Sign_Out_Link").click();
	}
//write a function that will get the skip condition
	//public static boolean isSkip(String testCase){
		//send test case into the function and return true if runMode is no and false if runMode is 
		//this file will also hold the code to read from the xls file
		
}
}
