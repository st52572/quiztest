package st52572.nnpia.quizer.service;

import geb.Browser
import org.junit.Test
import org.junit.runner.RunWith
import org.openqa.selenium.By
import org.openqa.selenium.WebDriver
import org.openqa.selenium.chrome.ChromeDriver
import org.openqa.selenium.support.ui.ExpectedConditions
import org.openqa.selenium.support.ui.WebDriverWait
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.junit4.SpringRunner
import st52572.nnpia.quizer.testutil.Creator



@SpringBootTest(
        webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT
)
class UILoginTestWithCreator {

    @Autowired
    private Creator creator;


    @Test
    void loginTestUnssuccesful() {



        System.setProperty("webdriver.chrome.driver", "C:\\Users\\nexnl\\Desktop\\webovky\\chromedriver.exe")
        
        def browser = new Browser();
        WebDriver driver = new ChromeDriver()
        browser.setDriver(driver)
        browser.go 'http://localhost:3000/login'

        driver.findElement(By.name("username")).sendKeys("test")
        driver.findElement(By.name("password")).sendKeys("test")
        driver.findElement(By.name("login")).click()

        //creator.saveEntity(new User())

        /*browser.drive {
            go 'http://localhost:3000/login'
            //assert title == "Login | UPCE"

            // a) typing text into input using GEB jQuery-like API


            // a) typing text into input using core WebDriver API
            driver.findElement(By.name("password")).sendKeys("test")

            $("button[name='login']").click()

            WebDriverWait wait = new WebDriverWait(driver, 100);
            wait.until(ExpectedConditions.titleIs("Tetst"))

        }*/
    }


}