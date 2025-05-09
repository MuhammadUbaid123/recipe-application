import express from "express";
import cors from "cors";
import {Request, Response} from "express";
import * as RecipeAPI from "./recipe-api";



const app = express();


app.use(express.json());
app.use(cors());


app.get("/api/recipes/search", async (req, res): Promise<any> => {

    try {
        
        let searchTerm = req.query.searchTerm as string;
        let page = parseInt(req.query.page as string);
    
        const result = await RecipeAPI.searchRecipes(searchTerm, page);
        return res.json(result)
    } catch (error) {
        throw new Error("Some internal error!");
    }
})


app.listen(3000, () => {
    console.log("Server is running on port 3000");
})
