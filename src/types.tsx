import {
    LOGIN_SUCCESS, LOGIN_FAILURE, SET_USERNAME, SET_PASSWORD, LOGIN_REQUEST, SET_CART_PRICE, SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE, SET_USERNAME_SIGNUP, SET_PASSWORD_SIGNUP, SET_ISFROMPAYMENT, ADMIN_ADD_PRODUCT, ADMIN_ADD_PRODUCT_SUCCESS, ADMIN_ADD_PRODUCT_FAILURE, FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_FAILURE, FETCH_PRODUCTS, UPDATE_PRODUCT, UPDATE_PRODUCT_SUCCESS, UPDATE_PRODUCT_FAILURE, DELETE_PRODUCT, DELETE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAILURE, ADD_ITEM_TOWARDS_CART, UPDATE_QUANTITY_ITEM_CART, DELETE_ITEM_CART, ADD_ITEM_TOWARDS_CART_SUCCESS, ADD_ITEM_TOWARDS_CART_FAILURE, FETCH_ITEMS_CART, FETCH_ITEMS_CART_SUCCESS, FETCH_ITEMS_CART_FAILURE, UPDATE_QUANTITY_ITEM_CART_SUCCESS, UPDATE_QUANTITY_ITEM_CART_FAILURE, DELETE_ITEM_CART_SUCCESS, DELETE_ITEM_CART_FAILURE
} from './actions';
import { Action } from 'redux';

export interface AuthState {
    username: string;
    password: string;
    isLoggedIn: boolean;
    isSignup: boolean;
    usernameSignup: string;
    passwordSignup: string;
    error: string | null;
    errorAddProduct: string | null;
    errorSignup: string | null;
    errorUpdate: string | null;
    errorDelete: string | null;
    errorFetch: string | null;
    errorAddItemCart: string | null;
    errorUpdateQuantityCart: string | null;
    isFromPayment: boolean | null;
    inventory: Product[];
    cart: ProductCart[];
    cartPrice: number,
}


// Ajouter un produit dans l'interface administration

export interface adminAddProductAction extends Action<typeof ADMIN_ADD_PRODUCT> {
    payload: {
        title: string;
        price: number;
        img: string;
        documentId: string;
        stock: number;
    };
}

export interface AdminAddProductSuccessAction extends Action<typeof ADMIN_ADD_PRODUCT_SUCCESS> {
    payload: {

    };
}


export interface adminAddProductFailureAction extends Action<typeof ADMIN_ADD_PRODUCT_FAILURE> {
    payload: {
        error: string;
    };
}


// récupérer les produits depuis firestore

export interface FetchProductsAction extends Action<typeof FETCH_PRODUCTS> { }


export interface Product {
    documentId: string;
    title: string;
    price: number;
    img: string;
    stock: number;
}

export interface ProductCart {
    documentId: string;
    title: string;
    price: number;
    img: string;
    stock: number;
    quantity: number;
}


// Afficher les items du PANIER


export interface FetchItemsCartAction extends Action<typeof FETCH_ITEMS_CART> { }

export interface FetchItemsCartSuccessAction extends Action<typeof FETCH_ITEMS_CART_SUCCESS> {
    payload: {
        items: ProductCart[];
    };
}
export interface FetchItemsCartFailureAction extends Action<typeof FETCH_ITEMS_CART_FAILURE> {
    payload: {
        error: string;
    };
}




// Ajout item au PANIER

export interface AddItemTowardsCartAction extends Action<typeof ADD_ITEM_TOWARDS_CART> {
    payload: {
        itemCart: ProductCart;
    };
}
export interface AddItemTowardsCartSuccessAction extends Action<typeof ADD_ITEM_TOWARDS_CART_SUCCESS> {
    payload: {

    };
}
export interface AddItemTowardsCartFailureAction extends Action<typeof ADD_ITEM_TOWARDS_CART_FAILURE> {
    payload: {
        error: string
    };
}


// Update quantité d'un item dans le PANIER

export interface UpdateQuantityItemCartAction extends Action<typeof UPDATE_QUANTITY_ITEM_CART> {
    payload: {
        quantityUpdate: ProductCart;
    };
}

export interface UpdateQuantityItemCartSuccessAction extends Action<typeof UPDATE_QUANTITY_ITEM_CART_SUCCESS> {
    payload: {

    };
}

export interface UpdateQuantityItemCartFailureAction extends Action<typeof UPDATE_QUANTITY_ITEM_CART_FAILURE> {
    payload: {
        error: string;
    };
}



// Delete un item du PANIER

export interface DeleteItemCartAction extends Action<typeof DELETE_ITEM_CART> {
    payload: {
        documentId: string;
    };
}
export interface DeleteItemCartSuccessAction extends Action<typeof DELETE_ITEM_CART_SUCCESS> {
    payload: {

    };
}
export interface DeleteItemCartFailureAction extends Action<typeof DELETE_ITEM_CART_FAILURE> {
    payload: {
        error: string;
    };
}


