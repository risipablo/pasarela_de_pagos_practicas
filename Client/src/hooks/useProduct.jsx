import { useEffect, useState } from "react"
import axios from "axios";


const serverFront = 'https://pasarela-de-pagos-practicas.vercel.app/';

export const UseProduct = () => {
    const[product,setProduct] = useState([])

    useEffect(() => {
        axios.get(`${serverFront}/api/product`)
        .then(res => setProduct(res.data))
        .catch(err => console.log(err))
    }, [])


    const addProduct = (name, price, description, stock) => {
        if(name.trim() === '' || price.trim() === '' || description.trim() === '' || stock == ''){
            return
        }

        axios.post(`${serverFront}/api/product`, {
            name:name, price:price, description:description, stock:stock
        })
        .then(res => {
            setProduct([...product, res.data])
        })
        .catch(err => console.log(err))
    }


    const deleteNote = (id) => {
        axios.delete(`${serverFront}/api/product/` + id)
        .then(() => {
           setProduct(product.filter(prod => prod._id !== id))
        })
        .catch(error => {
            console.log(error)
        })
    }

    const editProduct = (id, name, price, description, stock) => {
        if(name.trim() === '' || price.trim() === '' || description.trim() === '' || stock == ''){
            return
        }
        axios.patch(`${serverFront}/api/product/` + id, {
            name:name, price:price, description:description, stock:stock
        })
        .then(res => {
            const updateProducts = product.map(prod => prod._id === id ? res.data : prod)
            setProduct(updateProducts)
        })
        .catch(err => console.log(err))
    }

    return {product, addProduct, deleteNote, editProduct}
}