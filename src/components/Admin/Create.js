import * as React from 'react';
import Form from 'react-bootstrap/Form'
import {Button} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import {database} from "../../config/config";

export class Create extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleCreate = this.handleCreate.bind(this);

        this.database = database.ref().child('productos');

        this.state = {
            name:'',
            description:'',
            category:'',
            stock:0
        }
    }

    handleChange(e) {
        if (e.target.name === "stock") {
            let stock = parseInt(e.target.value, 10);
            this.setState({ [e.target.name]: stock });
        }
        else 
            this.setState({ [e.target.name]: e.target.value });
    }

    handleCreate(e) {
        e.preventDefault();
        var product = this.state;
        if (product.category.length == 0)
            product.category = "Collar";
        let key = this.database.push().key;
        this.database.push().set({
            id: key,
            name: product.name,
            description: product.description,
            category: product.category,
            stock: product.stock
        });
      alert("Se ha creado correctamente!");
    }

    render() {
        return (
            <Container>
                <h3> Nuevo Producto </h3>
                <Form onSubmit={this.handleCreate}>
                  <Form.Group controlId="pName">
                    <Form.Label>Nombre:</Form.Label>
                    <Form.Control required name="name" type="text" onChange={this.handleChange}/>
                    <Form.Control.Feedback type="invalid">
                      Por favor introduzca un nombre.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId="pDescription">
                    <Form.Label>Descripión:</Form.Label>
                    <Form.Control required name="description" as="textarea" rows="5" onChange={this.handleChange} />
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
                    <Form.Control required name="stock" type="number" onChange={this.handleChange}/>
                    <Form.Control.Feedback type="invalid">
                      Por favor introduzca la cantidad disponible.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Button variant="primary" type="Crear">
                    Submit
                  </Button>
                </Form>
            </Container>
        )
    }
}
