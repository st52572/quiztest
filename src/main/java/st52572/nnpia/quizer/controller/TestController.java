package st52572.nnpia.quizer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import st52572.nnpia.quizer.model.Filter;
import st52572.nnpia.quizer.model.Test;
import st52572.nnpia.quizer.model.TestDto;
import st52572.nnpia.quizer.service.ITestService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/tests")
public class TestController {


    @Autowired
    private ITestService iTestService;


    @PostMapping("/getAllTests")
    public Page<Test> getAllTests(Pageable pageable) {
        return iTestService.getAllTests(pageable);
    }

    @PostMapping("/getAllTestsFiltered")
    public Page<Test> getAllTestsFiltered(@RequestBody Filter filter, Pageable pageable) {

        return iTestService.getAllTestsFiltered(filter.getFilter(), pageable);
    }

    @PostMapping("/getUserTests/{id}")
    public Page<Test> getUserTests(@PathVariable int id, Pageable pageable) {
        return iTestService.getAllUserTests(id, pageable);
    }

    @PostMapping("/getUserTestsFiltered/{id}")
    public Page<Test> getUserTestsFiltered(@PathVariable int id, @RequestBody Filter filter, Pageable pageable) {
        return iTestService.getAllUserTestsFiltered(id, filter.getFilter(), pageable);
    }

    @GetMapping("/getTest/{id}")
    public TestDto getTest(@PathVariable int id) {
        return iTestService.getTest(id);
    }

    @PostMapping("/addTest")
    public void addTest(@RequestBody TestDto test) {
        iTestService.saveTest(test);
    }

    @PostMapping("/deleteTest/{id}")
    @Transactional
    public void deleteTest(@PathVariable int id) {
        iTestService.deleteTest(id);
    }


}
