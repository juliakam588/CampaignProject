package com.campaign.controller;


import com.campaign.dto.AccountResponse;
import com.campaign.service.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/account")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AccountController {

    private final AccountService accountService;

    @GetMapping
    public AccountResponse getAccount() {
        return accountService.getAccount();
    }
}