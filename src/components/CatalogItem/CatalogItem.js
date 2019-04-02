import * as React from 'react';
import {database} from "../../config/config";
import styled from '@emotion/styled'
import { currentUser } from '../../config/config';
import { Header } from '../Header';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import CommonModal from '../CommonModal/CommonModal';
import { customHistory } from '../..';

const Line = styled.hr({
  background: '#00aaff',
  border: '0',
  height: '0.125rem',
  marginBottom: '2rem',
  maxWidth: '2rem,',
  width: '75%',
})

export class CatalogItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            item: {},
            amount: 0,
            carrito: [],
            modalShown: false,
        };
    }

    componentDidMount() {
        this.fetchProduct();
        this.fetchCarrito();
    }

    snapshotToArray = (snapshot) => {
        var returnArr = [];
    
        snapshot.forEach(function(childSnapshot) {
            var item = childSnapshot.val();
            item.key = childSnapshot.key;
    
            returnArr.push(item);
        });
    
        return returnArr;
    };

    fetchCarrito = () => {
        let databaseRef = database.ref(`carritos/${currentUser().uid}/productos`);
        databaseRef.once('value').then((snapshot)=>{
            const carrito = snapshot.val();
            if (carrito) {
            this.setState({carrito});
            }
          })
    }

    fetchProduct = () => {
        let databaseRef = database.ref(`productos/${this.props.match.params.id}`)
        databaseRef.once('value').then((snapshot)=>{
          const item = snapshot.val();
          this.setState({item});
        })
    }

    handleChange = (e) => {
        const amount = e.target.value;
        this.setState({amount});
    }

    handleButton = () => {
      const {item, amount, carrito} = this.state;
      var alreadyInCart = false;
      var amountInCart = 0;

      if (amount == 0)
        return;

      for (var i = 0; i < carrito.length; i++)
        if (item.id == carrito[i].id) {
          alreadyInCart = true;
          amount += carrito[i].amount;
          carrito[i].amount += amount;
          break;
        }

      if(item.stock >= amount) {
        if (alreadyInCart) {
            // Add amount to product in cart
            database.ref().child(`carritos/${currentUser().uid}`).update({
              carrito: carrito
            });            
          } else {
            // Add to cart logic
            database.ref().child(`carritos/${currentUser().uid}`).set({
              productos: [{id: item.id, name: item.name, category: item.category,
               price: item.price, description: item.description, 
               imageURL: item.imageURL, amount: amount }, ...carrito]
             }).then(() => {
               const modalShown = true;
               this.setState({modalShown});
             // alert('Producto agregado a carrito');
            })
           }
         } else {
          alert('Solo se puede comprar lo que se tiene en el inventario');
        }
      }

      closeModal = () => {
        const modalShown = false;
        this.setState({modalShown});
      };

      returnToCatalog = () => {
        customHistory.push('/catalog');
      }

    render() {

        const {item} = this.state;        
        return (
            <div style={{marginBottom:'35px'}}>
            <Header />
            <Container>
            <div style={{textAlign: 'center', marginTop: '30px'}}> <h2><b>Artículo:</b> {item.name}</h2> </div>
            <Line/>
            <div style={{textAlign: 'center'}}>
              <img src={item.imageURL} style={{maxHeight:'350px', borderRadius:'20px', marginBottom: '40px'}}/>
            </div>
            <table style={{marginBottom: '35px'}}>
            <tr>
              <td><b>Categoria:</b></td>
              <td>{item.category}</td>
            </tr>
            <tr>
              <td><b>Descripción:</b></td>
              <td>{item.description}</td>
            </tr>
            <tr>
              <td><b>Precio:</b></td>
              <td>${item.price}</td>
            </tr>
            <tr>
              <td><b>Articulos Disponibles:</b></td>
              <td>{item.stock}</td>
            </tr>
            <tr>
            </tr>
          </table>
          {item.stock > 0 && (
              <div>
              <input type="text" placeholder="amount" value={this.state.amount} onChange={this.handleChange}></input>
              <Button onClick={this.handleButton} style={{marginLeft: '15px'}}>Agregar a carrito</Button>
              </div>
          )}
          </Container>
          <CommonModal shown={this.state.modalShown}  closeModal={this.closeModal} title={"Producto Agregado!"} subtitle={"El producto se agregó al carrito"} buttonText={"Volver al catalogo"} onClick={this.returnToCatalog} />
            </div>
        )
    }
}