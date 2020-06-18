
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { saveProduct, listProducts, deleteProduct } from '../actions/productActions';


function ProductsScreen(props){

    const[modalVisible,setModalVisible]=useState(false);
  const [_id,setId]=useState('')
  const [name,setName]=useState('')
  const [price,setPrice]=useState('')
  const [image,setImage]=useState('')
  const [description,setDescription]=useState('')
  const [mindescription,setMinDescription]=useState('')
  const [quantity,setQuantity]=useState('')
  const productList =useSelector(state=>state.productList);
  const {loading,products,error}=productList;

  const productSave = useSelector(state=>state.productSave);
  const { loading: loadingSave, success:successSave , error :errorSave}= productSave;

  const productDelete = useSelector(state=>state.productDelete);
  const { loading: loadingDelete, success:successDelete , error :errorDelete}= productDelete;
  

  const dispatch = useDispatch();

  useEffect(()=>{
      if(successSave){
          setModalVisible(false);
      }
      dispatch(listProducts());
    return ()=>{
    
    }
  },[successSave,successDelete]);


  const openModal= (product)=>{
      setModalVisible(true);
    setId(product._id);
    setName(product.name);
    setPrice(product.price);
    setMinDescription(product.mindescription);
    setDescription(product.description);
    setImage(product.image);
    setQuantity(product.quantity);
   }



 const submitHandler=(e)=>{
     e.preventDefault();
     dispatch(saveProduct({_id,
                             name,price,image,quantity,mindescription,description}));
 }

 const deleteHandler=(product)=>{
     dispatch(deleteProduct(product._id));

 }

return <div className="content content-margined">

<div className="product-header12">
    <h3 className="products">Products</h3>
    <button className="button1" onClick={()=>openModal({})}>Create product</button>
</div>

{modalVisible && 


<div className="form">
<form onSubmit={submitHandler}>
    <ul className="form-container-add">
        <li>
            <h3 className="signin">Create product</h3>
        </li>
        <li>
            {loadingSave && <div>Loading...</div>}
            {errorSave && <div>{errorSave}</div>}
        </li>
        <li>  
            <label htmlFor="name">
                Name
            </label>
            <input type="text" value={name} name="name" id="name" onChange={(e)=>setName(e.target.value)}/>
        </li>
        <li>
            <label htmlFor="image">
                Image
            </label>
            <input type="text" name="image" value={image} id="image" onChange={(e)=>setImage(e.target.value)}/>
        </li>
        <li>
            <label htmlFor="mindescription">
                Min-Description
            </label>
            <textarea type="mindescription" value={mindescription} name="mindescription" id="mindescription" onChange={(e)=>setMinDescription(e.target.value)}/>
        </li>
        <li>
            <label htmlFor="description">
                Description
            </label>
            <textarea type="text" name="description" value={description} id="description" onChange={(e)=>setDescription(e.target.value)}/>
        </li>
        <li>
            <label htmlFor="price">
                Price
            </label>
            <input type="text" name="price" id="price" value={price} onChange={(e)=>setPrice(e.target.value)}/>
        </li>
        <li>
            <label htmlFor="quantity" >
                Quantity
            </label>
            <input type="text" name="quantity" id="quantity" value={quantity} onChange={(e)=>setQuantity(e.target.value)}/>
        </li>
        <li>
            <button type="submit" className="button11 primary">{_id?"Update":"Add Donut"}</button>
        </li>
        <li>
            <button type="button" onClick={()=>setModalVisible(false)} className="button11 primary">Close</button>
        </li>
       

    </ul>
</form>
</div>


}




<div className="product-list">

    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Image</th>
                <th>Price</th>
                <th>MinDescription</th>
                <th>Description</th>
                <th>Action</th>
            </tr>
        </thead>
        
        <tbody>
        {products.map(product => (
                 <tr key={product._id}>
                 <td>{product._id}</td>
                 <td>{product.name}</td>
                 <td>{product.image}</td>
                 <td>{product.mindescription}</td>
                 <td>{product.description}</td>
                 <td>
                     <button onClick={()=>openModal(product)}>Edit</button>
                     <button onClick={()=>deleteHandler(product)}>Delete</button>
                 </td>
             </tr>

        ))}
           
        </tbody>
    </table>

</div>

</div>



}

export default ProductsScreen;