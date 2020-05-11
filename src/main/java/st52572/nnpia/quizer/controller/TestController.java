package st52572.nnpia.quizer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import st52572.nnpia.quizer.model.Test;
import st52572.nnpia.quizer.service.ITestService;


@RestController
@CrossOrigin
@RequestMapping("/tests")
public class TestController {


    @Autowired
    private ITestService iTestService;


    @PostMapping
    public Page<Test> getTests(Pageable pageable) {
        return iTestService.getAll(pageable);
    }

    @PostMapping("/{filter}")
    public Page<Test> getTests(@PathVariable String filter, Pageable pageable) {
        return iTestService.getAllFiltered(filter, pageable);
    }

    @PostMapping("/user/{id}")
    public Page<Test> getTests(@PathVariable int id, Pageable pageable) {
        return iTestService.getAllUserTests(id, pageable);
    }

    @PostMapping("/user/{id}/{filter}")
    public Page<Test> getTests(@PathVariable int id, @PathVariable String filter, Pageable pageable) {
        return iTestService.getAllUserTestsFiltered(id, filter, pageable);
    }

    @GetMapping(value = {"/{id}"})
    public Test getTest(@PathVariable Long id) {
        return iTestService.get(id);
    }

    @PostMapping("/add")
    public Integer addTest(@RequestBody Test test) {
        iTestService.add(test);
        return test.getId();
    }

    @PostMapping("/delete/{id}")
    @Transactional
    public void deleteTest(@PathVariable int id) {
        System.out.println(id);
        iTestService.delete(id);
    }


}