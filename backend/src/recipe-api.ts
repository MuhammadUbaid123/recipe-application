const apiKey = process.env.API_KEY;


/*
* Fetch the recipes from the Spoonacular API
*/
export const searchRecipes = async (searchTerm: string, page: number) => {
    try {
        if(!apiKey){
            throw new Error("No API key found");
        }
        
        
        const url = new URL("https://api.spoonacular.com/recipes/complexSearch");

        let number = 10;

        const queryParams = {
            apiKey, 
            query: searchTerm,
            number: number.toString(),
            offset: (page * number).toString(),

        };

        url.search = new URLSearchParams(queryParams).toString();

        const searchResponse = await fetch(url);

        return searchResponse.json();

    } catch (error) {
        console.error(error);
        throw new Error('There is some internal error!')
    }
    
}