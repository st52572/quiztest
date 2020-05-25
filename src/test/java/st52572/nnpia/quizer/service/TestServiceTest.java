package st52572.nnpia.quizer.service;


import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.test.context.junit4.SpringRunner;
import st52572.nnpia.quizer.model.*;
import st52572.nnpia.quizer.testutil.Creator;

import static org.junit.Assert.assertEquals;


@AutoConfigureTestDatabase(replace= AutoConfigureTestDatabase.Replace.NONE)
@RunWith(SpringRunner.class)
@SpringBootTest
public class TestServiceTest {

    @Autowired
    ITestService iTestService;

    @Autowired
    IUserService iUserService;

    @Autowired
    private Creator creator;


    @org.junit.Test
    public void getUserTests() {

        User user = new User();
        user.setUsername("usr");
        creator.saveEntity(user);

        TestDto test = new TestDto();
        test.setUser(user);
        test.setName("test");
        test.setTag("tag");

        iTestService.saveTest(test);

        Page<Test> page = iTestService.getAllUserTests(iUserService.findOneUser("usr").getId(),null);

        assertEquals(1,page.getSize());

        iUserService.deleteByUsername("usr");
        page.get().forEach(test1 -> iTestService.deleteTest(test1.getId()));


    }



}
