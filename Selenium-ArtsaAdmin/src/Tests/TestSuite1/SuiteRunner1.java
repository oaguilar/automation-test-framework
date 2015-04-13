package Tests.TestSuite1;
import org.junit.runner.RunWith;
import org.junit.runners.Suite;
import org.junit.runners.Suite.SuiteClasses;


	@RunWith(Suite.class)
	
	@SuiteClasses({
		LoginTest.class,
		VerifyNavItems.class,
		SearchAccounts.class,	
		CheckAccountDefaults.class,
		CreateAccount.class, //Currently selects one value per field, will create tests to test each avail value  - needs tons of additional fleshing out
		Edit_Account.class, 
		AddUser.class, 
		Edit_User.class, 
		Delete_User.class,
		ReportsPage.class,
		signOut.class,
		DeleteAccounts.class
		
	
		//Accounts Management Report - in progress
		//Export Options - in progress
		
		})
	
	public class SuiteRunner1 {
	}


