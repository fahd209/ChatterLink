package com.fahd.backend.blogIn.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;

@Configuration
@EnableWebFluxSecurity
public class SecurityConfig {
    private final JWTAuthenticationManager authenticationManager;

    public SecurityConfig(JWTAuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    // configuring secuirty settings
    @Bean
    public SecurityWebFilterChain SecurityWebFilterChain(ServerHttpSecurity httpSecurity) {
        return httpSecurity
                .csrf(ServerHttpSecurity.CsrfSpec::disable)
                .authorizeExchange(authorizeExchangeSpec -> authorizeExchangeSpec
                        .pathMatchers("api/v1/signup", "api/v1/login").permitAll()
                        .anyExchange().authenticated())
                .authenticationManager(authenticationManager)
                .httpBasic(ServerHttpSecurity.HttpBasicSpec::disable)
                .formLogin(ServerHttpSecurity.FormLoginSpec::disable)
                .build();
    }
}
