package com.example.demo.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.Model.Recipe;
import com.example.demo.data.RecipeInterface;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Integer> {
    public RecipeInterface findById(int id);

    public List<? extends RecipeInterface> findByNameContainingIgnoreCase(String name);
}
