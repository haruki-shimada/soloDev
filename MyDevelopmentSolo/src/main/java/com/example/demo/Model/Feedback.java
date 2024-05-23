package com.example.demo.Model;

import java.sql.Timestamp;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "feedback")
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(updatable = true)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy/MM/dd HH:mm", timezone = "Asia/Tokyo")
    private Timestamp uploadDate;

    @Column(nullable = false)
    private String description;

    @ManyToOne()
    @JoinColumn(name = "cookingId", nullable = false)
    @JsonBackReference
    private Recipe cookingId;

    public Feedback() {

    }

    public Feedback(@JsonProperty("description") String discription, @JsonProperty("cookingId") Recipe cookingId) {
        this.description = discription;
        this.cookingId = cookingId;
    }

    public int getId() {
        return id;
    }

    public Timestamp getUploadDate() {
        return uploadDate;
    }

    public String getDescription() {
        return new String(description);
    }

    public Recipe getCookingId() {
        return cookingId;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setUploadDate(Timestamp uploadDate) {
        this.uploadDate = uploadDate;
    }

    public void setDescription(String discription) {
        this.description = discription;
    }

    public void setCookingId(Recipe cookingId) {
        this.cookingId = cookingId;
    }

}
