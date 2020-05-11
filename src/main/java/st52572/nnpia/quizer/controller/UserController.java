package st52572.nnpia.quizer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import st52572.nnpia.quizer.dao.UserRepository;
import st52572.nnpia.quizer.model.ApiResponse;
import st52572.nnpia.quizer.model.User;
import st52572.nnpia.quizer.model.UserDto;
import st52572.nnpia.quizer.service.IUserService;

@RestController
@CrossOrigin
@RequestMapping("/users")
public class UserController {

    @Autowired
    private IUserService iUserService;

    @Autowired
    private UserRepository userRepository;

    /*@GetMapping("/users")
    public List<User> getUsers() {
        return userDao.findAll();
    }*/

    @PostMapping("/add")
    public ApiResponse<User> saveUser(@RequestBody UserDto user) {
        return new ApiResponse<>(HttpStatus.OK.value(), "User saved successfully.", iUserService.save(user));
    }

    /*@GetMapping(value = {"/delete/{id}"})
    public boolean deleteUser(@PathVariable int id) {
        userDao.delete(userDao.getOne(id));
        return true;
    }*/

    @PostMapping("/{id}")
    public ApiResponse<User> getOne(@PathVariable int id) {
        return new ApiResponse<>(HttpStatus.OK.value(), "User saved successfully.", iUserService.findById(id));
    }


    @PostMapping("/get")
    public User getUser(@RequestBody UserDto user) {
        User one = iUserService.findOne(user.getUsername());
        if (one != null) {
            one.setPassword(null);
            return one;
        }
        return new User();
    }
}
