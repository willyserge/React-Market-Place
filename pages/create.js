
import { Header, Icon, Form, Input, TextArea, Button, Image, Message } from "semantic-ui-react";
import axios from 'axios'
import { useState } from "react";
import baseUrl from '../utils/baseUrl'

function CreateProduct() {

  const INITIAL_PRODUCT = {
    name:'',
    price:'',
    media:'',
    description:''
  }

  const [product,setProduct] = useState(INITIAL_PRODUCT)

  const [mediaPreview, setMediaPreview] = useState('')

  const [success, setsuccess] = useState(false)

  const handleChange = (e)=>{
    const { name , value , files} = e.target;

    if (name == 'Media') {
      setProduct((prevState)=>({
        ...prevState , media:files[0]
      }))
     setMediaPreview(window.URL.createObjectURL(files[0]))
    }
    else{
      setProduct((prevState)=>({
        ...prevState , [name]:value
      }))
    }
  }

  const handleImageUpload = async ()=>{
    const data = new FormData()
    data.append('file',product.media)
    data.append('upload_preset','market-place')
    data.append('cloud_name','dorlzbjs4')
    const response = await axios.post(process.env.CLOUDINARY_URL,data)
    const mediaUrl = response.data.url;
    return mediaUrl;
    

  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const mediaUrl = await handleImageUpload();
    const url=`${baseUrl}/api/product`;
    const { name , price , description } = product;
    const payload = { name , price , description , mediaUrl };
    await axios.post(url,payload)
    setProduct(INITIAL_PRODUCT)
    setsuccess(true)
    

  }



  return (
    <>
      <Header as='h2' block>
      <Icon name="add" color="orange"/>
        Create new product
      </Header>
      <Form success={success} onSubmit={handleSubmit}>

      <Message success icon="check" header="Success!" content="Your product has been posted"/>
        <Form.Group widths='equal'>
           <Form.Field 
             control= {Input}
             name="name"
             label="Name"
             placeholder="Name"
             value={product.name}
             onChange={handleChange}
           />

           <Form.Field   
             control= {Input}
             name="price"
             label="Price"
             placeholder="Price"
             min="0.00"
             step="0.01"
             type="number"
             value={product.price}
             onChange={handleChange}
           />
           <Form.Field 
             control= {Input}
             name="Media"
             type="file"
             label="media"
             accept="image/*"
             content="Select Image"
             onChange={handleChange}

           />

         
        </Form.Group>

        <Image src={mediaPreview} rounded centered size="small"/>

          <Form.Field 
             control= {TextArea}
             name="description"
             label="Description"
             placeholder="Description"
             value={product.description}
             onChange={handleChange}
           />

          <Form.Field 
             control= {Button}
             color="blue"
             icon="pencil alternate"
             placeholder="Description"
             content="Submit"
             type="submit"
           />
      </Form>
    </>
  );
}

export default CreateProduct;
