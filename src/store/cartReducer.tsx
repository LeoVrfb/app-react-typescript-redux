
interface Item {
    id: number;
    quantity: number;
}

interface State {
    cart: Item[];
    cartPrice: number,
}

interface Action {
    type: string;
    payload: Item;
}

const INITIAL_STATE: State = {
    cart: [],
    cartPrice: 0,
};

export default function cartReducer(state = INITIAL_STATE, action: Action) {
    switch (action.type) {
        case "ADDITEM":

            const indexItemAdd = state.cart.findIndex(obj => obj.id === action.payload.id)

            if (indexItemAdd !== -1) {

                const updateQuantity = {
                    ...state.cart[indexItemAdd],
                    quantity: state.cart[indexItemAdd].quantity + action.payload.quantity
                }
                const newArr = [...state.cart]
                newArr.splice(indexItemAdd, 1, updateQuantity)

                return {
                    ...state,
                    cart: newArr
                }

            } else {
                const newArr = [...state.cart]
                newArr.push(action.payload)
                return {
                    ...state,
                    cart: newArr
                }
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
            const cartFilter = state.cart.filter(element => element.id === action.payload.id)

            return {
                ...state,
                cart: cartFilter,
            }
        default:
            console.log(`Sorry, we are out of the loop.`);
    }
    return state
}