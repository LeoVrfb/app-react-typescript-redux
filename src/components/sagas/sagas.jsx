import { takeLatest, call, put } from 'redux-saga/effects';
import { loginSuccess, loginFailure, LOGIN_REQUEST, signupSuccess, signupFailure, SIGNUP_REQUEST, adminAddProductSuccess, adminAddProductFailure, ADMIN_ADD_PRODUCT, fetchProductsSuccess, fetchProductsFailure, FETCH_PRODUCTS, updateProductSuccess, updateProductFailure, UPDATE_PRODUCT, DELETE_PRODUCT, deleteProductSuccess, deleteProductFailure, ADD_ITEM_TOWARDS_CART, addItemTowardsCartSuccess, addItemTowardsCartFailure, fetchItemsCartSuccess, fetchItemsCartFailure, FETCH_ITEMS_CART, updateQuantityItemCartSuccess, updateQuantityItemCartFailure, UPDATE_QUANTITY_ITEM_CART } from '../../actions';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase-config';

import { auth } from '../../firebase-config';


function* login(action) {
  const { username, password } = action.payload;
  try {
    yield call(signInWithEmailAndPassword, auth, username, password);
    yield put(loginSuccess());
  } catch (error) {
    const errorMessage = error.message;
    yield put(loginFailure(errorMessage));
  }
}

function* register(action) {
  const { usernameSignup, passwordSignup } = action.payload;
  try {
    yield call(createUserWithEmailAndPassword, auth, usernameSignup, passwordSignup);
    yield put(signupSuccess());
  } catch (error) {
    const errorMessage = error.message;
    yield put(signupFailure(errorMessage));
  }
}


function* fetchProductsSaga() {
  try {
    const productsCollection = collection(db, 'products');
    const productsSnapshot = yield call(getDocs, productsCollection);
    const productsData = productsSnapshot.docs.map((doc) => doc.data());
    yield put(fetchProductsSuccess(productsData));
  } catch (error) {
    yield put(fetchProductsFailure(error.message));
  }
}


function* addProduct(action) {
  const { documentId, title, price, img, stock } = action.payload;
  try {
    const productsCollection = collection(db, 'products');
    const docRef = yield call(addDoc, productsCollection, {
      documentId,
      title,
      price,
      img,
      stock,
    });

    const updatedData = { documentId: docRef.id }

    const productRef = doc(db, 'products', docRef.id);
    yield call(updateDoc, productRef, updatedData);

    // Dispatch de l'action de réussite en incluant l'ID du document
    yield put(adminAddProductSuccess());
  } catch (error) {
    // Dispatch de l'action d'échec avec le message d'erreur
    yield put(adminAddProductFailure(error.message));
  }
}


function* updateProduct(action) {
  const { documentId, updatedData } = action.payload;

  try {
    const productRef = doc(db, 'products', documentId);
    yield call(updateDoc, productRef, updatedData);
    yield put(updateProductSuccess());
  } catch (error) {
    const errorMessage = error.message;
    yield put(updateProductFailure(errorMessage));
  }
}

function* deleteProduct(action) {
  const { documentId } = action.payload;
  try {
    const productRef = doc(db, 'products', documentId);
    yield call(deleteDoc, productRef);

    // Dispatchez une action de réussite si nécessaire
    yield put(deleteProductSuccess());
  } catch (error) {
    // Gérez l'erreur et dispatchez une action d'échec avec un message d'erreur si nécessaire
    const errorMessage = error.message;
    yield put(deleteProductFailure(errorMessage));
  }
}


function* fetchItemsFromCart() {
  try {
    const itemsCollection = collection(db, 'cart');
    const itemsSnapshot = yield call(getDocs, itemsCollection);
    const itemsData = itemsSnapshot.docs.map((doc) => doc.data());
    yield put(fetchItemsCartSuccess(itemsData));
  } catch (error) {
    yield put(fetchItemsCartFailure(error.message));
  }
}


function* addItemCart(action) {
  const { itemCart } = action.payload;
  try {
    const productsCollection = collection(db, 'cart');
    yield call(addDoc, productsCollection, itemCart);

    // Dispatch de l'action de réussite en incluant l'ID du document
    yield put(addItemTowardsCartSuccess());
  } catch (error) {
    // Dispatch de l'action d'échec avec le message d'erreur
    yield put(addItemTowardsCartFailure(error.message));
  }
}

function* updateQuantityCart(action) {
  const { documentId, updateData } = action.payload;
  try {
    const itemRef = doc(db, 'cart', documentId);
    yield call(updateDoc, itemRef, updateData);
    yield put(updateQuantityItemCartSuccess())
  } catch (error) {
    yield put(updateQuantityItemCartFailure())
  }
}

function* deleteItemCart(action) {
  const { documentId } = action.payload;
  try {
    const productRef = doc(db, 'cart', documentId);
    yield call(deleteDoc, productRef);

    // Dispatchez une action de réussite si nécessaire
    yield put(deleteProductSuccess());
  } catch (error) {
    // Gérez l'erreur et dispatchez une action d'échec avec un message d'erreur si nécessaire
    const errorMessage = error.message;
    yield put(deleteProductFailure(errorMessage));
  }
}


export default function* authSaga() {
  yield takeLatest(SIGNUP_REQUEST, register);
  yield takeLatest(LOGIN_REQUEST, login);
  yield takeLatest(ADMIN_ADD_PRODUCT, addProduct);
  yield takeLatest(FETCH_PRODUCTS, fetchProductsSaga);
  yield takeLatest(UPDATE_PRODUCT, updateProduct);
  yield takeLatest(DELETE_PRODUCT, deleteProduct);
  yield takeLatest(ADD_ITEM_TOWARDS_CART, addItemCart);
  yield takeLatest(FETCH_ITEMS_CART, fetchItemsFromCart);
  yield takeLatest(UPDATE_QUANTITY_ITEM_CART, updateQuantityCart);
}


