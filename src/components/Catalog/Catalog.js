import * as React from 'react';
import {Header} from '../Header'
import styled from '@emotion/styled'
import {database} from "../../config/config";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { customHistory } from '../..';


const Line = styled.hr({
  background: '#00aaff',
  border: '0',
  height: '0.125rem',
  marginBottom: '2rem',
  maxWidth: '2rem,',
  width: '75%',
})

const sImage = {
  maxHeight: '210px',
  borderRadius: '20px',
  marginBottom: '30px',
}

export class Catalogo extends React.Component{
    constructor(props){
        super(props);
      
        this.state = {
          items: []
        }
        this.getProducts = this.getProducts.bind(this)
     };

     getProducts(){
      let arrItem = []
      let databaseRef = database.ref("productos/")
      databaseRef.once('value').then((snapshot)=>{
        const firebasedata = snapshot.val()
        for(let key in firebasedata){
          arrItem.push({
            id: key,
            name: firebasedata[key].name,
            description: firebasedata[key].description,
            price: firebasedata[key].price,
            image: firebasedata[key].imageURL,
          })
        }
        this.setState({
          items: arrItem
        })
      })
    }

     componentWillMount(){
      this.getProducts() 
      console.log(this.state.items)
      }

      handleClick = (itemKey) => {
        customHistory.push('catalog/'+itemKey);
      }

    render(){
        return(
            <div>
              <styles></styles>
                <Header/>
                <Container>
                  <Row>
                    <div style={{textAlign:'center', width: '100%', marginTop: '30px'}}> 
                    <h1>Cátalogo de Productos</h1>
                    </div><br/>
                    <Line/>
                  </Row>
                  <Row>
                    {this.state.items.map((item)=> {
                      return(
                        <Col sm={{ span: 4}}>
                          <div style={{textAlign: 'center'}}>
                            <img src={item.image} style={sImage}/>
                          </div>                      
                          <p>
                            <b>Nombre:</b> {item.name} <br/>
                            <b>Descripción:</b> {item.description} <br/>
                            <b>Precio: $</b> {item.price} <br/>
                          </p>
                          <div style={{textAlign: 'center'}}>
                            <Button variant="primary" onClick={()=>{this.handleClick(item.id)}}>
                              Detalle
                            </Button>
                          </div>
                        </Col>
                      )
                    })}
    
                  </Row>
                </Container>
            </div>
        )
    }
}