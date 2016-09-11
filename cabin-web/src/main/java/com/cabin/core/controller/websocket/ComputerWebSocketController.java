package com.cabin.core.controller.websocket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.cabin.core.websocket.ComputerStatus;

@RestController
public class ComputerWebSocketController { 
    
    @Autowired
    private SimpMessagingTemplate webSocket;

//    @MessageMapping("/status")
//    @SendTo("/cabin/computer")
    @RequestMapping(value = "/post/computerStatus", method = RequestMethod.POST, produces = { "application/json;charset=UTF-8" })
    public ComputerStatus getComputersStatus(@RequestBody(required = true) ComputerStatus computerStatus) {
        webSocket.convertAndSend("/cabin/computer", computerStatus);
        System.out.println("websocket message sent");
        return computerStatus;
    }
}
