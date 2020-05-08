package st52572.nnpia.quizer.service.impl;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import st52572.nnpia.quizer.dao.QuestionDao;
import st52572.nnpia.quizer.model.Question;
import st52572.nnpia.quizer.service.IAnswersCheckerService;
import st52572.nnpia.quizer.service.IQuestionService;

import java.util.List;

@Service(value = "questionService")
public class QuestionService implements IQuestionService {

    @Autowired
    private QuestionDao questionDao;

    @Autowired
    private IAnswersCheckerService iAnswersCheckerService;


    @Override
    public List<Question> getQuestions(int id) {
        List<Question> questions = questionDao.findAllByTest_Id(id);
        questions.stream().forEach(question -> question.setAnswer(""));
        return questions;
    }

    @Override
    public double checkTest(List<Question> answers) {
        List<Question> rightAnswers = questionDao.findByTestId(answers.get(0).getTest().getId());
        return iAnswersCheckerService.getRightPercentage(rightAnswers, answers);
    }

    @Override
    public List<Question> addQuestions(List<Question> questions) {
        questionDao.saveAll(questions);
        return null;
    }
}
