import * as React from 'react';
import Form from 'react-bootstrap/Form'
import {Button} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import {database, storageRef} from "../../config/config";
import CommonModal from './../CommonModal/CommonModal';

export class Update extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleEdit = this.handleEdit.bind(this);

        this.state = {
                name: '',
         description: '',
            category: '',
               stock: 0,
               price: 0,
               image: null,
          modalShown: false
        };
    }

    componentDidMount() {
      if (this.props.id) {
        let databaseRef = database.ref(`productos/${this.props.id}`)
        databaseRef.once('value').then((snapshot)=>{
          const product = snapshot.val();
          this.setState({
                   name: product.name,
            description: product.description,
               category: product.category,
                  stock: product.stock,
                  price: product.price,
                  image: product.imageURL,
               newImage: false
          });
        })
      }
    }

    handleChange(e) {
      if (e.target.name === "stock" || e.target.name === "price") {
        let num = parseInt(e.target.value, 10);
        this.setState({ [e.target.name]: num });
      } else
      this.setState({ [e.target.name]: e.target.value });
    }
    
    closeModal = () => {
      const modalShown = false;
      this.setState({modalShown});
    };

    showModal = () => {
      const modalShown = true;
      this.setState({modalShown});
    };

    handlePhotos = (e) => {
      const image = e.target.files[0];
      this.setState(() => ({
        image: image,
        newImage: true
      }));
    }

    handleEdit(e) {
      e.preventDefault();
      if (this.state.newImage)
        this.updateWithImage();
      else
        this.updateProduct();
    }

    updateProduct = () => {
      var product = this.state;

      database.ref(`productos/${this.props.id}`).update({
              name: product.name,
       description: product.description,
          category: product.category,
             stock: product.stock,
             price: product.price,
     }).then(() => {
      this.showModal();
    })
   }

    updateWithImage = () => {
      var product = this.state;
      const image = this.state.image;
      const imageName = image.name + new Date().getTime().toString();
      const uploadTask = storageRef.ref(`images/${imageName}`).put(image);
      uploadTask.on('state_changed',
      (snapshot) => {
        // progrss function ....
      },
      (error) => {
           // error function ....
        console.log(error);
      },
      () => {
        // complete function ....
        storageRef.ref('images').child(imageName).getDownloadURL().then(url => {
          database.ref(`productos/${this.props.id}`).update({
                     name: product.name,
              description: product.description,
                 category: product.category,
                    stock: product.stock,
                    price: product.price,
                 imageURL: url
          }).then(() => {
            this.showModal();
            })
          })
        });
    }

    render() {
      const {name, description, stock, price, category} = this.state;

        return (
            <Container>
                <h3> Modificar Producto </h3>
                <Form onSubmit={this.handleEdit}>
                  <Container>
                    <Form.Group controlId="pName">
                      <Form.Label>Nombre:</Form.Label>
                      <Form.Control value={name} required name="name" type="text" onChange={this.handleChange}/>
                      <Form.Control.Feedback type="invalid">
                        Por favor introduzca un nombre.
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="pDescription">
                      <Form.Label>Descripión:</Form.Label>
                      <Form.Control value={description} required name="description" as="textarea" rows="5" onChange={this.handleChange} />
                      <Form.Control.Feedback type="invalid">
                        Por favor introduzca una descripción.
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="pCategory">
                      <Form.Label>Categoría:</Form.Label>
                      <Form.Control value={category} required name="category" as="select" onChange={this.handleChange}>
                        <option>Collar</option>
                        <option>Pulsera</option>
                        <option>Reloj</option>
                        <option>Anillo</option>
                        <option>Otro</option>
                      </Form.Control>
                      <Form.Control.Feedback type="invalid">
                        Por favor seleccione alguna categoría.
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="pStock">
                      <Form.Label>Cantidad:</Form.Label>
                      <Form.Control value={stock} required name="stock" type="number" onChange={this.handleChange}/>
                      <Form.Control.Feedback type="invalid">
                        Por favor introduzca la cantidad disponible.
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="pPrice">
                      <Form.Label value={price}>Precio:</Form.Label>
                      <Form.Control value={price} required name="price" type="number" onChange={this.handleChange}/>
                      <Form.Control.Feedback type="invalid">
                        Por favor introduzca el costo.
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Image </Form.Label>
                      <Form.Control name="images" type="file" multiple onChange={this.handlePhotos}/>
                    </Form.Group>
                  </Container>

                  <Button variant="primary" type="submit">
                    Aceptar
                  </Button>
                </Form>
                <CommonModal shown={this.state.modalShown} closeModal={this.closeModal} title={"Producto Modificado!"} subtitle={"El producto se modificó correctamente"} buttonText={"Cerrar"} onClick={this.closeModal} />
            </Container>
        )
    }
}
