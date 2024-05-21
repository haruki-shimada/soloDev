package com.example.demo.Model;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
@Table(name = "feedback")
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(updatable = false)
    private Date uploadDate;

    @Column(nullable = false)
    private String description;

    @ManyToOne()
    @JoinColumn(name = "cookingId", nullable = false)
    private Recipe cookingId;

    public Feedback(String discription, Recipe cookingId) {
        this.description = discription;
        this.cookingId = cookingId;
    }

    public int getId() {
        return id;
    }

    public Date getUploadDate() {
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

    public void setUploadDate(Date uploadDate) {
        this.uploadDate = uploadDate;
    }

    public void setDescription(String discription) {
        this.description = discription;
    }

    public void setCookingId(Recipe cookingId) {
        this.cookingId = cookingId;
    }

}
