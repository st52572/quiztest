package st52572.nnpia.quizer.service;

import st52572.nnpia.quizer.model.User;
import st52572.nnpia.quizer.model.UserDto;

import java.util.List;

public interface IUserService {

    User save(UserDto user);

    List<User> findAll();

    void delete(int id);

    User findOne(String username);

    User findById(int id);

    UserDto update(UserDto userDto);
}
