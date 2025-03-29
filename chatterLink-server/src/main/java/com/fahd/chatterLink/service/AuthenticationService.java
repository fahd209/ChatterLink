package com.fahd.chatterLink.service;

import com.fahd.chatterLink.model.*;
import com.fahd.chatterLink.repository.UserRepository;
import com.fahd.chatterLink.security.JwtService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final static Logger LOGGER = LoggerFactory.getLogger(AuthenticationService.class);

    @Autowired
    public AuthenticationService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    public AuthResponse registerUser(RegisterRequest request) {
        var user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();

        boolean isAnyInputEmpty = request.getFirstName().isEmpty() || request.getLastName().isEmpty() || request.getEmail().isEmpty() || request.getPassword().isEmpty();

        if (isAnyInputEmpty) {
            LOGGER.error("Register request was empty");
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "All signup field can't be empty");
        }

        // if there is a user with the same email return a status code bad request
        if (userRepository.findByEmail(user.getEmail()).isPresent()){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User already exists");
        }

        userRepository.save(user);

        var jwt = jwtService.generateToken(user);
        return AuthResponse.builder().accessToken(jwt).message("User registered successfully").build();
    }

    public AuthResponse authenticate(AuthRequest authRequest) {

        // if the request is empty don't allow the user to login
        if (authRequest.getEmail().isEmpty() || authRequest.getPassword().isEmpty()) {
            LOGGER.error("Login request was empty");
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Login fields can not be empty");
        }

        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                authRequest.getEmail(), authRequest.getPassword()
        ));

        var user = userRepository.findByEmail(authRequest.getEmail())
                .orElseThrow();

        var jwtToken = jwtService.generateToken(user);
        return AuthResponse.builder()
                .accessToken(jwtToken)
                .message("User logged in successfully")
                .build();
    }
}
