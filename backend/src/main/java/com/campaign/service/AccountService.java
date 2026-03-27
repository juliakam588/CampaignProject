package com.campaign.service;

import com.campaign.dto.AccountResponse;
import com.campaign.entity.AccountEntity;
import com.campaign.exception.InsufficientFundsException;
import com.campaign.exception.ResourceNotFoundException;
import com.campaign.repository.AccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
public class AccountService {

    private static final Long DEFAULT_ACCOUNT_ID = 1L;

    private final AccountRepository accountRepository;

    public AccountEntity getAccountEntity() {
        return accountRepository.findById(DEFAULT_ACCOUNT_ID)
                .orElseThrow(() -> new ResourceNotFoundException("Account not found"));
    }

    public AccountResponse getAccount() {
        AccountEntity account = getAccountEntity();
        return new AccountResponse(account.getBalance());
    }

    public void validateSufficientFunds(BigDecimal amount) {
        AccountEntity account = getAccountEntity();
        if (account.getBalance().compareTo(amount) < 0) {
            throw new InsufficientFundsException("Insufficient account balance");
        }
    }

    public void deductFunds(BigDecimal amount) {
        AccountEntity account = getAccountEntity();

        if (account.getBalance().compareTo(amount) < 0) {
            throw new InsufficientFundsException("Insufficient account balance");
        }

        account.setBalance(account.getBalance().subtract(amount));
        accountRepository.save(account);
    }

    public void addFunds(BigDecimal amount) {
        AccountEntity account = getAccountEntity();
        account.setBalance(account.getBalance().add(amount));
        accountRepository.save(account);
    }
}