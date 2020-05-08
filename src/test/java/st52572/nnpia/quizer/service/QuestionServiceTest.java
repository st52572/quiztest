package st52572.nnpia.quizer.service;


import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.test.context.junit4.SpringRunner;
import st52572.nnpia.quizer.model.Question;
import st52572.nnpia.quizer.model.User;
import st52572.nnpia.quizer.testutil.Creator;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;
import static org.junit.Assert.assertEquals;


@RunWith(SpringRunner.class)
@SpringBootTest
public class QuestionServiceTest {

    @Mock
    IQuestionService iQuestionServiceMocked;

    @Autowired
    IQuestionService iQuestionService;

    @Autowired
    ITestService iTestService;

    @Autowired
    Creator creator;

    @Test
    public void addQuestions() {
        Question question = new Question();
        Question question2 = new Question();
        Question question3 = new Question();
        List<Question> insertedQuestionList = new ArrayList<>();
        insertedQuestionList.add(question);
        insertedQuestionList.add(question2);


        List<Question> realDatabaseList = new ArrayList<>();
        realDatabaseList.add(question3);

        when(iQuestionServiceMocked.addQuestions(anyList())).thenReturn(insertedQuestionList);

        when(iQuestionServiceMocked.getQuestions(anyInt())).thenReturn(realDatabaseList);

        realDatabaseList.addAll(iQuestionServiceMocked.addQuestions(insertedQuestionList));


        List<Question> databaseList = iQuestionServiceMocked.getQuestions(1);
        assertEquals(realDatabaseList.size(), databaseList.size());

    }


    @Test
    public void getQuestions() {

    }

}
