package com.example.demo;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import com.example.demo.Model.Recipe;
import com.example.demo.data.RecipeInterface;
import com.example.demo.data.RecipeService;

@Controller
public class RecipeController {
    @Autowired
    private RecipeService recipeService;

    // トップページを表示
    @GetMapping("/")
    @CrossOrigin
    public String index() {
        System.out.println("get /");
        return "/index";
    }

    // 料理一覧が見えるページを表示
    @GetMapping("/recipe")
    @CrossOrigin
    public List<? extends RecipeInterface> showAll() {
        System.out.println("get /recipe");
        return recipeService.findAll();
    }

    // レシピの詳細ページを表示
    @GetMapping("/recipe/{id}")
    @CrossOrigin
    public Recipe showRecipe(@PathVariable int id) {
        return recipeService.findById(id);
    }

    // レシピの感想などを投稿する
    @PostMapping("/recipe/{id}")
    @CrossOrigin
    public String postFeeling(@PathVariable int id, String feeling, Date date) {
        return "/recipe/" + id;
    }

    // 新しいレシピを投稿して、その詳細ページまたは料理一覧を表示
    @PostMapping("/recipe")
    @CrossOrigin
    public String postRecipe(Recipe recipe) {
        recipeService.createRecipe(recipe);
        return "/recipe";
    }

    // 既存のレシピを編集する
    @PostMapping("/recipe/{id}/edit")
    @CrossOrigin
    public String editRecipe(Recipe recipe, @PathVariable int id) {
        recipe.setId(id);
        recipeService.createRecipe(recipe);
        return "/recipe/" + id;
    }

    // 既存のレシピを削除
    @PostMapping("/recipe/{id}/delete")
    @CrossOrigin
    public String deleteRecipe(@PathVariable int id) {
        recipeService.deleteRecipe(id);
        return "/recipe";
    }
}
