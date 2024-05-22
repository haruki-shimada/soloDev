package com.example.demo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.demo.Model.Feedback;
import com.example.demo.Model.Recipe;
import com.example.demo.data.FeedbackService;
import com.example.demo.data.RecipeInterface;
import com.example.demo.data.RecipeService;

@Controller
public class RecipeController {
    @Autowired
    private RecipeService recipeService;

    @Autowired
    private FeedbackService feedbackService;

    // 料理一覧が見えるページを表示
    @GetMapping("/recipe")
    @CrossOrigin
    @ResponseBody
    public List<? extends RecipeInterface> showAll() {
        System.out.println("get /recipe");
        return recipeService.findAll();
    }

    // レシピの詳細ページを表示
    @GetMapping("/recipe/{id}")
    @CrossOrigin
    @ResponseBody
    public RecipeInterface showRecipe(@PathVariable("id") int id) {
        System.out.println("***************************************");
        System.out.println("showRecipe");
        return recipeService.findById(id);
    }

    // レシピを名前であいまいな検索ができるようにする
    @GetMapping("/recipe/search")
    @CrossOrigin
    @ResponseBody
    public List<? extends RecipeInterface> searchRecipes(@RequestParam(name = "searchWord") String name) {
        System.out.println("search recipes");
        return recipeService.searchRecipes(name);
    }

    // レシピの感想などを投稿する
    @PostMapping("/recipe/{id}/feedback")
    @CrossOrigin
    public ResponseEntity<String> postFeeling(@PathVariable("id") int id, @RequestBody Feedback memo) {
        System.out.println("\n\n\n\n\n\n\n\n\n\n\n");
        RecipeInterface recipeInterface = recipeService.findById(id);
        if (recipeInterface instanceof Recipe) {
            Recipe recipe = (Recipe) recipeInterface;
            memo.setCookingId(recipe);
            System.out.println(memo.getCookingId() + memo.getDescription());
            feedbackService.create(memo);
            return ResponseEntity.ok("");
        } else {
            return ResponseEntity.badRequest().body("null");
        }

        // System.out.println(
        // "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");
        // System.out.println(memo.getDescription());
        // System.out.println(memo.getCookingId());
    }

    // 新しいレシピを投稿して、その詳細ページまたは料理一覧を表示
    @PostMapping("/recipe/create")
    @CrossOrigin
    public void postRecipe(@RequestBody Recipe recipe) {
        System.out.println("/recipe/create");
        System.out.println(recipe.getName());
        recipeService.createRecipe(recipe);
        System.out.println("追加完了");
        return;
    }

    // 既存のレシピを編集する
    @PostMapping("/recipe/{id}/edit")
    @CrossOrigin
    public String editRecipe(Recipe recipe, @PathVariable int id) {
        recipe.setId(id);
        recipeService.createRecipe(recipe);
        return "redirect:/recipe/" + id;
    }

    // 既存のレシピを削除
    @DeleteMapping("/recipe/{id}/delete")
    @CrossOrigin
    public ResponseEntity<String> deleteRecipe(@PathVariable("id") int id) {
        System.out.println("delete " + String.valueOf(id));
        recipeService.deleteRecipe(id);
        return ResponseEntity.ok("");
    }
}
