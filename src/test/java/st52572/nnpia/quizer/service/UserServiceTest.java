package st52572.nnpia.quizer.service;


import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.context.junit4.SpringRunner;
import st52572.nnpia.quizer.model.User;
import st52572.nnpia.quizer.testutil.Creator;


@RunWith(SpringRunner.class)
@SpringBootTest
public class UserServiceTest {

    @Autowired
    IUserService iUserService;

    @Autowired
    private BCryptPasswordEncoder bcryptEncoder;


    @Autowired
    Creator creator;


    @Test
    public void loginSuccessful() {
        User newUser = new User();
        newUser.setUsername("username");
        newUser.setPassword(bcryptEncoder.encode("password"));
        User user = (User) creator.saveEntity(newUser);
        iUserService.delete(user.getId());

    }

    @Test
    public void loginUnSuccessful() {
        User newUser = new User();
        newUser.setUsername("username");
        newUser.setPassword(bcryptEncoder.encode("password"));
        User user = (User) creator.saveEntity(newUser);
        iUserService.delete(user.getId());

    }
}
