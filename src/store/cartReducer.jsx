

const INITIAL_STATE = {
    cart: [],
    cartPrice: 0,
};

export default function cartReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case "ADDITEM":
            const itemToAdd = action.payload;
            const existingItemIndex = state.cart.findIndex(item => item.id === itemToAdd.id);

            if (existingItemIndex !== -1) {
                const existingItem = state.cart[existingItemIndex];
                const updatedItem = {
                    ...existingItem,
                    quantity: existingItem.quantity + itemToAdd.quantity
                };

                const updatedCart = [...state.cart];
                updatedCart[existingItemIndex] = updatedItem;


                return {
                    ...state,
                    cart: updatedCart
                };
            } else {
                return {
                    ...state,
                    cart: [...state.cart, itemToAdd]
                };
            }




        case "UPDATEITEM":

            const indexItemUpdate = state.cart.findIndex((obj) => obj.id === action.payload.id);

            const newArr = [...state.cart];
            newArr.splice(indexItemUpdate, 1, action.payload)

            return {
                ...state,
                cart: newArr,
            }
        case "SET_CART_PRICE":

            return {
                ...state,
                cartPrice: action.payload,
            };

        case "REMOVEITEM":
            const cartFilter = state.cart.filter(element => element.id !== action.payload);

            return {
                ...state,
                cart: cartFilter,
            };
        default:
            console.log(`Sorry, we are out of the loop.`);
    }
    return state
}