export interface RemoveItemCartAction extends Action<typeof UPDATE_QUANTITY_ITEM_CART> {
    payload: {
        documentId: string;
        quantityUpdate: Product;
    };
}






export interface FetchProductsSuccessAction {
    type: typeof FETCH_PRODUCTS_SUCCESS;
    payload: {
        products: Product[];
    };
}

export interface FetchProductsFailureAction {
    type: typeof FETCH_PRODUCTS_FAILURE;
    payload: {
        error: string;
    };
}


// modifier un produit dans l'interface administration

export interface UpdateProductAction extends Action {
    type: typeof UPDATE_PRODUCT;
    payload: { documentId: string; updatedData: Product };
}


export interface UpdateProductSuccessAction extends Action {
    type: typeof UPDATE_PRODUCT_SUCCESS;
}

export interface UpdateProductFailureAction extends Action {
    type: typeof UPDATE_PRODUCT_FAILURE;
    payload: { errorUpdate: string };
}


// supprimer un produit dans l'interface administration

export interface DeleteProductAction extends Action {
    type: typeof DELETE_PRODUCT;
    payload: { documentId: string };
}

export interface DeleteProductSuccessAction extends Action {
    type: typeof DELETE_PRODUCT_SUCCESS;
}

export interface DeleteProductFailureAction extends Action {
    type: typeof DELETE_PRODUCT_FAILURE;
    payload: { errorDelete: string };
}


// S'inscrire 

export interface SignupRequestAction extends Action<typeof SIGNUP_REQUEST> {
    payload: {
        usernameSignup: string;
        passwordSignup: string;
    };
}

export interface SignupSuccessAction extends Action<typeof SIGNUP_SUCCESS> {
    payload: {

    };
}


export interface SignupFailureAction extends Action<typeof SIGNUP_FAILURE> {
    payload: {
        errorSignup: string;
    };
}


export interface LoginRequestAction extends Action<typeof LOGIN_REQUEST> {
    payload: {
        username: string;
        password: string;
    };
}
export interface LoginSuccessAction extends Action<typeof LOGIN_SUCCESS> {
    payload: {

    };
}

export interface LoginFailureAction extends Action<typeof LOGIN_FAILURE> {
    payload: {
        error: string;
    };
}

export interface SetUsernameAction extends Action<typeof SET_USERNAME> {
    payload: {
        username: string;
    };
}

export interface SetPasswordAction extends Action<typeof SET_PASSWORD> {
    payload: {
        password: string;
    };
}

export interface SetUsernameSignupAction extends Action<typeof SET_USERNAME_SIGNUP> {
    payload: {
        usernameSignup: string;
    };
}

export interface SetPasswordSignupAction extends Action<typeof SET_PASSWORD_SIGNUP> {
    payload: {
        passwordSignup: string;
    };
}
export interface TotalPriceAction extends Action<typeof SET_CART_PRICE> {
    payload: {
        cartPrice: number;
    };
}
export interface SetIsFromPayment extends Action<typeof SET_ISFROMPAYMENT> {
    payload: {

    };
}



// export interface SetSignupUsernameAction extends Action<typeof SET_SIGNUP_USERNAME> {
//     payload: {
//         username: string;
//     };
// }

// export interface SetSignupPasswordAction extends Action<typeof SET_SIGNUP_PASSWORD> {
//     payload: {
//         password: string;
//     };
// }

export type AuthAction =
    | LoginRequestAction
    | LoginSuccessAction
    | LoginFailureAction
    | SetUsernameAction
    | SetPasswordAction
    | SignupRequestAction
    | SignupSuccessAction
    | SignupFailureAction
    | SetPasswordSignupAction
    | SetUsernameSignupAction
    | SetIsFromPayment
    | adminAddProductAction
    | AdminAddProductSuccessAction
    | adminAddProductFailureAction
    | FetchProductsSuccessAction
    | FetchProductsFailureAction
    | FetchProductsAction
    | UpdateProductAction
    | UpdateProductSuccessAction
    | UpdateProductFailureAction
    | DeleteProductAction
    | DeleteProductSuccessAction
    | DeleteProductFailureAction
    | AddItemTowardsCartAction
    | UpdateQuantityItemCartAction
    | UpdateQuantityItemCartSuccessAction
    | UpdateQuantityItemCartFailureAction
    | DeleteItemCartAction
    | DeleteItemCartSuccessAction
    | DeleteItemCartFailureAction
    | AddItemTowardsCartSuccessAction
    | AddItemTowardsCartFailureAction
    | TotalPriceAction
    | FetchItemsCartAction
    | FetchItemsCartSuccessAction
    | FetchItemsCartFailureAction
    ;






// Autres types liés à l'application
