import * as React from 'react';
import {Header} from '../Header'
import styled from '@emotion/styled'
import {database} from "../../config/config";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const Line = styled.hr({
  background: '#00aaff',
  border: '0',
  height: '0.125rem',
  marginBottom: '2rem',
  maxWidth: '2rem,',
  width: '75%',
})

export class Catalogo extends React.Component{
    constructor(props){
        super(props);
      
        this.state = {
          firebasedata: []
        }
        this.getProducts = this.getProducts.bind(this)
     };

     getProducts(){
      let databaseRef = database.ref("productos/")
      databaseRef.once('value').then((snapshot)=>{
        const firebasedata = snapshot.val()
        this.setState({firebasedata})
        console.log(firebasedata)
      })
    }

    createProductCatalog = () => {
      let html = ''
      for (var key in this.state.firebasedata) {
        html += "<div class='col-md-4'>"
        html += "<div style='text-align:center'><img src= " +this.state.firebasedata[key].imageURL+" style='height:210px; border-radius:20px; margin-bottom: 40px'></div>"
        html += "<br/><b>Nombre: </b>"
        html += this.state.firebasedata[key].name
        html += "<br/><b>Descripción: </b>"
        html += this.state.firebasedata[key].description
        html += "<br/><b>Precio: $</b>"
        html += this.state.firebasedata[key].price
        html += "<br><div style='text-align: center;'><input class='btn btn-primary' type='button' value='Agregar'></input></div>"
        html += "</div>"
      }
      return <div className="row" style={{marginTop:'20px'}} dangerouslySetInnerHTML={{__html: html}}/>
    }

     componentWillMount(){
      this.getProducts() 
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
                    {this.createProductCatalog()}
                </Container>
            </div>
        )
    }
}