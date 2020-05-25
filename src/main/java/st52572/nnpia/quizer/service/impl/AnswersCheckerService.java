package st52572.nnpia.quizer.service.impl;

import org.springframework.stereotype.Component;
import st52572.nnpia.quizer.model.Question;
import st52572.nnpia.quizer.service.IAnswersCheckerService;

import java.util.Comparator;
import java.util.List;

@Component
public class AnswersCheckerService implements IAnswersCheckerService {

    @Override
    public double getRightPercentage(List<Question> rightAnswers, List<Question> answers) {
        double rights = 0;
        double falses = 0;
        rightAnswers.sort(Comparator.comparing(Question::getId));
        answers.sort(Comparator.comparing(Question::getId));
        for (int i = 0; i < rightAnswers.size(); i++) {
            if (rightAnswers.get(i).getAnswer().equals(answers.get(i).getAnswer())) {
                rights++;
            } else {
                falses++;
            }
        }
        return rights/(rights+falses);
    }
}
