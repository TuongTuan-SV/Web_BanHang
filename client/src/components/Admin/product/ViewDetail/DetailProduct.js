import React, {useContext, useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import { GlobalState } from '../../../../GlobalState'
import ProductItem from '../../../homepage/utils/productitem/ProductItem'


export default function DetailProduct() {
    const parmas = useParams()
    const state = useContext(GlobalState)
    const [products] = state.productAPI.products

    const [detailProduct, setDetailProduct] = useState([])
    useEffect(() => {
        if(parmas.id){
            products.forEach(product => {
                if(product._id === parmas.id) setDetailProduct(product)
            });
        }
    },[parmas.id, products])

    if (detailProduct.length === 0 ) return null
     console.log(detailProduct)
    return (
        <>
            <div className='DetailProduct'>
                <img src = {detailProduct.image.url} alt = " "></img>
                <div className='box_detail'>
                    <div className='row'> 
                        <h2>{detailProduct.title}</h2>
                        <h6>#id :{detailProduct.product_id}</h6>
                    </div>
                    <span>{(detailProduct.price).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</span>
                    <p>{detailProduct.description}</p>
                    <p>{detailProduct.content}</p>
                    <p>Sold : {detailProduct.sold}</p>
                </div>
            </div>
        </>
   
  )
}
