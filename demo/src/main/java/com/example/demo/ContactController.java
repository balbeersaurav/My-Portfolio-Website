package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class ContactController {

    @Autowired
    private ContactRepository repo;

    // open contact page
    @GetMapping("/getintouch.html")
    public String contactPage() {
        return "getintouch";
    }

    // form submit
    @PostMapping("/send")
    public String saveContact(
            @RequestParam String firstName,
            @RequestParam String lastName,
            @RequestParam String email,
            @RequestParam String message,
            Model model
    ) {

        Contact contact = new Contact();

        contact.setFirstName(firstName);
        contact.setLastName(lastName);
        contact.setEmail(email);
        contact.setMessage(message);

        repo.save(contact);

        // success message
        model.addAttribute(
                "successMessage",
                "Thanks to Get In Touch with Balbeer 🚀"
        );

        return "getintouch";
    }
}