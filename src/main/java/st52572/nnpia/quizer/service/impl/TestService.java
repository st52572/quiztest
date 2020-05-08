package st52572.nnpia.quizer.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import st52572.nnpia.quizer.dao.TestRepository;
import st52572.nnpia.quizer.model.Test;
import st52572.nnpia.quizer.service.ITestService;

import java.util.Optional;


@Service(value = "testService")
public class TestService implements ITestService {

    @Autowired
    private TestRepository testRepository;

    @Override
    public Integer add(Test test) {
        testRepository.save(test);
        return test.getId();
    }

    @Override
    public Page<Test> getAll(Pageable pageable) {
        return testRepository.findAll(pageable);
    }

    @Override
    public Page<Test> getAllFiltered(String filter, Pageable pageable) {
        return testRepository.findByNameIsLike("%" + filter + "%", pageable);
    }

    @Override
    public Page<Test> getAllUserTests(int id, Pageable pageable) {
        return testRepository.findByUser_Id(id, pageable);
    }

    @Override
    public Page<Test> getAllUserTestsFiltered(int id, String filter, Pageable pageable) {
        return testRepository.findByUser_IdAndNameIsLike(id, "%" + filter + "%", pageable);
    }

    @Override
    public Test get(Long id) {
        Optional<Test> test = testRepository.findById(id);
        return test.orElseGet(Test::new);
    }

    @Override
    public void delete(int id) {
        testRepository.deleteById(id);
    }
}
