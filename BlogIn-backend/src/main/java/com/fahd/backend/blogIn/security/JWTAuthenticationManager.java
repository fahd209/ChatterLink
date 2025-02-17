package com.fahd.backend.blogIn.security;

import com.fahd.backend.blogIn.service.UserService;
import jakarta.inject.Inject;
import org.springframework.boot.autoconfigure.batch.BatchTaskExecutor;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.ReactiveAuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.server.authentication.ServerAuthenticationConverter;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;


@Component
public class JWTAuthenticationManager implements ReactiveAuthenticationManager {

    private final JWTUtil jwtUtil;
    private final UserService userService;

    @Inject
    public JWTAuthenticationManager(JWTUtil jwtUtil, UserService userService) {
        this.jwtUtil = jwtUtil;
        this.userService = userService;
    }

    @Override
    public Mono<Authentication> authenticate(Authentication authentication) {
        // extracting token from auth req
        String token = authentication.getCredentials().toString();
        String username = jwtUtil.extractUsername(token);

        // getting user from data base and validating the token
        return userService.findUserByUsername(username)
                .map(userDetails -> {
                    if (jwtUtil.validateToken(token, userDetails.getUsername())) {
                        return authentication;
                    } else {
                        throw new AuthenticationException("Invalid JWT token") {};
                    }
                });
    }

    @Bean
    public ServerAuthenticationConverter authenticationConverter() {
        return exchange -> {
            String token = exchange.getRequest().getHeaders().getFirst("Authorization");
            if(token != null && token.startsWith("Bearer ")) {
                token = token.substring(7);
                return Mono.just(SecurityContextHolder.getContext().getAuthentication());
            }
            return Mono.empty();
        };
    }
}
