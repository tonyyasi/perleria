import * as React from 'react';
import Form from 'react-bootstrap/Form'
import {Button} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import {database} from "../../config/config";
import CommonModal from './../CommonModal/CommonModal';

export class Update extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.listProducts = this.listProducts.bind(this);

        this.database = database.ref().child('productos');

        this.state = {
            products: [],
            activeId: 'null',
                name: '',
         description: '',
            category: '',
               stock: 0,
               price: 0,
               modalShown: false,
        }
    }

    componentDidMount() {
      var previousProducts = [];
      this.database.on('child_added', snap => {
        previousProducts.push({
          id: snap.key,
          name: snap.val().name,
          description: snap.val().description,
          category: snap.val().category,
          stock: snap.val().stock,
          price: snap.val().price
        })
        this.setState({ 
          products: previousProducts, 
          activeId: previousProducts[0].id,
              name: previousProducts[0].name,
       description: previousProducts[0].description,
          category: previousProducts[0].category,
             stock: previousProducts[0].stock,
             price: previousProducts[0].price,
           });
      })
    }

    updateState = (id) => {
      
      let product = this.state.products.filter(product => product.id === id)[0];
      this.setState({ 
        activeId: product.id,
            name: product.name,
     description: product.description,
        category: product.category,
           stock: product.stock,
           price: product.price,
         });
    }

    handleChange(e) {
      if (e.target.name === "stock" || e.target.name === "price") {
            let num = parseInt(e.target.value, 10);
            this.setState({ [e.target.name]: num });
        } else if (e.target.name === "products") {
            this.setState({ activeId: e.target.value });
            this.updateState(e.target.value);
          }
        else 
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

    handleEdit(e) {
      e.preventDefault();
      this.database.child(this.state.activeId).update({
            name: this.state.name,
            description: this.state.description,
            category: this.state.category,
            stock: this.state.stock,
            price: this.state.price
      }).then(() => {
        this.showModal();
      })
      var previousProducts = [];
      this.database.on('child_added', snap => {
        previousProducts.push({
          id: snap.key,
          name: snap.val().name,
          description: snap.val().description,
          category: snap.val().category,
          stock: snap.val().stock,
          price: snap.val().price
        })
        this.setState({ 
          products: previousProducts, 
          activeId: previousProducts[0].id,
              name: previousProducts[0].name,
       description: previousProducts[0].description,
          category: previousProducts[0].category,
             stock: previousProducts[0].stock,
             price: previousProducts[0].price,
           });
      })
    }

    listProducts() {
      return this.state.products.map((product) => {
        return <option key={product.id} value={product.id}> {product.name} </option>;
      });
    }

    render() {

      const {name, description, stock, price} = this.state;

        return (
            <Container>
                <h3> Modificar Producto </h3>
                <Form onSubmit={this.handleEdit}>
                  <Form.Group controlId="productDelete">
                    <Form.Label>Producto:</Form.Label>
                    <Form.Control required name="products" as="select" onChange={this.handleChange}>
                        {this.listProducts()}
                    </Form.Control>
                  </Form.Group>
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
                      <Form.Control required name="category" as="select" onChange={this.handleChange}>
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
                  </Container>

                  <Button variant="primary" type="submit">
                    Aceptar
                  </Button>
                </Form>
                <CommonModal shown={this.state.modalShown}  closeModal={this.closeModal} title={"Producto Modificado!"} subtitle={"El producto se modificó correctamente"} buttonText={"Cerrar"} onClick={this.closeModal} />
            </Container>
        )
    }
}
