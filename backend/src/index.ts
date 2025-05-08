import express from "express";
import cors from "cors";

import * as RecipeAPI from "./recipe-api";


const app = express();


app.use(express.json());
app.use(cors());


app.get("/api/recipes/search", async (req, res) => {

    let searchTerm = req.query.searchTerm as string;
    let page = parseInt(req.query.page as string);

    const result = RecipeAPI.searchRecipes(searchTerm, page);
    return res.json(result)
})


app.listen(3000, () => {
    console.log("Server is running on port 3000");
})
