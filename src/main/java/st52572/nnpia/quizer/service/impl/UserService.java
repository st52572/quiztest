package st52572.nnpia.quizer.service.impl;


import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import st52572.nnpia.quizer.dao.UserRepository;
import st52572.nnpia.quizer.model.User;
import st52572.nnpia.quizer.model.UserDto;
import st52572.nnpia.quizer.service.IUserService;

import javax.transaction.Transactional;
import java.util.*;


@Service(value = "userService")
public class UserService implements UserDetailsService, IUserService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private BCryptPasswordEncoder bcryptEncoder;

	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userRepository.findByUsername(username);
		if (user == null) {
			throw new UsernameNotFoundException("Invalid username or password.");
		}
		return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), getAuthority());
	}

	private List<SimpleGrantedAuthority> getAuthority() {
		return Collections.singletonList(new SimpleGrantedAuthority("ROLE_ADMIN"));
	}


	@Override
	public User findOneUser(String username) {
		return userRepository.findByUsername(username);
	}

	@Override
	public User findUserById(int id) {
		Optional<User> optionalUser = userRepository.findById(id);
		return optionalUser.orElse(null);
	}

	/*@Override
	public UserDto updateUser(UserDto userDto) {
		User user = findUserById(userDto.getId());
		if (user != null) {
			BeanUtils.copyProperties(userDto, user, "password", "username");
			userRepository.save(user);
		}
		return userDto;
	}*/

	@Override
	@Transactional
	public void deleteByUsername(String username) {
		userRepository.deleteByUsername(username);
	}

	@Override
	public User saveUser(UserDto user) {
		User newUser = new User();
		newUser.setUsername(user.getUsername());
		newUser.setFirstName(user.getFirstName());
		newUser.setLastName(user.getLastName());
		newUser.setPassword(bcryptEncoder.encode(user.getPassword()));
		return userRepository.save(newUser);
	}
}
