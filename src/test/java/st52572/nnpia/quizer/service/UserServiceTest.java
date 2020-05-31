package st52572.nnpia.quizer.service;

import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import st52572.nnpia.quizer.model.Question;
import st52572.nnpia.quizer.model.Test;
import st52572.nnpia.quizer.model.User;
import st52572.nnpia.quizer.model.UserDto;

import java.util.ArrayList;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserServiceTest {

    @Autowired
    IUserService iUserService;


    @org.junit.Test
    public void saveUser() {

        UserDto user = new UserDto();
        user.setUsername("usr");
        user.setPassword("pwd");
        user.setFirstName("fn");
        user.setLastName("ln");
        iUserService.saveUser(user);

        User u = iUserService.findOneUser("usr");

        assertEquals("fn", u.getFirstName());
        assertEquals("ln", u.getLastName());
        assertEquals("usr", u.getUsername());

        iUserService.deleteByUsername("usr");
    }



}
