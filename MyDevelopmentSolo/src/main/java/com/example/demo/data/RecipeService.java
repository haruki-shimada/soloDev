package com.example.demo.data;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Model.Recipe;
import com.example.demo.Repositories.RecipeRepository;

import jakarta.transaction.Transactional;

@Service
public class RecipeService {
    @Autowired
    private RecipeRepository repository;

    public List<? extends RecipeInterface> findAll() {
        return repository.findAll();
    }

    public RecipeInterface findById(int id) {
        System.out.println("service: " + String.valueOf(id));
        return repository.findById(id);
    }

    @Transactional
    public void createRecipe(Recipe recipe) {
        repository.saveAndFlush(recipe);
    }

    @Transactional
    public void deleteRecipe(int id) {
        repository.deleteById(id);
    }
}
