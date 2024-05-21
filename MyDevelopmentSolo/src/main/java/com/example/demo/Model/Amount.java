package com.example.demo.Model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table
public class Amount {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String amount;

    @ManyToOne()
    @JoinColumn(name = "cookingId", nullable = false)
    private Recipe cookingId;

    public Amount(String name, String amount, Recipe cookingId) {
        this.name = name;
        this.amount = amount;
        this.cookingId = cookingId;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getAmount() {
        return amount;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setAmount(String amount) {
        this.amount = amount;
    }

    public Recipe getCookingId() {
        return cookingId;
    }

    public void setCookingId(Recipe cookingId) {
        this.cookingId = cookingId;
    }
}
