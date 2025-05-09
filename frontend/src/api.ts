export const searchRecipes = async (searchTerm: string, page: number) => {
    try {
        const baseUrl = await new URL("http://localhost:3000/api/recipes/search");
        baseUrl.searchParams.append("searchTerm", searchTerm);
        baseUrl.searchParams.append("page", page?.toString()||"1");

        let response = await fetch(baseUrl);

        if(!response.ok){
            throw new Error(`Failed to fetch recipes! ${response.status} ${response.statusText}`);
        }


        return response.json()

    } catch (error) {
        throw new Error("Some client error! #api");
    }
}