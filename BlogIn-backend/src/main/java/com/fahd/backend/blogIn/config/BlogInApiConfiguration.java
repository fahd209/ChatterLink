package com.fahd.backend.blogIn.config;

import com.fahd.backend.blogIn.handler.BlogInRequestHandler;
import jakarta.inject.Inject;
import jakarta.inject.Named;
import org.springframework.context.annotation.Bean;
import  org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.ServerResponse;

import static org.springframework.web.reactive.function.server.RequestPredicates.GET;
import static org.springframework.web.reactive.function.server.RouterFunctions.route;

@Named
public class BlogInApiConfiguration {

    private final BlogInRequestHandler requestHandler;

    @Inject
    public BlogInApiConfiguration(BlogInRequestHandler requestHandler) {
        this.requestHandler = requestHandler;
    }

    @Bean
    public RouterFunction<ServerResponse> test() {
        return route(GET("/api/v1/hello"), requestHandler::helloApi);
    }

}
