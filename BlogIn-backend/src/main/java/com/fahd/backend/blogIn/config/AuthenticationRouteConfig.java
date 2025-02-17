package com.fahd.backend.blogIn.config;

import com.fahd.backend.blogIn.handler.AuthenticationRouteHandler;
import jakarta.inject.Inject;
import jakarta.inject.Named;
import org.springframework.context.annotation.Bean;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.ServerResponse;

import static com.fahd.backend.blogIn.BloginConstants.LOGIN_API;
import static com.fahd.backend.blogIn.BloginConstants.SIGNUP_API;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.web.reactive.function.server.RequestPredicates.POST;
import static org.springframework.web.reactive.function.server.RequestPredicates.accept;
import static org.springframework.web.reactive.function.server.RouterFunctions.route;

@Named
public class AuthenticationRouteConfig {

    private final AuthenticationRouteHandler routeHandler;

    @Inject
    public AuthenticationRouteConfig(final AuthenticationRouteHandler routeHandler) {
        this.routeHandler = routeHandler;
    }

    @Bean
    public RouterFunction<ServerResponse> login() {
        return route(POST(LOGIN_API).and(accept(APPLICATION_JSON)), routeHandler::handleLogin);
    }

    @Bean
    public RouterFunction<ServerResponse> signup() {
        return route(POST(SIGNUP_API).and(accept(APPLICATION_JSON)), routeHandler::handleSignup);
    }

}
