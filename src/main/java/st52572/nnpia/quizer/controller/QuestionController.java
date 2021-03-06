package st52572.nnpia.quizer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import st52572.nnpia.quizer.model.Question;
import st52572.nnpia.quizer.service.IQuestionService;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/questions")
public class QuestionController {

    @Autowired
    private IQuestionService iQuestionService;


    @GetMapping("/getTestQuestions/{id}")
    public Page<Question> getTestQuestions(@PathVariable int id, Pageable pageable) {
        return iQuestionService.getTestQuestions(id,pageable);
    }
    @GetMapping("/getAllTestQuestions/{id}")
    public List<Question> getAllTestQuestions(@PathVariable int id) {
        return iQuestionService.getAllTestQuestions(id);
    }

    @PostMapping("/checkTest")
    public double checkTest(@RequestBody List<Question> answers) {
        return iQuestionService.checkTest(answers);
    }

    @PostMapping("/saveQuestions")
    public void saveQuestions(@RequestBody List<Question> questions) {
        iQuestionService.saveQuestions(questions);
    }

    @PostMapping("/deleteQuestion/{id}")
    @Transactional
    public void deleteQuestion(@PathVariable int id) {
        iQuestionService.deleteQuestion(id);
    }

}
