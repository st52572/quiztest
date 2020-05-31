package st52572.nnpia.quizer.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import st52572.nnpia.quizer.model.Test;
import st52572.nnpia.quizer.model.TestDto;

public interface ITestService {

    void saveTest(TestDto test);

    Page<Test> getAllTests(Pageable pageable);

    Page<Test> getAllTestsFiltered(String filer, Pageable pageable);

    Page<Test> getAllUserTests(int id, Pageable pageable);

    Page<Test> getAllUserTestsFiltered(int id, String filer, Pageable pageable);

    TestDto getTest(int id);

    void deleteTest(int id);

    void setQuestionService(IQuestionService questionService);

}
