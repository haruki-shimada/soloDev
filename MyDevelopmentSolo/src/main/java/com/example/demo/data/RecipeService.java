package com.example.demo.data;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Model.Recipe;
import com.example.demo.Repositories.RecipeRepository;

@Service
public class RecipeService {
    @Autowired
    private RecipeRepository repository;

    public List<? extends RecipeInterface> findAll() {
        return repository.findAll();
    }

    public Recipe findById(int id) {
        return repository.getReferenceById(id);
    }

    public void createRecipe(Recipe recipe) {
        repository.saveAndFlush(recipe);
    }

    public void deleteRecipe(int id) {
        repository.deleteById(id);
    }
}
