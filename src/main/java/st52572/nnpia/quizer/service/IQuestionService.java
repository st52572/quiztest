package st52572.nnpia.quizer.service;

import st52572.nnpia.quizer.model.Question;

import java.util.List;

public interface IQuestionService {

    List<Question> getQuestions(int id);

    double checkTest(List<Question> answers);

    List<Question> addQuestions(List<Question> questions);
}
