package st52572.nnpia.quizer.service;

import st52572.nnpia.quizer.model.Question;

import java.util.List;

public interface IAnswersCheckerService {

    double getRightPercentage(List<Question> questions, List<Question> answers);
}
