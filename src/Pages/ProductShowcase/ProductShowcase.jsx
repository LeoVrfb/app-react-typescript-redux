import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import './ProductShowcase.css'
import { updateProduct, addItemTowardsCart } from '../../actions'


export default function ProductShowcase() {

    const [nbMugs, setNbMugs] = useState(1)

    const { id } = useParams()

    const myInventory = useSelector(state => state.auth.inventory)

    const productClicked = myInventory.findIndex(obj => obj.title.replace(/\s+/g, "").trim() === id)

    const updateMugs = e => {
        const value = Number(e.target.value);
        const updateItems = () => {
            if (value <= 1) {
                return 1
            }
            else if (value >= myInventory[productClicked].stock) {
                return myInventory[productClicked].stock
            }
            else {
                return value
            }
        }

        setNbMugs(updateItems);
    }

    const addingInfo = useRef();
    let timerInfo;
    let display = true;


    const dispatch = useDispatch()

    const addToCart = (e, documentId) => {
        e.preventDefault()

        const itemToAdd = myInventory.find(item => item.documentId === documentId);

        const productCart = {
            ...itemToAdd,
            quantity: nbMugs

        }
        dispatch(addItemTowardsCart(productCart))



        addingInfo.current.innerText = "Ajouté au panier"

        if (display) {
            display = false;
            timerInfo = setTimeout(() => {
                addingInfo.current.innerText = "";
                display = true;
            }, 500)
        }
        const stockToNumber = parseInt(myInventory[productClicked].stock);
        const stockToUpdate = stockToNumber - nbMugs;
        const modifiedStock = { stock: stockToUpdate };

        dispatch(updateProduct(documentId, modifiedStock));
        console.log(documentId, stockToUpdate)
    }



    useEffect(() => {
        return () => {
            clearTimeout(timerInfo)
        }
    }, [])

    return (
        <div className='showcase'>
            <div className="container-img-showcase">
                <img
                    className='img-showcase'
                    src={process.env.PUBLIC_URL + `/images/${myInventory[productClicked].img}.png`} alt="" />
            </div>
            <div className="product-infos">
                <h2>{myInventory[productClicked].title}</h2>
                <p>Prix : {myInventory[productClicked].price}€</p>

                <form onSubmit={(e) => addToCart(e, myInventory[productClicked].documentId)}>
                    <label htmlFor="quantity">Quantité</label>
                    <input type="number"
                        id="quantity"
                        value={nbMugs}
                        onChange={updateMugs}
                    />
                    <button>Ajouter au panier</button>
                    <span className='adding-info'
                        ref={addingInfo}
                    ></span>

                    <p>il y a actuellement {myInventory[productClicked].stock} produits en stock actuellement</p>

                </form>
            </div>

        </div>
    )
}