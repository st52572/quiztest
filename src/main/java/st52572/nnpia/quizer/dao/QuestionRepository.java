package st52572.nnpia.quizer.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import st52572.nnpia.quizer.model.Question;
import st52572.nnpia.quizer.model.Test;

import java.util.List;

public interface QuestionRepository extends PagingAndSortingRepository<Question, Integer> {

    public List<Question> findAllByTestId(int testId);

    public Page<Question> findAllByTest_Id(int id, Pageable pageable);

    public void deleteById(int id);
}
