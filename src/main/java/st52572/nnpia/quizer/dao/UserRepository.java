package st52572.nnpia.quizer.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import st52572.nnpia.quizer.model.User;


public interface UserRepository extends JpaRepository<User, Integer> {

    User findByUsername(String login);

    boolean existsByUsername(String loging);
}
