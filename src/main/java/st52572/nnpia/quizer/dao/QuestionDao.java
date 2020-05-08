package st52572.nnpia.quizer.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import st52572.nnpia.quizer.model.Question;

import java.util.List;

public interface QuestionDao extends JpaRepository<Question, Integer> {

    public List<Question> findByTestId(int testId);

    public List<Question> findAllByTest_Id(int id);
}
