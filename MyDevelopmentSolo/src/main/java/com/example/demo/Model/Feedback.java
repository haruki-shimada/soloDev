package com.example.demo.Model;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column
    private Date uploadDate;

    @Column(nullable = false)
    private String discription;

    @Column(nullable = false)
    private int cookingId;

    public Feedback(String discription, int cookingId) {
        this.discription = discription;
        this.cookingId = cookingId;
    }

    public int getId() {
        return id;
    }

    public Date getUploadDate() {
        return uploadDate;
    }

    public String getDiscription() {
        return new String(discription);
    }

    public int getCookingId() {
        return cookingId;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setUploadDate(Date uploadDate) {
        this.uploadDate = uploadDate;
    }

    public void setDiscription(String discription) {
        this.discription = discription;
    }

    public void setCookingId(int cookingId) {
        this.cookingId = cookingId;
    }

}
