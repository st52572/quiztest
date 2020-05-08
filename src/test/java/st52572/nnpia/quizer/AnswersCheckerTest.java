package st52572.nnpia.quizer;

import org.junit.Test;
import org.springframework.boot.test.context.SpringBootTest;
import st52572.nnpia.quizer.model.Question;
import st52572.nnpia.quizer.service.IAnswersCheckerService;
import st52572.nnpia.quizer.service.impl.AnswersCheckerService;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.assertEquals;

@SpringBootTest
public class AnswersCheckerTest {


    @Test
    public void getRightPercentageTest(){
        Question question1 = new Question();
        question1.setAnswer("a1");
        Question question2 = new Question();
        question2.setAnswer("a2");
        List<Question> list1 = new ArrayList<>();
        list1.add(question1);
        list1.add(question2);

        Question question3 = new Question();
        question3.setAnswer("a3");
        Question question4 = new Question();
        question4.setAnswer("a2");
        List<Question> list2 = new ArrayList<>();
        list2.add(question3);
        list2.add(question4);

        IAnswersCheckerService iAnswersCheckerService = new AnswersCheckerService();

        assertEquals(0.5, iAnswersCheckerService.getRightPercentage(list1, list2), 10);

    }
}
