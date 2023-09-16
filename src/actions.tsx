// actions.tsx
import { SetUsernameAction, SetPasswordAction, LoginRequestAction, LoginSuccessAction, LoginFailureAction, TotalPriceAction, SetUsernameSignupAction, SetPasswordSignupAction, SignupRequestAction, SignupSuccessAction, SignupFailureAction, SetIsFromPayment, adminAddProductAction, AdminAddProductSuccessAction, adminAddProductFailureAction, FetchProductsSuccessAction, FetchProductsFailureAction, Product, FetchProductsAction, UpdateProductAction, UpdateProductSuccessAction, UpdateProductFailureAction, DeleteProductAction, DeleteProductSuccessAction, DeleteProductFailureAction, AddItemTowardsCartAction, UpdateQuantityItemCartAction, DeleteItemCartAction, ProductCart, AddItemTowardsCartSuccessAction, AddItemTowardsCartFailureAction, FetchItemsCartAction, FetchItemsCartSuccessAction, FetchItemsCartFailureAction, UpdateQuantityItemCartSuccessAction, UpdateQuantityItemCartFailureAction, DeleteItemCartSuccessAction, DeleteItemCartFailureAction } from './types'

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const SET_USERNAME = 'SET_USERNAME';
export const SET_PASSWORD = 'SET_PASSWORD';
export const ADDITEM = 'ADDITEM';
export const UPDATEITEM = 'UPDATEITEM';
export const SET_CART_PRICE = 'SET_CART_PRICE';
export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';
export const SET_USERNAME_SIGNUP = 'SET_USERNAME_SIGNUP';
export const SET_PASSWORD_SIGNUP = 'SET_PASSWORD_SIGNUP';
export const SET_ISFROMPAYMENT = 'SET_ISFROMPAYMENT';
export const ADMIN_ADD_PRODUCT = 'ADMIN_ADD_PRODUCT';
export const ADMIN_ADD_PRODUCT_SUCCESS = 'ADMIN_ADD_PRODUCT_SUCCESS';
export const ADMIN_ADD_PRODUCT_FAILURE = 'ADMIN_ADD_PRODUCT_FAILURE';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';
export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const UPDATE_PRODUCT_SUCCESS = 'UPDATE_PRODUCT_SUCCESS';
export const UPDATE_PRODUCT_FAILURE = 'UPDATE_PRODUCT_FAILURE';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS';
export const DELETE_PRODUCT_FAILURE = 'DELETE_PRODUCT_FAILURE';
export const ADD_ITEM_TOWARDS_CART = 'ADD_ITEM_TOWARDS_CART';
export const ADD_ITEM_TOWARDS_CART_SUCCESS = 'ADD_ITEM_TOWARDS_CART_SUCCESS';
export const ADD_ITEM_TOWARDS_CART_FAILURE = 'ADD_ITEM_TOWARDS_CART_FAILURE';
export const UPDATE_QUANTITY_ITEM_CART = 'UPDATE_QUANTITY_ITEM_CART';
export const UPDATE_QUANTITY_ITEM_CART_SUCCESS = 'UPDATE_QUANTITY_ITEM_CART_SUCCESS';
export const UPDATE_QUANTITY_ITEM_CART_FAILURE = 'UPDATE_QUANTITY_ITEM_CART_FAILURE';
export const DELETE_ITEM_CART = 'DELETE_ITEM_CART';
export const DELETE_ITEM_CART_SUCCESS = 'DELETE_ITEM_CART_SUCCESS';
export const DELETE_ITEM_CART_FAILURE = 'DELETE_ITEM_CART_FAILURE';
export const FETCH_ITEMS_CART = 'FETCH_ITEMS_CART';
export const FETCH_ITEMS_CART_SUCCESS = 'FETCH_ITEMS_CART_SUCCESS';
export const FETCH_ITEMS_CART_FAILURE = 'FETCH_ITEMS_CART_FAILURE';



// Ajout produit dans l'administration

export const adminAddProduct = (
    documentId: string,
    title: string,
    price: number,
    img: string,
    stock: number
): adminAddProductAction => ({
    type: ADMIN_ADD_PRODUCT,
    payload: { documentId, title, price, img, stock },
});

export const adminAddProductSuccess = (): AdminAddProductSuccessAction => {
    return {
        type: ADMIN_ADD_PRODUCT_SUCCESS,
        payload: {

        },
    };
};

export const adminAddProductFailure = (error: string): adminAddProductFailureAction => ({
    type: ADMIN_ADD_PRODUCT_FAILURE,
    payload: { error },
});



// Modifier les champs d'un produit dans l'administration

export const updateProduct = (documentId: string, updatedData: Product): UpdateProductAction => ({
    type: UPDATE_PRODUCT,
    payload: { documentId, updatedData },
});

export const updateProductSuccess = (): UpdateProductSuccessAction => ({
    type: UPDATE_PRODUCT_SUCCESS,
});

export const updateProductFailure = (errorUpdate: string): UpdateProductFailureAction => ({
    type: UPDATE_PRODUCT_FAILURE,
    payload: { errorUpdate },
});



// Supprimer un produit dans l'administration

export const deleteProduct = (documentId: string): DeleteProductAction => ({
    type: DELETE_PRODUCT,
    payload: { documentId },
});

