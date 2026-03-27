package com.campaign.config;


import com.campaign.entity.AccountEntity;
import com.campaign.repository.AccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final AccountRepository accountRepository;

    @Value("${app.campaign.initial-account-balance}")
    private BigDecimal initialBalance;

    @Override
    public void run(String... args) {
        if (accountRepository.count() == 0) {
            accountRepository.save(new AccountEntity(1L, initialBalance));
        }
    }
}