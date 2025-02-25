package com.fahd.chatterLink.controller;

import com.fahd.chatterLink.model.AuthRequest;
import com.fahd.chatterLink.model.AuthResponse;
import com.fahd.chatterLink.model.RegisterRequest;
import com.fahd.chatterLink.service.AuthenticationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin
public class AuthController {

    private final AuthenticationService authenticationService;

    public AuthController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest authRequest) {
        return ResponseEntity.ok(authenticationService.authenticate(authRequest));
    }

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> signIn(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authenticationService.registerUser(request));
    }

}
