package st52572.nnpia.quizer.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;
import st52572.nnpia.quizer.model.Question;
import st52572.nnpia.quizer.model.Test;

import java.util.List;

public interface IQuestionService {

    Page<Question> getTestQuestions(int id, Pageable pageable);

    double checkTest(List<Question> answers);

    List<Question> getAllTestQuestions(int testId);

    void saveQuestions(List<Question> questions);

    void deleteQuestion(int id);

    @Transactional
    void deleteQuestionByTestId(int testId);
}
