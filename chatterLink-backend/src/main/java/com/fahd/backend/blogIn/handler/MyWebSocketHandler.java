package com.fahd.backend.blogIn.handler;

import jakarta.inject.Named;
import org.springframework.web.reactive.socket.WebSocketHandler;
import org.springframework.web.reactive.socket.WebSocketSession;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;

@Named
public class MyWebSocketHandler implements WebSocketHandler {
    @Override
    public List<String> getSubProtocols() {
        return WebSocketHandler.super.getSubProtocols();
    }

    @Override
    public Mono<Void> handle(WebSocketSession session) {
        var f = Flux.just("A", "B", "C").map(e -> session.textMessage(e));
        return session.send(f);
    }
}
