package com.fahd.backend.blogIn.handler;

import jakarta.inject.Named;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

@Named
public class BlogInRequestHandler {
    public Mono<ServerResponse> helloApi(ServerRequest serverRequest) {
        return ServerResponse.ok().bodyValue("Hello");
    }
}
