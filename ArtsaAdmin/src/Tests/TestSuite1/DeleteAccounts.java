package Tests.TestSuite1;
import java.sql.*;

import org.junit.runner.RunWith;
import org.junit.Test;

import Tests.TestBase;

public class DeleteAccounts extends TestBase {
	// TODO Auto-generated method stub
	public static void main(String[] args){
		// TODO Auto-generated method stub

	}
	

	@Test
	public void deleteAccountFromDB() throws SQLException {
		
				Connection conn = null;
				String url = "jdbc:mysql://10.200.0.124:3306/";
				String dbName = "illumi";
				String driver = "com.mysql.jdbc.Driver";
				String userName = "root";
				String password = "pipeline123";   
			try{
			Class.forName(driver).newInstance();
			conn = DriverManager.getConnection(url+dbName, userName, password); 

			Statement tsmt = conn.createStatement();

			tsmt.executeUpdate("DELETE FROM accounts WHERE name='1'");  

					}catch (Exception e){
				e.printStackTrace();		
				}finally{
		conn.close();
}
}
}

