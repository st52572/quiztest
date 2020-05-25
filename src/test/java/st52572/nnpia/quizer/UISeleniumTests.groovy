package st52572.nnpia.quizer

import org.junit.jupiter.api.Test
import org.openqa.selenium.By
import org.openqa.selenium.WebDriver
import org.openqa.selenium.chrome.ChromeDriver
import org.openqa.selenium.support.ui.ExpectedConditions
import org.openqa.selenium.support.ui.WebDriverWait
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import st52572.nnpia.quizer.model.User
import st52572.nnpia.quizer.service.IUserService
import st52572.nnpia.quizer.testutil.Creator


@SpringBootTest(
        webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT
)
class UISeleniumTests {

    @Autowired
    private BCryptPasswordEncoder bcryptEncoder

    @Autowired
    private IUserService iUserService

    @Autowired
    private Creator creator


    @Test
    void testPrihlaseni() {
        System.setProperty("webdriver.chrome.driver", "C:/Users/nexnl/Desktop/webovky/chromedriver.exe")

        User user = new User()
        user.setId(0)
        user.setUsername("testLogin")
        user.setPassword(bcryptEncoder.encode("testLogin"))
        creator.saveEntity(user)

        WebDriver driver = new ChromeDriver()
        driver.get("http://localhost:3000/login")

        driver.findElement(By.name("username")).sendKeys("testLogin")
        driver.findElement(By.name("password")).sendKeys("testLogin")
        driver.findElement(By.className("btn-login")).click()

        WebDriverWait wait = new WebDriverWait(driver, 10)


        By byXpath = By.xpath("//*[contains(text(),'Yours tests')]")
        wait.until(ExpectedConditions.presenceOfElementLocated(byXpath))

        iUserService.deleteByUsername("testLogin")

    }

    @Test
    void testPrihlaseniFail() {
        System.setProperty("webdriver.chrome.driver", "C:/Users/nexnl/Desktop/webovky/chromedriver.exe")

        User user = new User()
        user.setId(0)
        user.setUsername("testBadLogin")
        user.setPassword(bcryptEncoder.encode("testLogin"))
        creator.saveEntity(user)

        WebDriver driver = new ChromeDriver()
        driver.get("http://localhost:3000/login")

        driver.findElement(By.name("username")).sendKeys("testBadLogin")
        driver.findElement(By.name("password")).sendKeys("badpassword")
        driver.findElement(By.className("btn-login")).click()

        WebDriverWait wait = new WebDriverWait(driver, 10)

        By byXpath = By.xpath("//*[contains(text(),'Login')]")
        wait.until(ExpectedConditions.presenceOfElementLocated(byXpath))

        iUserService.deleteByUsername("testBadLogin")

    }

    @Test
    void testFormRegisterTest() {
        System.setProperty("webdriver.chrome.driver", "C:/Users/nexnl/Desktop/webovky/chromedriver.exe")


        WebDriver driver = new ChromeDriver()
        driver.get("http://localhost:3000/registration")

        driver.findElement(By.name("username")).sendKeys("usrTest")
        driver.findElement(By.name("firstName")).sendKeys("firstname")
        driver.findElement(By.name("lastName")).sendKeys("lastname")
        driver.findElement(By.name("password")).sendKeys("1234")
        driver.findElement(By.className("btn-register")).click()


        driver.findElement(By.name("username")).sendKeys("usrTest")
        driver.findElement(By.name("password")).sendKeys("1234")
        driver.findElement(By.className("btn-login")).click()

        WebDriverWait wait = new WebDriverWait(driver, 10)


        By byXpath = By.xpath("//*[contains(text(),'Yours tests')]")
        wait.until(ExpectedConditions.presenceOfElementLocated(byXpath))
        iUserService.deleteByUsername("usrTest")

    }


}