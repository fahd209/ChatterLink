package com.fahd.chatterLink.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final AuthenticationProvider authenticationProvider;
    private final JwtAuthFilter authFilter;

    public SecurityConfig(AuthenticationProvider authenticationProvider, JwtAuthFilter authFilter) {
        this.authenticationProvider = authenticationProvider;
        this.authFilter = authFilter;
    }

    @Bean
    public SecurityFilterChain securityWebFilterChain(final HttpSecurity http) throws Exception {
        //httpSecurity.addFilterAt(securityContextFilter, SecurityWebFiltersOrder.AUTHENTICATION);
        return http.csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(request -> request
                        .requestMatchers("/api/v1/auth/**", "/api/v1/demo/test").permitAll()
                        .anyRequest().authenticated())
                .sessionManagement(sessionManagement ->
                        sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(authFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }
}
