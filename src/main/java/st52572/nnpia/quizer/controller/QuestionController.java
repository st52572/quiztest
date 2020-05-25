package st52572.nnpia.quizer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import st52572.nnpia.quizer.model.Question;
import st52572.nnpia.quizer.service.IQuestionService;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/questions")
public class QuestionController {

    @Autowired
    private IQuestionService iQuestionService;


    @GetMapping("/{id}")
    public Page<Question> getQuestions(@PathVariable int id, Pageable pageable) {
        return iQuestionService.getQuestions(id,pageable);
    }
    @GetMapping("/all/{id}")
    public List<Question> getAllQuestions(@PathVariable int id) {
        return iQuestionService.getAllQuestions(id);
    }

    @PostMapping("/checkTest")
    public double checkTest(@RequestBody List<Question> answers) {
        return iQuestionService.checkTest(answers);
    }

    @PostMapping("/save")
    public void addQuestions(@RequestBody List<Question> questions) {
        iQuestionService.addQuestions(questions);
    }

    @PostMapping("/delete/{id}")
    @Transactional
    public void deleteQuestion(@PathVariable int id) {
        iQuestionService.delete(id);
    }

}
