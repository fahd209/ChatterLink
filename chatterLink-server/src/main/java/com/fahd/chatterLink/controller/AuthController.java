package com.fahd.chatterLink.controller;

import com.fahd.chatterLink.model.AuthRequest;
import com.fahd.chatterLink.model.AuthResponse;
import com.fahd.chatterLink.model.RegisterRequest;
import com.fahd.chatterLink.service.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.fahd.chatterLink.ChatterLinkServerConstants.*;

@RestController
@RequestMapping(AUTH_API)
@CrossOrigin
public class AuthController {

    private final AuthenticationService authenticationService;

    @Autowired
    public AuthController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping(LOGIN_API)
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest authRequest) {
        return ResponseEntity.ok(authenticationService.authenticate(authRequest));
    }

    @PostMapping(SIGN_UP_API)
    public ResponseEntity<AuthResponse> signIn(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authenticationService.registerUser(request));
    }

}
