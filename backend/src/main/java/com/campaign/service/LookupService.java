package com.campaign.service;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LookupService {

    public List<String> getKeywords() {
        return List.of(
                "shoes",
                "dress",
                "jacket"
        );
    }

    public List<String> getTowns() {
        return List.of(
                "Warsaw",
                "London",
                "New York"
        );
    }
}