import datatable.Xls_Reader;


public class Test {

	public static void main(String[] args) {
		
		Xls_Reader datatable = new Xls_Reader (System.getProperty("user.dir")+"//src//config//Suites1.xlsx");
		datatable.getRowCount("Test Cases");//get row count from sheet named Test Cases
		datatable.getCellData("Test Cases", "TCID", 3);//get the value from the third row of the TCID column of the test case sheet
		String testCase="LoginTest";
		
		for (int rowNum=2; rowNum<=datatable.getRowCount("Test cases"); rowNum++){
			if(testCase.equals(datatable.getCellData("Test Cases", "TCID", rowNum))){
				if(testCase.equals(datatable.getCellData("Test Cases", "Runmode", rowNum).equals("Y"))
						System.out.println("run the test");
				else
					System.out.println("skip the test");
			}
		}
		

	}

}