export const deleteProductSuccess = (): DeleteProductSuccessAction => ({
    type: DELETE_PRODUCT_SUCCESS,
});

export const deleteProductFailure = (errorDelete: string): DeleteProductFailureAction => ({
    type: DELETE_PRODUCT_FAILURE,
    payload: { errorDelete },
});



//Charger l'inventaire produits dans une page

export const fetchProducts = (): FetchProductsAction => ({
    type: FETCH_PRODUCTS,
});

export const fetchProductsSuccess = (products: Product[]): FetchProductsSuccessAction => ({
    type: FETCH_PRODUCTS_SUCCESS,
    payload: { products },
});

export const fetchProductsFailure = (error: string): FetchProductsFailureAction => ({
    type: FETCH_PRODUCTS_FAILURE,
    payload: { error },
});



// S'inscrire sur le site

export const signupRequest = (usernameSignup: string, passwordSignup: string): SignupRequestAction => ({
    type: SIGNUP_REQUEST,
    payload: { usernameSignup, passwordSignup },
});

export const signupSuccess = (): SignupSuccessAction => ({
    type: SIGNUP_SUCCESS,
    payload: {

    },
});

export const signupFailure = (errorSignup: string): SignupFailureAction => ({
    type: SIGNUP_FAILURE,
    payload: { errorSignup },
});


// Récupérer les noms d'utilisateurs et mot de passe lors de l'inscription

export const setUsernameSignUp = (usernameSignup: string): SetUsernameSignupAction => {
    return {
        type: SET_USERNAME_SIGNUP,
        payload: { usernameSignup },
    };
};

export const setPasswordSignUp = (passwordSignup: string): SetPasswordSignupAction => {
    return {
        type: SET_PASSWORD_SIGNUP,
        payload: { passwordSignup },
    };
};


// Récupérer les noms d'utilisateurs et mot de passe lors de la connextion

export const setUsername = (username: string): SetUsernameAction => {
    return {
        type: SET_USERNAME,
        payload: { username },
    };
};

export const setPassword = (password: string): SetPasswordAction => {
    return {
        type: SET_PASSWORD,
        payload: { password },
    };
};


// Connexion au site

export const loginRequest = (username: string, password: string): LoginRequestAction => ({
    type: LOGIN_REQUEST,
    payload: { username, password },
});

export const loginSuccess = (): LoginSuccessAction => ({
    type: LOGIN_SUCCESS,
    payload: {

    }
});

export const loginFailure = (error: string): LoginFailureAction => ({
    type: LOGIN_FAILURE,
    payload: { error },
});


// LE PANIER


// Afficher les produits du panier

export const fetchItemsCart = (): FetchItemsCartAction => ({
    type: FETCH_ITEMS_CART,
});

export const fetchItemsCartSuccess = (items: ProductCart[]): FetchItemsCartSuccessAction => ({
    type: FETCH_ITEMS_CART_SUCCESS,
    payload: { items },
});
export const fetchItemsCartFailure = (error: string): FetchItemsCartFailureAction => ({
    type: FETCH_ITEMS_CART_FAILURE,
    payload: { error },
});

// Ajout d'un produit au PANIER

export const addItemTowardsCart = (itemCart: ProductCart): AddItemTowardsCartAction => ({
    type: ADD_ITEM_TOWARDS_CART,
    payload: { itemCart },
});

export const addItemTowardsCartSuccess = (): AddItemTowardsCartSuccessAction => ({
    type: ADD_ITEM_TOWARDS_CART_SUCCESS,
    payload: {

    },
});

export const addItemTowardsCartFailure = (error: string): AddItemTowardsCartFailureAction => ({
    type: ADD_ITEM_TOWARDS_CART_FAILURE,
    payload: {
        error
    },
});




// update de la quantité d'un produit dans le PANIER

export const updateQuantityItemCart = (quantityUpdate: ProductCart): UpdateQuantityItemCartAction => ({
    type: UPDATE_QUANTITY_ITEM_CART,
    payload: { quantityUpdate },
});

export const updateQuantityItemCartSuccess = (): UpdateQuantityItemCartSuccessAction => ({
    type: UPDATE_QUANTITY_ITEM_CART_SUCCESS,
    payload: {},
});

export const updateQuantityItemCartFailure = (error: string): UpdateQuantityItemCartFailureAction => ({
    type: UPDATE_QUANTITY_ITEM_CART_FAILURE,
    payload: { error },
});


// Supprimer un produit du PANIER

export const deleteItemCart = (documentId: string): DeleteItemCartAction => ({
    type: DELETE_ITEM_CART,
    payload: { documentId },
});

export const deleteItemCartSuccess = (): DeleteItemCartSuccessAction => ({
    type: DELETE_ITEM_CART_SUCCESS,
    payload: {}
});

export const deleteItemCartFailure = (error: string): DeleteItemCartFailureAction => ({
    type: DELETE_ITEM_CART_FAILURE,
    payload: { error },
});


export const setCartPrice = (cartPrice: number): TotalPriceAction => ({
    type: SET_CART_PRICE,
    payload: { cartPrice },
});

export const setIsFromPayment = (): SetIsFromPayment => {
    return {
        type: SET_ISFROMPAYMENT,
        payload: {},
    };
};