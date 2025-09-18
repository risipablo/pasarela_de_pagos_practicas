import { useState } from "react"
import { UseProduct } from "../hooks/useProduct"
import "./product.css"

export function ProductPage(){
    const {product, addProduct, deleteNote, editProduct} = UseProduct()

    const[name, setName] = useState("")
    const[price, setPrice] = useState("")
    const[description, setDescription] = useState("")
    const[stock, setStock] = useState(0)

    const handleAddProduct = () => {
        addProduct(name, description, price, stock)
        setDescription('')
        setName('')
        setPrice('')
        setStock(0)
    }

    const handleDelete = (id) => {
        deleteNote(id)
    }

    const [editId, setEditId] = useState(null)
    const [editingId, setEditingId] = useState({
        name: '',
        price: '',
        description: '',
        stock: ''
    })

    const handleEdit = (product) => {
        setEditId(product._id)
        setEditingId({
            name: product.name,
            price: product.price,
            description: product.description,
            stock: product.stock
        })
    }

    const cancelEdit = () => {
        setEditId(null)
        setEditingId({
            name: '',
            price: '',
            description: '',
            stock: ''
        })
    }

    const saveEdit = (id) => {
        editProduct(
            id,
            editingId.name,
            editingId.price,
            editingId.description,
            editingId.stock
        )
    }

    const lastAddProduct = (product) => {
        if (product.length === 0){
            return 'No products added yet'
        } else {
            const lastProduct = product[product.length - 1]
            return `Last added product: ${lastProduct.name} `
        }
    }

    return(
        <div className="product-container">
            <h1 className="product-title">Listado de productos</h1>
            <div>
                <input className="product-input" type="text" placeholder="Enter the name of product" value={name} onChange={(e) => setName(e.target.value)}/>
                <input className="product-input" type="text" placeholder="Enter the description of product" value={description} onChange={(e) => setDescription(e.target.value)}/>
                <input className="product-input" type="text" placeholder="Enter the price of product" value={price} onChange={(e) => setPrice(e.target.value)}/>
                <input className="product-input" type="text" placeholder="Enter the stock of product" value={stock} onChange={(e) => setStock(e.target.value)}/>

                <button className="product-button" onClick={handleAddProduct}>
                    Add
                </button>
                <p className="product-last">{lastAddProduct(product)}</p>
                <ul className="product-list">
                    {product.map((prod,idx) =>(
                        <li key={idx} className="product-card">
                            <div><span className="product-label">Name:</span> {prod.name}</div>
                            <div><span className="product-label">Description:</span> {prod.description}</div>
                            <div><span className="product-label">Price:</span> ${prod.price}</div>
                            <div><span className="product-label">Amount:</span> {prod.stock}</div>
                            <div>
                                <button className="product-button" onClick={() => handleDelete(prod._id)}>Delete</button>
                                {editId === prod._id ? (
                                    null
                                ):(
                                    <button className="product-button" onClick={() => handleEdit(prod)}>Edit</button>
                                )}
                            </div>
                            {editId === prod._id &&(
                                <div className="product-edit-row">
                                    <input className="product-input" type="text" value={editingId.name} onChange={(e) => setEditingId({...editingId, name: e.target.value})} />
                                    <input className="product-input" type="text" value={editingId.description} onChange={(e) => setEditingId({...editingId, description: e.target.value})} />
                                    <input className="product-input" type="text" value={editingId.price} onChange={(e) => setEditingId({...editingId, price: e.target.value})} />
                                    <input className="product-input" type="text" value={editingId.stock} onChange={(e) => setEditingId({...editingId, stock: e.target.value})} />
                                    <button className="product-button" onClick={() => saveEdit(prod._id)}>Save</button>
                                    <button className="product-button" onClick={cancelEdit}>Cancel</button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}