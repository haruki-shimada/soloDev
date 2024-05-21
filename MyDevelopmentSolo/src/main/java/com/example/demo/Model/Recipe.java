package com.example.demo.Model;

import com.example.demo.data.RecipeInterface;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "recipe")
public class Recipe implements RecipeInterface {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String process;

    @Column
    private int minute;

    @Override
    public int getMinute() {
        return minute;
    }

    @Override
    public void setMinute(int minute) {
        this.minute = minute;
    }

    @Override
    public int getId() {
        return this.id;
    }

    @Override
    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String getName() {
        return new String(this.name);
    }

    @Override
    public void setProcess(String process) {
        this.process = process;
    }

    @Override
    public String getProcess() {
        return new String(process);
    }

    @Override
    public void setId(int id) {
        this.id = id;
    }

}
