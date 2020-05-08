package st52572.nnpia.quizer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import st52572.nnpia.quizer.model.Question;
import st52572.nnpia.quizer.service.IQuestionService;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/questions")
public class QuestionController {

    @Autowired
    private IQuestionService iQuestionService;


    @GetMapping("/{id}")
    public List<Question> getQuestions(@PathVariable int id) {
        return iQuestionService.getQuestions(id);
    }


    @PostMapping("/checkTest")
    public double checkTest(@RequestBody List<Question> answers) {
        return iQuestionService.checkTest(answers);
    }

    @PostMapping("/save")
    public List<Question> addQuestions(@RequestBody List<Question> questions) {
        return iQuestionService.addQuestions(questions);
    }

}
