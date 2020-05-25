package st52572.nnpia.quizer.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import st52572.nnpia.quizer.dao.TestRepository;
import st52572.nnpia.quizer.model.Test;
import st52572.nnpia.quizer.model.TestDto;
import st52572.nnpia.quizer.service.IQuestionService;
import st52572.nnpia.quizer.service.ITestService;

import java.util.Collection;
import java.util.Comparator;
import java.util.Optional;
import java.util.stream.Collectors;


@Service(value = "testService")
public class TestService implements ITestService {

    @Autowired
    private TestRepository testRepository;

    @Autowired
    private IQuestionService iQuestionService;

    @Override
    public void saveTest(TestDto test) {
        Test insertedTest = new Test();
        insertedTest.setName(test.getName());
        insertedTest.setTag(test.getTag());
        insertedTest.setUser(test.getUser());
        if (test.getId() >= 1) {
            insertedTest.setId(test.getId());
        }
        testRepository.save(insertedTest);
        if(test.getQuestions()!=null && test.getQuestions().size() > 0) {
            test.getQuestions().forEach(question -> question.setTest(insertedTest));
            iQuestionService.saveQuestions(test.getQuestions());
        }
    }

    @Override
    public Page<Test> getAllTests(Pageable pageable) {
        return testRepository.findAll(pageable);
    }

    @Override
    public Page<Test> getAllTestsFiltered(String filter, Pageable pageable) {
        return testRepository.findByNameIsLikeOrTagIsLike("%" + filter + "%", "%" + filter + "%", pageable);
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
    public TestDto getTest(int id) {
        Optional<Test> test = testRepository.findById(id);
        if (test.isPresent()) {
            Test t = test.get();
            TestDto testDto = new TestDto();
            testDto.setId(t.getId());
            testDto.setName(t.getName());
            testDto.setTag(t.getTag());
            testDto.setQuestions(iQuestionService.getAllTestQuestions(id));
            return testDto;
        }
        return new TestDto();
    }

    @Override
    public void deleteTest(int id) {
        testRepository.deleteById(id);
    }
}
