package st52572.nnpia.quizer.service.impl;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import st52572.nnpia.quizer.dao.QuestionRepository;
import st52572.nnpia.quizer.model.Question;
import st52572.nnpia.quizer.service.IAnswersCheckerService;
import st52572.nnpia.quizer.service.IQuestionService;

import java.util.List;

@Service(value = "questionService")
public class QuestionService implements IQuestionService {

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private IAnswersCheckerService iAnswersCheckerService;


    @Override
    public Page<Question> getTestQuestions(int id, Pageable pageable) {
        Page<Question> questions = questionRepository.findAllByTest_Id(id, pageable);
        questions.stream().forEach(question -> question.setAnswer(""));
        return questions;
    }

    @Override
    public double checkTest(List<Question> answers) {
        List<Question> rightAnswers = questionRepository.findAllByTestId(answers.get(0).getTest().getId());
        return iAnswersCheckerService.getRightPercentage(rightAnswers, answers);
    }

    @Override
    public List<Question> getAllTestQuestions(int testId) {
        return questionRepository.findAllByTestId(testId);
    }

    @Override
    public void saveQuestions(List<Question> questions) {
        questionRepository.saveAll(questions);
    }

    @Override
    public void deleteQuestion(int id) {
        questionRepository.deleteById(id);
    }

    @Override
    @Transactional
    public void deleteQuestionByTestId(int testId) {
        questionRepository.deleteByTest_Id(testId);
    }
}
