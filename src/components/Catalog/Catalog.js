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

const sColFilter = {
  borderRight: '2px solid #00aaff'
}

const sCheckBox = {
  maxHeight: '25px',
  marginLeft: '15px',
}

const sFilters = {
  fontSize: '20px',
  marginLeft: '15px',
}

const sRadio = {
  marginLeft: '25px',
  marginRight: '25px',
}
export class Catalogo extends React.Component{
    constructor(props){
        super(props);
      
        this.state = {
          items: [],
          originalItems: [],
          filterCategory: [false, 'not_checked.png'],
          filterMoney: [false, 'not_checked.png'],
          selectedOption: 'option1'
        }
        this.getProducts = this.getProducts.bind(this)
        this.handleChange = this.handleChange.bind(this)
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
            category: firebasedata[key].category,
          })
        }
        this.setState({
          items: arrItem,
          originalItems: arrItem,
        })
      })
    }

    priceFilter(){
      if(!this.state.filterMoney[0]){
        console.log(this.state.items)
        this.setState({
          filterMoney: [true, 'checked.png'],
          items: this.state.items.sort((a,b) => (a.price < b.price) ? 1: -1)
        })
        console.log(this.state.items)
      }else{
        this.setState({
          filterMoney: [false, 'not_checked.png'],
          items: this.state.items.sort((a,b) => (a.price > b.price) ? 1: -1),
          originalItems: this.state.items
        })
      }
    }

    handleChange(event) {
      this.setState({
        selectedOption: event.target.value,
      });
      switch(event.target.value){
        case 'option1':
          this.setState({
            items: this.state.originalItems
          })
          break;
        case 'option2':
            this.setState({
              items: this.state.originalItems.filter((a) => a.category === 'Collar')
            })
          break;
        case 'option3':
        this.setState({
          items: this.state.originalItems.filter((a) => a.category === 'Pulsera')
        })
          break;         
        default:
        this.setState({
          items: this.state.originalItems
        })
        break;
      }
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
                <Header/>
                <Container fluid={true}>
                  <Row>
                    <div style={{textAlign:'center', width: '100%', marginTop: '30px'}}> 
                    <h1>Cátalogo de Productos</h1>
                    </div><br/>
                    <Line/>
                  </Row>
                  <Row>
                    <Col sm={{span:3}} style={sColFilter}>
                      <div style={{textAlign:'center'}}><h4>Filtros</h4></div>           
                      <div style={sFilters}>Categoria</div> <br/>
                      <form style={{marginBottom: '25px'}}>
                        <div className="radio">
                          <label>
                            <input type="radio" value="option1" checked={this.state.selectedOption === 'option1'} onChange={this.handleChange} style={sRadio}/>
                            Todo
                          </label>
                        </div>
                        <div className="radio">
                          <label>
                            <input type="radio" value="option2" checked={this.state.selectedOption === 'option2'} onChange={this.handleChange} style={sRadio}/>
                            Collar
                          </label>                
                        </div>
                        <div className="radio">
                          <label>
                            <input type="radio" value="option3" checked={this.state.selectedOption === 'option3'} onChange={this.handleChange} style={sRadio}/>
                            Pulsera
                          </label>                         
                        </div>
                      </form>
                      <img alt={''} src={this.state.filterMoney[1]} style={sCheckBox} onClick={()=>{this.priceFilter()}}/> <span style={sFilters}>Por mayor precio </span> <br/>
                    </Col>
                    {this.state.items.map((item)=> {
                      return(
                        <Col sm={{ span: 4}}>
                          <div style={{textAlign: 'center'}}>
                            <img alt={''} src={item.image} style={sImage}/>
                          </div>                      
                          <p>
                            <b>Nombre:</b> {item.name} <br/>
                            <b>Descripción:</b> {item.description} <br/>
                            <b>Categoria: </b> {item.category} <br/>
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