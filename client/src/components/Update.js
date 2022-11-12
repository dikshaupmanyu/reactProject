import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate , useParams } from "react-router-dom";

const Update = () => {

    
    const [fname , setName] = useState("");
    const [description , setDescription] = useState("");
  

    const params = useParams();
    const  history = useNavigate(); 

    useEffect(() => {
        getProductDetails()
    },[]);

    const getProductDetails = async () => { 
        // console.log(params)
        let result = await fetch(`http://localhost:8005/product/${params.id}`);
        result = await result.json();
        // console.log(result);
        setName(result.fname)
        setDescription(result.description)
     }

   const updateProduct = async () => {
      console.warn(fname, description);
      let res = await fetch(`http://localhost:8005/product/${params.id}`,{
        method: "Put",
        body: JSON.stringify({fname, description}),
        headers:{
          "Content-Type":"Application/json",
        }
      });
      res = await res.json();
      console.warn(res);
      // if(res){
      // //   alert("yes")
      //   history("/home")
      // }
   }  

  

  return (
    <>
      <div className="container mt-3">
        <h1>Upload Your Img Here</h1>

        <Form className='mt-3'>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" name='fname' value={fname} onChange={(e) => {setName(e.target.value)}} placeholder="" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" name='description' value={description} onChange={(e) => {setDescription(e.target.value)}} placeholder="" />
          </Form.Group>

          {/* <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Select Your Image</Form.Label>
            <Form.Control type="file"  onChange={(e) => {setImage(e.target.value)}}  name='photo' placeholder="" />
          </Form.Group> */}
          <Button variant="primary" onClick={updateProduct} type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </>
  )
}

export default Update