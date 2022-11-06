package ro.ubb.mp.controller;

import lombok.Getter;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Getter
public class IndexController {

    private static final String GREET_MESSAGE = "Application is running";

    @GetMapping
    public String getGreetMessage() {
        return GREET_MESSAGE;
    }
}
