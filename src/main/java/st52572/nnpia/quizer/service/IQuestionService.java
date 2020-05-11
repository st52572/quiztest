package st52572.nnpia.quizer.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import st52572.nnpia.quizer.model.Question;
import st52572.nnpia.quizer.model.Test;

import java.util.List;

public interface IQuestionService {

    Page<Question> getQuestions(int id, Pageable pageable);

    double checkTest(List<Question> answers);

    List<Question> getAllQuestions(int testId);

    void addQuestions(List<Question> questions);

    void delete(int id);
}
