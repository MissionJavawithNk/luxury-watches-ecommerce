package com.luxury.watches.controller;

import com.luxury.watches.model.Watch;
import com.luxury.watches.repository.WatchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/watches")
@CrossOrigin(origins = "http://localhost:5173") // Allow frontend to access
public class WatchController {

    @Autowired
    private WatchRepository watchRepository;

    @GetMapping
    public List<Watch> getAllWatches() {
        return watchRepository.findAll();
    }

    @GetMapping("/{id}")
    public Watch getWatchById(@PathVariable Long id) {
        return watchRepository.findById(id).orElse(null);
    }

    @PostMapping
    public Watch createWatch(@RequestBody Watch watch) {
        return watchRepository.save(watch);
    }
}
