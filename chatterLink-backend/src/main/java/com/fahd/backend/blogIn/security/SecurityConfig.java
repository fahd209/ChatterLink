package com.fahd.backend.blogIn.security;

import jakarta.inject.Inject;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.SecurityWebFiltersOrder;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;


@Configuration
@EnableWebFluxSecurity
public class SecurityConfig {

    // configuring secuirty settings
    @Bean
    public SecurityWebFilterChain securityWebFilterChain(final ServerHttpSecurity httpSecurity) {
        //httpSecurity.addFilterAt(securityContextFilter, SecurityWebFiltersOrder.AUTHENTICATION);
        return httpSecurity.authorizeExchange(authorizeExchangeSpec -> authorizeExchangeSpec
                .anyExchange().authenticated())
                .oauth2Login(Customizer.withDefaults())
                .build();
    }
}
