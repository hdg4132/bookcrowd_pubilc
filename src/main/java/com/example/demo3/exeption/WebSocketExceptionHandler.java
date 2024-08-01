package com.example.demo3.exeption;

import org.springframework.messaging.handler.annotation.MessageExceptionHandler;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class WebSocketExceptionHandler {

    @MessageExceptionHandler
    @SendTo("/sub/errors")
    public String handleException(Throwable exception) {
        return exception.getMessage();
    }
}