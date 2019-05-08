import * as React from 'react';
import {Header} from '../Header';
import styled from '@emotion/styled'
import Container from 'react-bootstrap/Container';
import {database, currentUser} from "../../config/config";
import Card from 'react-bootstrap/Card'
import CardColumns from 'react-bootstrap/CardColumns'
import Button from 'react-bootstrap/Button'
import { customHistory } from '../..';
import Jumbotron from 'react-bootstrap/Jumbotron';
import PaypalComponent from '../Paypal/PaypalComponent';
import CommonModal from './../CommonModal/CommonModal';


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

const sBuy = {
  marginTop: '35px',
  textAlign: 'center',
}

export default class Cart extends React.Component {
	constructor(props){
        super(props);
      
        this.state = {
          cart: [],
          empty: true,
          showModal: false
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
            this.setState({
              cart: cart,
              empty: false,
            });
            }else{
              this.setState({
                empty: true,
              })
            }
          })
    }

    handleButton = (e) => {
      var cart = this.state.cart;
      var id = -1;
      for (var i = 0; i < cart.length; i++)
        if (e.target.id === cart[i].id) {
          id = i;
          cart.splice(i,1);
          break;
          }
      if (id >= 0)
        database.ref().child(`carritos/${currentUser().uid}/productos/${id}`).remove();
      this.setState({cart});
    }

    goToPayment = () => {
      customHistory.push('/payment')
    }

    onFailure = () => {
        const showModal = true;
        this.setState({showModal});
    }

    buyButton = (productList, cart) => {
      if(productList.length > 0){
        let totalPrice = 0;
        cart.map((item) => {
          totalPrice += item.amount * item.price;
        });
        return (
          <div style={sBuy}>
            <p> <b>Precio total:  ${totalPrice} </b></p>
            <PaypalComponent onCancel={this.onFailure} totalPrice={totalPrice} onSuccess={this.goToPayment} onFailure={this.onFailure} />
            <br />
            <br />

          </div>
        )
      }else{
        return(
          <div style={sBuy}>
            <h3>No tienes ni un artículo en tu carrito de compras</h3>
          </div>
        )
      }
    }

    goToCarrito = () => {
      const showModal = false;
      this.setState({showModal});
    }

    closeModal = () => {
      const showModal = false;
      this.setState({showModal});
    }

    render() {
      const {cart} = this.state
      const productList = cart.map(product => {
        return (
          <Card class="col-2">
          <Card.Img src={product.imageURL} style={imgStyle} />
          <Card.Body>
            <Card.Title>{product.name}</Card.Title>
            <Card.Text> Cantidad: {product.amount} </Card.Text>
            <Card.Text> Costo: ${product.price} </Card.Text>
            <Button style={{backgroundColor:'red', borderColor: 'red'}} onClick={this.handleButton} id={product.id}>Eliminar</Button>
          </Card.Body>
          </Card>
          )
      })
        return (
            <div>
                <Header />
                <Jumbotron fluid>
                <h1 style={h1Style}> Carrito de Compras </h1>
                </Jumbotron>
                <Container>
                  <CardColumns>
                    {productList}
                  </CardColumns>
                </Container>
                {this.buyButton(productList, cart)}
                <CommonModal shown={this.state.showModal} closeModal={this.closeModal} title={"Compra no terminada"} subtitle={"El pago no se realizó correctamente"} buttonText={"Volver a intentar"} onClick={this.goToCarrito} />
            </div>
        )
    }
}