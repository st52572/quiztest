package st52572.nnpia.quizer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import st52572.nnpia.quizer.dao.UserRepository;
import st52572.nnpia.quizer.model.ApiResponse;
import st52572.nnpia.quizer.model.User;
import st52572.nnpia.quizer.model.UserDto;
import st52572.nnpia.quizer.service.IUserService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private IUserService iUserService;



    @PostMapping("/saveUser")
    public ApiResponse<User> saveUser(@RequestBody UserDto user) {
        return new ApiResponse<>(HttpStatus.OK.value(), "User saved successfully.", iUserService.saveUser(user));
    }


    @PostMapping("/getOne/{id}")
    public ApiResponse<User> getOne(@PathVariable int id) {
        return new ApiResponse<>(HttpStatus.OK.value(), "User saved successfully.", iUserService.findUserById(id));
    }


    @PostMapping("/getUser")
    public User getUser(@RequestBody UserDto user) {
        User one = iUserService.findOneUser(user.getUsername());
        if (one != null) {
            one.setPassword(null);
            return one;
        }
        return new User();
    }
}
