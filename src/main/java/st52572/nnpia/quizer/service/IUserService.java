package st52572.nnpia.quizer.service;

import st52572.nnpia.quizer.model.User;
import st52572.nnpia.quizer.model.UserDto;

import javax.transaction.Transactional;
import java.util.List;

public interface IUserService {

    User saveUser(UserDto user);

    User findOneUser(String username);

    User findUserById(int id);


    @Transactional
    void deleteByUsername(String username);

}
