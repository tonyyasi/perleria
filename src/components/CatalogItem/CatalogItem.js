import * as React from 'react';
import {database} from "../../config/config";

export class CatalogItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            item: {},
            amount: 0,
        };
    }

    componentDidMount() {
        this.fetchProduct();
    }

    fetchProduct = () => {
        let databaseRef = database.ref(`productos/${this.props.match.params.id}`)
        databaseRef.once('value').then((snapshot)=>{
          const item = snapshot.val();
          this.setState({item});
          console.log(item);
        })
    }

    handleChange = (e) => {
        const amount = e.target.value;
        this.setState({amount});
    }

    handleButton = () => {
        const {item, amount} = this.state;
        if(item.stock >= amount) {

        } else {
            alert('Solo se puede comprar lo que se tiene en el inventario');
        }
    }

    render() {

        const {item} = this.state;
        
        return (
            <div>
            <h2>Artículo: {item.name}</h2>
            <img src={item.imageURL} style={{height:'210px', borderRadius:'20px', marginBottom: '40px'}}></img>
            <table>
            <tr>
              <td>Categoria</td>
              <td>{item.category}</td>
            </tr>
            <tr>
              <td>Descripción</td>
              <td>{item.description}</td>
            </tr>
            <tr>
              <td>Precio</td>
              <td>{item.price}</td>
            </tr>
            <tr>
              <td>Articulos Disponibles</td>
              <td>{item.stock}</td>
            </tr>
            <tr>
            </tr>
          </table>
          {item.stock > 0 && (
              <div>
              <input type="text" placeholder="amount" value={this.state.amount} onChange={this.handleChange}></input>
              <button onClick={this.handleButton}>Add to cart</button>
              </div>
          )}
            </div>
        )
    }
}