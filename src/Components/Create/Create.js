import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { useHistory } from 'react-router-dom';
import { FirebaseContext,AuthContext } from '../../store/Context';

const Create = () => {
  const {firebase} = useContext(FirebaseContext)
  const {user} = useContext(AuthContext)
  const history = useHistory()
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState(null)
  const date = new Date()


  const [productnameErr, setProductnameErr] = useState("")
  const [categoryErr, setcategoryErr] = useState("")
  const [priceErr, setpriceErr] = useState("")
  const [imageErr, setimageErr] = useState("")


  function validateproductname(){
    if (!name) {
      setProductnameErr("Productname is required");
      return false;
    }else if (name.length < 3) {
      setProductnameErr("Productname have minimum 3 character");
      return false;
    } 
    setProductnameErr(null);  
    return true;
  }
  function validatecategory(){
    if (!category) {
      setcategoryErr("category is required");
      return false;
    }else if (category.length < 3) {
      setcategoryErr("category have minimum 3 character");
      return false;
    } 
    setcategoryErr(null);  
    return true;
  }


  function validateprice(){
    if (!price) {
      setpriceErr("price is required");
      return false;
    }else {
      setpriceErr(null);  
    return true;
  }}
  function validateimage(){
    if (!image) {
      setimageErr("image is required");
      return false;
    }else {
      setimageErr(null);  
    return true;
  }
  }
  const handleSubmit =()=>{
    if(!validateproductname()||!validatecategory()||!validateprice()||!validateimage()) return ;
     firebase.storage().ref(`/image/${image.name}`).put(image).then(({ref})=>{
      ref.getDownloadURL().then((url)=>{
       console.log(url,'lll');
        firebase.firestore().collection('products').add({
          name,
          category,
          price,
          url,
          userId:user.uid,
          createdAt:date.toDateString()
        })
        history.push('/')
      })
     })
  }

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              value={name}
              onChange={(e)=> setName(e.target.value)}
              name="Name"
              defaultValue="John"
            /> {productnameErr && <div style={{color:"Red"}}> {productnameErr}</div>}
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              value={category}
              onChange={(e)=> setCategory(e.target.value)}
              name="category"
              defaultValue="John"
            />{categoryErr && <div style={{color:"Red"}}> {categoryErr}</div>}
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input 
             className="input"
             type="number" 
             id="fname"
             value={price}
             onChange={(e)=> setPrice(e.target.value)}
             name="Price" />
            <br />
            {priceErr && <div style={{color:"Red"}}> {priceErr}</div>}
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image):''} ></img>
          {imageErr && <div style={{color:"Red"}}> {imageErr}</div>}
            <br />
            <input onChange={(e)=>{
              setImage(e.target.files[0])
            }} type="file" />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
      
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
