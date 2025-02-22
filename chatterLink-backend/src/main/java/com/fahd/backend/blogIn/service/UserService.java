package com.fahd.backend.blogIn.service;

import com.fahd.backend.blogIn.model.User;
import com.fahd.backend.blogIn.repository.UserRepository;
import jakarta.inject.Inject;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Inject
    public UserService(final UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Mono<User> findUserByUsername(String userName) {
        return userRepository.findByUsername(userName);
    }

    public Mono<User> saveUser(User user) {
        return userRepository.save(user);
    }
}
