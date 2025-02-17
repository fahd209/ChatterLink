package com.fahd.backend.blogIn.handler;

import com.fahd.backend.blogIn.model.AuthRequest;
import com.fahd.backend.blogIn.model.User;
import com.fahd.backend.blogIn.security.JWTUtil;
import com.fahd.backend.blogIn.service.AuthService;
import com.fahd.backend.blogIn.service.UserService;
import jakarta.inject.Inject;
import jakarta.inject.Named;
import org.springframework.http.HttpStatus;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

@Named
public class AuthenticationRouteHandler {

    private final AuthService authService;

    @Inject
    public AuthenticationRouteHandler(AuthService authService) {
        this.authService = authService;
    }

    public Mono<ServerResponse> handleLogin(ServerRequest serverRequest) {
        return serverRequest.bodyToMono(AuthRequest.class)
                .flatMap(authService::login)
                .flatMap(authResponse -> ServerResponse.ok().bodyValue(authResponse))
                .doOnError(e -> ServerResponse.status(HttpStatus.INTERNAL_SERVER_ERROR))
                .switchIfEmpty(ServerResponse.badRequest().bodyValue("Invalid login input"));
    }

    public Mono<ServerResponse> handleSignup(ServerRequest serverRequest) {
        return serverRequest.bodyToMono(User.class)
                .flatMap(authService::signup)
                .flatMap(response -> {
                    if (response.equals("User already exists")) {
                        return ServerResponse.badRequest().bodyValue(response);
                    }
                    return ServerResponse.ok().bodyValue(response);
                })
                .doOnError(e -> ServerResponse.status(HttpStatus.INTERNAL_SERVER_ERROR).bodyValue(e.getMessage()))
                .switchIfEmpty(ServerResponse.status(HttpStatus.BAD_REQUEST).bodyValue("Invalid user credentials"));
    }
}
