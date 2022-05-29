const { setCategoriesToStore } = require("../store/action/shoppingAction")

export const loadShoppingCategories = async()=>{
    const SHOPPING_CATEGORIES = [
        {
            key:"computers",
            value:"Computers & Accessories",
        },
        {
            key:"cellphones",
            value:"Cell Phones",
        },
        {
            key:"headphones",
            value:"Headphones",
        }
    ];
    setCategoriesToStore(SHOPPING_CATEGORIES);
}