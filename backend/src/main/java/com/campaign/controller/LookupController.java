package com.campaign.controller;

import com.campaign.service.LookupService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/lookups")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class LookupController {

    private final LookupService lookupService;

    @GetMapping("/keywords")
    public List<String> getKeywords() {
        return lookupService.getKeywords();
    }

    @GetMapping("/towns")
    public List<String> getTowns() {
        return lookupService.getTowns();
    }
}