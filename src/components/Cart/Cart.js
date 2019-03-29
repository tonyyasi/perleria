import * as React from 'react';
import {Header} from '../Header';
import styled from '@emotion/styled'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {database, currentUser} from "../../config/config";
import Card from 'react-bootstrap/Card'
import CardColumns from 'react-bootstrap/CardColumns'
import Button from 'react-bootstrap/Button'

const imgStyle = {
  height:'200px',
  width:'200px',
  borderRadius:'20px',
  marginBottom: '40px',
  marginLeft: 'auto',
  marginRight: 'auto',
  display: 'block'
};

const h1Style = {
  textAlign: 'center',
  marginBottom: '30px',
  marginTop: '20px'
};

const Line = styled.hr({
  background: '#00aaff',
  border: '0',
  height: '0.125rem',
  marginBottom: '2rem',
  maxWidth: '2rem,',
  width: '75%',
})

export default class Cart extends React.Component {
	constructor(props){
        super(props);
      
        this.state = {
          cart: []
        }
        this.getProducts = this.getProducts.bind(this)
      };

      componentWillMount(){
      this.getProducts() 
      }

      getProducts(){
        let databaseRef = database.ref(`carritos/${currentUser().uid}/productos`);
        databaseRef.once('value').then((snapshot)=>{
            const cart = snapshot.val();
            if (cart) {
            this.setState({cart});
            }
          })
    }

    render() {
      const {cart} = this.state
      const productList = cart.map(product => {
        return (
          <Card class="col-2">
          <Card.Img class="center" src={product.imageURL} style={imgStyle} />
          <Card.Body>
            <Card.Title>{product.name}</Card.Title>
            <Card.Text> Cantidad: {product.amount} </Card.Text>
            <Card.Text> Costo: ${product.price} </Card.Text>
            <Button variant="primary">Eliminar</Button>
          </Card.Body>
          </Card>
          )
      })
        return (
            <div>
                <Header />
                <h1 style={h1Style}> Carrito de Compras </h1>
								<br/>
                <Line/>
                <Container>
                  <CardColumns>
                    {productList}
                  </CardColumns>
                </Container>
            </div>
        )
    }
}