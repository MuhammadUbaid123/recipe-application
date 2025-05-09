import { useState, type FormEvent } from "react"
import "./App.css"
import * as api from "./api"
import type { Recipe } from "./types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import RecipeCard from "@/components/recipe-card";
const App = () => {

  const [searchTerm, setSearchTerm] = useState<string>("");

  const [recipes, setRecipes] = useState<Recipe[]>([]);


  const handleSearchSubmit = async (event: FormEvent) => {
    try {
      event.preventDefault();
      const recipes = await api.searchRecipes(searchTerm, 1);
      setRecipes(recipes.results);
    } catch (error) {
      console.error(error);
    }
  }



  return (
    <div>
      <form onSubmit={(event) => handleSearchSubmit(event)}>
        <Input
          type="text"
          value={searchTerm}
          className="p-2"
          onChange={(event) => setSearchTerm(event.target.value)}
          required
          placeholder="Search for recipes ..."
        />
        <Button variant={"destructive"} type="submit">Search</Button>
      </form>
      <RecipeCard />
      {
        recipes.map((recipe) => (
          <div key={recipe.id}>
            recipe image location: {recipe.image}
            Recipe title: {recipe.title}

          </div>
        ))
      }
    </div>
  )
}

export default App
