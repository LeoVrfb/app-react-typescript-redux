import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { adminAddProduct, adminAddProductSuccess, deleteProduct, fetchProducts, updateProduct } from '../../actions';
import './Administration.css'
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase-config';

const Administration = () => {
    const inventory = useSelector((state) => state.auth.inventory);
    const dispatch = useDispatch();
    const [addToggle, setAddToggle] = useState(false);
    const [updateToggle, setUpdateToggle] = useState(false);
    const [deleteToggle, setDeleteToggle] = useState(false);

    const [selectedProductId, setSelectedProductId] = useState(null);
    const [modifiedProduct, setModifiedProduct] = useState({});
    const [oldProduct, setOldProduct] = useState({});
    const [productToDelete, setProductToDelete] = useState({});
    const [documentId, setDocumentId] = useState();


    const [inventoryCopy, setInventoryCopy] = useState(inventory);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);



    const [newProduct, setNewProduct] = useState({
        title: '',
        price: 0,
        img: '',
        stock: 0,
    });

    const handleInputChange = (e) => {
        setNewProduct({
            ...newProduct,
            [e.target.name]: e.target.value,
        });
    };

    // const callApiIdDocument = async (productId) => {

    //     try {
    //         const productsRef = collection(db, 'products');
    //         const q = query(productsRef, where('documentId', '==', productId));
    //         const querySnapshot = await getDocs(q);

    //         querySnapshot.forEach((doc) => {
    //             const productIddata = doc.id;

    //             // Utilisez productIddata comme ID du document pour la mise à jour
    //             setDocumentId(productIddata);
    //         });

    //         // Autres opérations après la mise à jour si nécessaire...

    //     } catch (error) {
    //         console.log('impossible de récupérer l ID du document')
    //     }
    // }



    const handleAddProduct = (e) => {
        e.preventDefault();

        function generateUniqueId() {
            return Math.floor(Math.random() * 1000000);
        }

        const documentId = generateUniqueId();
        const { title, price, img, stock } = newProduct;

        dispatch(adminAddProduct(documentId, title, price, img, stock));

        setNewProduct({
            documentId,
            title: '',
            price: 0,
            img: '',
            stock: 0,
        });
    };

    const handleToggleAdd = () => {
        setAddToggle(!addToggle);
        setDeleteToggle(false);
        setUpdateToggle(false);

    }

    // update de l'inventaire


    const handleUpdate = async (documentId) => {
        setAddToggle(false);
        setDeleteToggle(false);
        setUpdateToggle(true);
        setDocumentId(documentId);
    };

    const handleInputChangeUpdate = (e, documentId) => {
        const { name, value } = e.target;
        setModifiedProduct((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        setInventoryCopy((prevInventory) => {
            return prevInventory.map((item) => {
                if (item.documentId === documentId) {
                    return {
                        ...item,
                        [name]: value,
                    };
                }
                return item;
            });
        });

    }

    const handleModifySubmit = (e) => {
        e.preventDefault();
        dispatch(updateProduct(documentId, modifiedProduct));
        setUpdateToggle(false);
    }


    const cancelEdit = () => {
        setSelectedProductId(null);
        setUpdateToggle(false);
    };

    const handleDeleteToggle = async (documentId) => {

        setInventoryCopy((prevInventory) => {
            return prevInventory.filter(item => item.documentId !== documentId);
        });
        dispatch(deleteProduct(documentId));

    }





    // delete le produit


    return (
        <div className="global-container">
            <button onClick={handleToggleAdd} className='button'> + Ajouter un produit</button>

            {addToggle && (
                <div>
                    <form onSubmit={handleAddProduct}>
                        <h2>Ajouter un produit</h2>
                        <div>
                            <label htmlFor="title">Titre :</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={newProduct.title}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="price">Prix :</label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                value={newProduct.price}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="img">Image :</label>
                            <input
                                type="text"
                                id="img"
                                name="img"
                                value={newProduct.img}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="stock">Stock :</label>
                            <input
                                type="number"
                                id="stock"
                                name="stock"
                                value={newProduct.stock}
                                onChange={handleInputChange}
                            />
                        </div>
                        <button type="submit">Ajouter</button>
                    </form>
                </div>
            )}
            <div className="product-wrapper">
                {inventoryCopy.map((item) => (
                    <div key={item.documentId} className="product-cards">
                        <div className="product-image">
                            <img src={process.env.PUBLIC_URL + `/images/${item.img}.png`} alt="produit" />
                        </div>
                        {documentId === item.documentId && updateToggle ? (
                            <form onSubmit={handleModifySubmit}>
                                <div className="products-info">

                                    <div className='label_input'>
                                        <label htmlFor="title">Titre : </label>
                                        <input
                                            type="text"
                                            name='title'
                                            value={item.title}
                                            onChange={(e) =>
                                                handleInputChangeUpdate(e, item.documentId)
                                            }
                                        />
                                    </div>

                                    <div className='label_input'>
                                        <label htmlFor="price">Prix : </label>
                                        <input
                                            type="text"
                                            name='price'
                                            value={item.price + ' €'}
                                            onChange={(e) =>
                                                handleInputChangeUpdate(e, item.documentId)
                                            }
                                        />
                                    </div>
                                    <div className='label_input'>
                                        <label htmlFor="img">img : </label>
                                        <input
                                            type="text"
                                            name='img'
                                            value={item.img}
                                            onChange={(e) =>
                                                handleInputChangeUpdate(e, item.documentId)
                                            }
                                        />
                                    </div>

                                    <div className='label_input'>

                                        <label htmlFor="stock">stock : </label>
                                        <input
                                            type="text"
                                            name='stock'
                                            value={item.stock}
                                            onChange={(e) =>
                                                handleInputChangeUpdate(e, item.documentId)
                                            }
                                        />
                                    </div>

                                </div>
                                <div className='buttons'>
                                    <button type="submit" className='button'>Enregistrer</button>
                                    <button onClick={cancelEdit} className='button'>Annuler</button>
                                </div>
                            </form>
                        ) : (
                            <div className='block_cards'>
                                <div
                                    className="product-info"
                                >
                                    <h2 className="product-title">{item.title}</h2>
                                    <p className="product-price">Prix : {item.price} €</p>
                                    <p className="product-price">img : {item.img}</p>
                                    <p className="product-stock">
                                        stock : {item.stock}
                                    </p>
                                </div>

                                <div className='admin_buttons'>
                                    <button onClick={() => handleUpdate(item.documentId)} className='button'>Modifier</button>
                                    <button onClick={() => handleDeleteToggle(item.documentId)} className='delete_button'>Supprimer</button>
                                </div>
                            </div>

                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Administration;
