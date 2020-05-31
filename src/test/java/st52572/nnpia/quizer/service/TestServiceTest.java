package st52572.nnpia.quizer.service;


import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.stubbing.OngoingStubbing;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;
import st52572.nnpia.quizer.model.*;
import st52572.nnpia.quizer.testutil.Creator;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.anyList;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;


@RunWith(SpringRunner.class)
@SpringBootTest
public class TestServiceTest {

    @Mock
    IQuestionService iQuestionServiceMocked;

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
    @org.junit.Test
    public void getUserTestsMocked() {

        User user = new User();
        user.setUsername("usr");
        creator.saveEntity(user);

        TestDto test = new TestDto();
        test.setUser(user);
        test.setName("test");
        test.setTag("tag");

        Question question = new Question();
        question.setQuestion("question");
        question.setAnswer("answer");

        List<Question> list = new ArrayList<Question>(){{add(question);}};

        test.setQuestions(list);

        iTestService.setQuestionService(iQuestionServiceMocked);

        doNothing().when(iQuestionServiceMocked).saveQuestions(list);
        when(iQuestionServiceMocked.getAllTestQuestions(anyInt())).thenReturn(list);

        iTestService.saveTest(test);

        Page<Test> page = iTestService.getAllUserTests(iUserService.findOneUser("usr").getId(),null);

        assertEquals(1,page.getSize());

        iUserService.deleteByUsername("usr");
        page.get().forEach(test1 -> iTestService.deleteTest(test1.getId()));

    }



}
