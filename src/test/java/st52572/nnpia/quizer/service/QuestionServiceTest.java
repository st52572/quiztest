package st52572.nnpia.quizer.service;

import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import st52572.nnpia.quizer.model.Question;
import st52572.nnpia.quizer.model.Test;


import java.util.ArrayList;
import static org.mockito.Mockito.when;
import static org.junit.Assert.assertEquals;


@RunWith(SpringRunner.class)
@SpringBootTest
public class QuestionServiceTest {

    @Mock
    IQuestionService iQuestionServiceMocked;


    @org.junit.Test
    public void getQuestions() {

        Test test = new Test();
        test.setId(1);
        test.setName("test");
        test.setTag("tag");
        Question question = new Question();
        question.setId(1);
        question.setQuestion("question");
        question.setAnswer("answer");
        question.setTest(test);

        when(iQuestionServiceMocked.getAllTestQuestions(1)).thenReturn(new ArrayList<Question>(){{add(question);}});
        when(iQuestionServiceMocked.getAllTestQuestions(2)).thenReturn(new ArrayList<>());

        assertEquals(1, iQuestionServiceMocked.getAllTestQuestions(1).size());
        assertEquals(0, iQuestionServiceMocked.getAllTestQuestions(2).size());
    }



}
