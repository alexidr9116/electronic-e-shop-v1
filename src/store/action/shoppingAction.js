
import {setFavorites, setCategories } from "../slice/shopping";
import { dispatch } from "../store";
export const setCategoriesToStore = async(data)=>{
    dispatch(setCategories(data));
 
    return true;
}
export const setFavoritesToStore = async(data)=>{
    
    dispatch(setFavorites(data));
    return true;
}

 