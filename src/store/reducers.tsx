import { combineReducers } from 'redux';
import cartReducer from './cartReducer';
import { AuthState, AuthAction } from '../types';
import { SET_USERNAME, SET_PASSWORD, LOGIN_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE, SET_USERNAME_SIGNUP, SET_PASSWORD_SIGNUP, SET_ISFROMPAYMENT, ADMIN_ADD_PRODUCT, ADMIN_ADD_PRODUCT_SUCCESS, ADMIN_ADD_PRODUCT_FAILURE, FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_FAILURE, DELETE_PRODUCT, DELETE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAILURE, UPDATE_PRODUCT, UPDATE_PRODUCT_SUCCESS, UPDATE_PRODUCT_FAILURE, ADD_ITEM_TOWARDS_CART, UPDATE_QUANTITY_ITEM_CART, DELETE_ITEM_CART, ADD_ITEM_TOWARDS_CART_SUCCESS, ADD_ITEM_TOWARDS_CART_FAILURE, UPDATE_QUANTITY_ITEM_CART_SUCCESS, UPDATE_QUANTITY_ITEM_CART_FAILURE, SET_CART_PRICE, FETCH_ITEMS_CART_SUCCESS, FETCH_ITEMS_CART_FAILURE } from '../actions';

const initialState: AuthState = {
    username: '',
    password: '',
    usernameSignup: '',
    passwordSignup: '',
    isLoggedIn: false,
    isSignup: false,
    error: null,
    errorAddProduct: null,
    errorSignup: null,
    errorUpdate: null,
    errorDelete: null,
    errorFetch: null,
    errorAddItemCart: null,
    errorUpdateQuantityCart: null,
    isFromPayment: null,
    inventory: [],
    cart: [],
    cartPrice: 0,
};

const authReducer = (state = initialState, action: AuthAction): AuthState => {
    switch (action.type) {
        case SET_USERNAME:
            return {
                ...state,
                username: action.payload.username,
            };
        case SET_PASSWORD:
            return {
                ...state,
                password: action.payload.password,
            };
        case SET_USERNAME_SIGNUP:
            return {
                ...state,
                usernameSignup: action.payload.usernameSignup,
            };
        case SET_PASSWORD_SIGNUP:
            return {
                ...state,
                passwordSignup: action.payload.passwordSignup,
            };
        case LOGIN_REQUEST:
            // Logique de traitement pour l'action LOGIN_REQUEST
            // Par exemple, j'effectue l'appel à l'API pour l'authentification, mais dans le cas de redux-saga, j'utilise les sagas pour gérer les call API

            // Je retourne le nouvel état avec les modifications appropriées
            return {
                ...state,
                isLoggedIn: false,
                error: null,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                error: null,
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                isLoggedIn: false,
                error: action.payload.error,
            };
        case SIGNUP_REQUEST:
            return {
                ...state,
                isSignup: false,
                errorSignup: null,
            };
        case SIGNUP_SUCCESS:
            return {
                ...state,
                isSignup: true,
                errorSignup: null,

            };
        case SIGNUP_FAILURE:
            return {
                ...state,
                isSignup: false,
                errorSignup: action.payload.errorSignup,
            };
        case SET_ISFROMPAYMENT:
            return {
                ...state,
                isFromPayment: true,
            };
        case ADMIN_ADD_PRODUCT:
            return {
                ...state,
                inventory: [...state.inventory, {
                    documentId: action.payload.documentId,
                    title: action.payload.title,
                    price: action.payload.price,
                    img: action.payload.img,
                    stock: action.payload.stock,
                }],
            };
        case ADMIN_ADD_PRODUCT_SUCCESS:
            return {
                ...state,
                errorAddProduct: null,
            };

        case ADMIN_ADD_PRODUCT_FAILURE:
            return {
                ...state,
                errorAddProduct: action.payload.error,
            };
        case FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                inventory: action.payload.products,
            };
        case FETCH_PRODUCTS_FAILURE:
            return {
                ...state,
                inventory: [],
                errorAddProduct: action.payload.error,
            };

        case UPDATE_PRODUCT:
            const updatedInventory = state.inventory.map((item) => {
                if (item.documentId === action.payload.documentId) {
                    return {
                        ...item,
                        ...action.payload.updatedData,
                    };
                }
                return item;
            });

            return {
                ...state,
                inventory: updatedInventory,
            };
        case UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                errorUpdate: null,
            };
        case UPDATE_PRODUCT_FAILURE:
            return {
                ...state,
                errorUpdate: action.payload.errorUpdate,
            };



        case DELETE_PRODUCT:
            const inventoryAfterDeleteProduct = state.inventory.filter(
                (item) => item.documentId !== action.payload.documentId
            );
            return {
                ...state,
                inventory: inventoryAfterDeleteProduct,
            };
        case DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                errorDelete: null,
            };
        case DELETE_PRODUCT_FAILURE:
            return {
                ...state,
                errorDelete: action.payload.errorDelete,
            };

        //Afficher les items du panier

        case FETCH_ITEMS_CART_SUCCESS:
            return {
                ...state,
                cart: action.payload.items,
                errorFetch: null,
            };
        case FETCH_ITEMS_CART_FAILURE:
            return {
                ...state,
                cart: [],
                errorFetch: action.payload.error,
            };


        // Ajout d'un item dans le panier

        case ADD_ITEM_TOWARDS_CART:
            const { itemCart } = action.payload;
            const existingItemIndex = state.cart.findIndex(item => item.documentId === itemCart.documentId);

            if (existingItemIndex !== -1) {
                const existingItem = state.cart[existingItemIndex];
                const updatedItem = {
                    ...existingItem,
                    quantity: existingItem.quantity + itemCart.quantity
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
                    cart: [...state.cart, itemCart]
                };
            }

        case ADD_ITEM_TOWARDS_CART_SUCCESS:
            return {
                ...state,
                errorAddItemCart: null,
            };
        case ADD_ITEM_TOWARDS_CART_FAILURE:
            return {
                ...state,
                errorAddItemCart: action.payload.error,
            };

        case UPDATE_QUANTITY_ITEM_CART:
            const { quantityUpdate } = action.payload;


            const indexItemUpdate = state.cart.findIndex((obj) => obj.documentId === quantityUpdate.documentId);

            const newArr = [...state.cart];
            newArr.splice(indexItemUpdate, 1, quantityUpdate)

            return {
                ...state,
                cart: newArr,
            }

        case UPDATE_QUANTITY_ITEM_CART_SUCCESS:

            return {
                ...state,
                errorUpdateQuantityCart: null,
            }

        case UPDATE_QUANTITY_ITEM_CART_FAILURE:


            return {
                ...state,
                errorUpdateQuantityCart: action.payload.error,
            }

        case SET_CART_PRICE:

            return {
                ...state,
                cartPrice: action.payload.cartPrice,
            };

        case DELETE_ITEM_CART:
            const cartFilter = state.cart.filter(element => element.documentId !== action.payload.documentId);

            return {
                ...state,
                cart: cartFilter,
            };

        default:
            return state;
    }
};


const rootReducer = combineReducers({
    auth: authReducer,
    itemsReducer: cartReducer,
});

export default rootReducer;
