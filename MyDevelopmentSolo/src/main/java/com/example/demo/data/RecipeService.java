package com.example.demo.data;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Model.Amount;
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
        System.out.println(
                "Service:レシピ追加***************************************************************************************************************************************************************************************************************************");
        System.out.println(recipe.toString());
        for (Amount amount : recipe.getAmounts()) {
            System.out.println(amount.toString());
        }
        repository.saveAndFlush(recipe);
        System.out.println("Service:レシピ追加完了**************************************************s");
        for (Amount amount : recipe.getAmounts()) {
            System.out.println(amount.toString());
        }
        return;
    }

    @Transactional
    public void deleteRecipe(int id) {
        System.out.println("service: delete前");
        repository.deleteById(id);
        System.out.println("service: delete後");
    }

    public List<? extends RecipeInterface> searchRecipes(String name) {
        return repository.findByNameContainingIgnoreCase(name);
    }
}
