import { Recipe } from '@/types';
import * as api from '../api';
import { Card, CardContent } from './ui/card';
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { RefreshCcw } from 'lucide-react';

interface Props {
    recipe: Recipe
}

const RecipeCard = ({ recipe }: Props) => {

    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const showRecipeSummary = async () => {
        try {
            setIsLoading(true);
            const summary = await api.getRecipeSummary(recipe.id);
            if (summary) await setSelectedRecipe(summary);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div className='recipe-card'>

            <Dialog>

                <DialogTrigger>
                    <Card className='h-[17rem] w-[17rem] transition-all hover:shadow-indigo-500 hover:shadow-2xl cursor-pointer' onClick={showRecipeSummary}>
                        <CardContent>
                            <img src={recipe.image} alt={recipe.title} className='h-[inherit] rounded-2xl hover:transform hover:scale-105 transition-all hover:rotate-3 hover:overflow-hidden' />
                            <h5 className='text-md mt-3 '>{recipe.title}</h5>
                        </CardContent>
                    </Card>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{selectedRecipe?.title}</DialogTitle>
                        <DialogDescription>
                            {
                                isLoading ? (
                                    <RefreshCcw className='animate-spin mx-auto' size={20} />
                                ) : <span dangerouslySetInnerHTML={{ __html: selectedRecipe?.summary || (<></>) }}></span>
                            }
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default RecipeCard
