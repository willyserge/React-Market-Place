import { Header, Icon, Form, Input, TextArea, Button } from "semantic-ui-react";

function CreateProduct() {
  return (
    <>
      <Header as='h2' block>
      <Icon name="add" color="orange"/>
        Create new product
      </Header>
      <Form>
        <Form.Group widths='equal'>
           <Form.Field 
             control= {Input}
             name="Name"
             label="Name"
             placeholder="Name"
           />

           <Form.Field   
             control= {Input}
             name="Price"
             label="Price"
             placeholder="Price"
             min="0.00"
             step="0.01"
             type="number"
           />
           <Form.Field 
             control= {Input}
             name="Media"
             type="file"
             label="media"
             accept="image/*"
             content="Select Image"

           />

         
        </Form.Group>

          <Form.Field 
             control= {TextArea}
             name="Description"
             label="Description"
             placeholder="Description"
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
