import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    isLoading: false,
    categories:[
        
    ],
    favorites:[
        
    ],
    error: null,
}
const slice = createSlice({
    name: 'shopping',
    initialState,
    reducers: {
        // START LOADING
        startLoading(state) {
            state.isLoading = true;
        },
        setCategories(state, action) {
            state.categories = action.payload
            
        },
        setFavorites(state, action) {
            state.favorites = action.payload;
        },
        // HAS ERROR
        hasError(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },

    }
});
export default slice.reducer;
export const { setFavorites, setCategories } = slice.actions;
