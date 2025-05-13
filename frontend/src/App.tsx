import { useEffect, useRef, useState, type FormEvent } from "react"
import "./App.css"
import * as api from "./api"
import type { Recipe } from "./types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import RecipeCard from "@/components/recipe-card";
import { RefreshCcw } from "lucide-react";
const App = () => {

	const [searchTerm, setSearchTerm] = useState<string>("");
	const [recipes, setRecipes] = useState<Recipe[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const pageNumber = useRef(1);


	const handleSearchSubmit = async (event: FormEvent) => {
		try {
			event.preventDefault();
			const recipes = await api.searchRecipes(searchTerm, 1);
			setRecipes(recipes.results);
			pageNumber.current = 1;
		} catch (error) {
			console.error(error);
		}
	}

	const handleViewMoreClick = async () => {
		try {
			setIsLoading(true);
			const newxtpage = pageNumber.current + 1;
			const newRecipes = await api.searchRecipes(searchTerm, newxtpage);
			setRecipes([...recipes, ...newRecipes.results]);
			pageNumber.current = newxtpage;
			setIsLoading(false);
		} catch (error) {
			console.error(error);
			setIsLoading(false);
		}
	}


	return (
		<div className="flex flex-col gap-4 py-4">
			<form onSubmit={(event) => handleSearchSubmit(event)}>
				<div className="flex gap-2 px-4">
					<Input
						type="text"
						value={searchTerm}
						className="p-2"
						onChange={(event) => setSearchTerm(event.target.value)}
						required
						placeholder="Search for recipes ..."
					/>
					<Button variant={"destructive"} type="submit">Search</Button>
				</div>
			</form>
			<div className="flex flex-wrap items-center justify-center">
				{
					recipes.map((recipe) => (
						<div key={recipe.id} className="p-2">
							<RecipeCard recipe={recipe} />
						</div>
					))
				}
			</div>
			<div className="flex items-center justify-center">
				<Button onClick={handleViewMoreClick}> <RefreshCcw className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`} /> Load more</Button>
			</div>
		</div>
	)
}

export default App
