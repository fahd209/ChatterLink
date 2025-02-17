package com.fahd.backend.blogIn.service;

import com.fahd.backend.blogIn.model.AuthRequest;
import com.fahd.backend.blogIn.model.AuthResponse;
import com.fahd.backend.blogIn.model.User;
import com.fahd.backend.blogIn.security.JWTUtil;
import jakarta.inject.Inject;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class AuthService {

    private final JWTUtil jwtUtil;
    private final UserService userService;

    @Inject
    public AuthService(final JWTUtil jwtUtil, final UserService userService) {
        this.jwtUtil = jwtUtil;
        this.userService = userService;
    }

    /*
    * Finds user by username
    * Checks password
    * Returns JWT token
    * */
    public Mono<AuthResponse> login(final AuthRequest authRequest) {
        return userService.findUserByUsername(authRequest.getUsername())
                .map(userDetails -> {
                    BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
                    boolean isCorrectPassword = passwordEncoder.matches(authRequest.getPassword(), userDetails.getPassword());
                    if (isCorrectPassword) {
                        return new AuthResponse(jwtUtil.generateToken(authRequest.getUsername()));
                    } else {
                        throw new BadCredentialsException("Invalid username or password");
                    }
                }).switchIfEmpty(Mono.empty());
    }

    /*
    * checks if the user exists
    * if not then save the user and log them in
    * after login return JWT token to the client
    * */
    public Mono<String> signup(final User user) {
        return userService.findUserByUsername(user.getUsername())
                .flatMap(existing -> Mono.just("User already exists"))
                .switchIfEmpty(Mono.defer(() -> userService.saveUser(user)
                        .flatMap(savedUser -> Mono.just("User was successfully saved")))
                )
                .doOnError(e -> Mono.error(new BadCredentialsException("Failed to save user")));
    }
}
