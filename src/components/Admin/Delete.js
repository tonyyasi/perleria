import * as React from 'react';
import Form from 'react-bootstrap/Form'
import {Button} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import {database} from "../../config/config";

export class Delete extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.listProducts = this.listProducts.bind(this);

        this.database = database.ref().child('productos');

        this.state = {
          products: [],
          activeID: ''
        }
    }

    componentWillMount() {
      var previousProducts = [];
      this.database.on('child_added', snap => {
        previousProducts.push({
          id: snap.key,
          name: snap.val().name
        })
        this.setState({ products: previousProducts, activeID: previousProducts[0].id});
      })

      this.database.on('child_removed', snap => {
        for (let i = 0; i < previousProducts.length; i++)
          if (previousProducts[i].id === snap.key)
            previousProducts.splice(i, 1);
        this.setState({ products: previousProducts, activeID: previousProducts[0].id});
      })
    }

    handleChange(e) {
      this.setState({ activeID: e.target.value });
    }

    handleDelete(e) {
      e.preventDefault();
      this.database.child(this.state.activeID).remove();
      alert("Se ha eliminado correctamente!");
    }

    listProducts() {
      let aux = this.state.products.map((product) => {
        return <option key={product.id} value={product.id}> {product.name} </option>;
      });
      return aux;
    }

    render() {
        return (
            <Container>
                <h3> Eliminar Producto </h3>
                <Form onSubmit={this.handleDelete}>
                  <Form.Group controlId="productDelete">
                    <Form.Label>Categoría:</Form.Label>
                    <Form.Control required name="category" as="select" onChange={this.handleChange}>
                        {this.listProducts()}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      Por favor seleccione alguna categoría.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Button variant="primary" type="Eliminar">
                    Submit
                  </Button>
                </Form>
            </Container>
        )
    }
}
