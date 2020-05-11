package st52572.nnpia.quizer.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import st52572.nnpia.quizer.model.Test;

public interface ITestService {

    Integer add(Test test);

    Page<Test> getAll(Pageable pageable);

    Page<Test> getAllFiltered(String filer, Pageable pageable);

    Page<Test> getAllUserTests(int id, Pageable pageable);

    Page<Test> getAllUserTestsFiltered(int id, String filer, Pageable pageable);

    Test get(int id);

    void delete(int id);

}
