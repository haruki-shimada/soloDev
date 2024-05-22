package com.example.demo.data;

import java.sql.Timestamp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Model.Feedback;
import com.example.demo.Repositories.FeedbackRepository;

@Service
public class FeedbackService {
    @Autowired
    private FeedbackRepository repository;

    public void create(Feedback f) {
        System.out.println("Service: create");
        System.out.println("description:" + f.getDescription() + "date" + f.getUploadDate());
        f.setUploadDate(new Timestamp(System.currentTimeMillis()));
        repository.saveAndFlush(f);
    }
}
