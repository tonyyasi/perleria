import * as React from 'react';
import { Formik, Form, Field } from 'formik'
import {Header} from '../Header'
import styled from '@emotion/styled'
import * as Yup from 'yup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import {database, currentUser} from "../../config/config";

const ErrorSpan = styled.div({
    color: 'red',
    fontSize: 15,
    textAlign: 'center'
})
const LabelForms = styled.label({
    marginTop: '0.5rem',
    fontWeight: 'bold',
    display: 'inline-block',
    marginBottom: '.5rem',
})


const Line = styled.hr({
    background: '#00aaff',
    border: '0',
    height: '0.125rem',
    marginBottom: '2rem',
    maxWidth: '2rem,',
    width: '75%',
})

const sInput = {
    display: 'block',
    width: '100%',
    marginBottom: '10px',
    border: '1px #02344a solid',
    borderRadius: '5px',
    padding: '5px',
}

const ContactSchema = Yup.object().shape({
    address: Yup.string()
        .min(4, 'Por favor ingresa una dirección valida.')
        .required('Por favor ingresa una dirección'),
    name: Yup.string()
        .min(4, 'Por favor ingresa un nombre completo.')
        .required('Por favor ingresa un nombre completo.'),
    state: Yup.string()
        .required('Es necesario escribir un estado'),
    city: Yup.string()
    .required('Es necesario escribir una ciudad.'),
    phone: Yup.number()
    .typeError('Debes de ingresar numeros.')
    .positive()
    .required("Por favor ingresa un teléfono"),
    zip: Yup.number()
    .typeError('Debes de ingresar numeros.')
    .positive()
    .required("Por favor ingresa un código postal"),

  })

 


export class Payment extends React.Component{

  state = {
    cart:[],
    total: 0,
    date: ''
  }

  getProducts(){
    let totalPrice = 0;
    let databaseRef = database.ref(`carritos/${currentUser().uid}/productos`);
    databaseRef.once('value').then((snapshot)=>{
        const cart = snapshot.val();
        if (cart) {
          this.setState({
            cart: cart
          });
          for(let i = 0; i < cart.length; i++){
            totalPrice += (cart[i].price * cart[i].amount)
          }

          this.setState({
            total: totalPrice
          })
        }
      })
    }

  componentWillMount(){
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var hours = new Date().getHours(); 
    var min = new Date().getMinutes(); 
    var sec = new Date().getSeconds(); 
    this.setState({
      date: date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec,
    })
    console.log(this.state.date)
    this.getProducts()
  }

  render()
  {
    return(
        <div>
        <Header/>
            <Container>
                <h3 style={{textAlign:'center', marginTop:'15px'}}>Pago</h3>
                <Line></Line>
                <Row>
                    <Col sm={{ span: 6, offset: 3 }}>
                        <Formik 
                        initialValues={{
                            name: '',
                            address:'',
                            state: '',
                            city: '',
                            phone: '',
                            zip:'',

                        }}
                        validationSchema = {ContactSchema}
                        onSubmit = {
                            (values,actions) =>{
                             database.ref().child(`pedidos/${currentUser().uid}`).push({
                                recipient: values.name,
                                address: values.address,
                                state: values.state,
                                city: values.city,
                                phone: values.phone,
                                zip: values.zip,
                                dateOrdered: this.state.date,
                                total: this.state.total,
                                deliveryStatus: 0,
                                productos: [this.state.cart]
                            }).then(()=>{
                              database.ref().child(`carritos/${currentUser().uid}`).remove()
                              console.log("succesful")
                            });
                            console.log(values)
                            actions.resetForm()
                        }}>
                        {({ errors, touched, validateField, validateForm }) => (
                            <Form>
                                <LabelForms>Nombre de quien recibe: </LabelForms>
                                <Field style={sInput} name='name' placeholder="Tu nombre completo"></Field>
                                {errors.name && touched.name && <ErrorSpan>{errors.name}<br/></ErrorSpan>}
                                <LabelForms>Dirección (calle, número de casa, empresa, etc.): </LabelForms>
                                <Field style={sInput} name="address" placeholder="Av. Eugenio Garza Sada 2501"></Field>
                                {errors.address && touched.address && <ErrorSpan>{errors.address}<br/></ErrorSpan>}
                                <LabelForms>Estado</LabelForms>
                                <Field style={sInput} name="state" placeholder="Nuevo León"></Field>
                                {errors.state && touched.state && <ErrorSpan>{errors.state}<br/></ErrorSpan>}
                                <LabelForms>Ciudad</LabelForms>
                                <Field style={sInput} name="city" placeholder="Monterrey"></Field>
                                {errors.city && touched.city && <ErrorSpan>{errors.city}<br/></ErrorSpan>}
                                <LabelForms>Teléfono Celular</LabelForms>
                                <Field style={sInput} name="phone" placeholder="8121093730"></Field>
                                {errors.phone && touched.phone && <ErrorSpan>{errors.phone}<br/></ErrorSpan>}
                                <LabelForms>Código Postal: </LabelForms>
                                <Field style={sInput} type="number" name="zip" placeholder="64849"></Field>
                                {errors.zip && touched.zip && <ErrorSpan>{errors.zip}<br/></ErrorSpan>}
                                <Field style={sInput} className="btn btn-primary" value='Confirmar' type='submit' name='submit' style={{marginTop: '0.5rem', width:'33%'}} ></Field>
                            </Form>)}
                        </Formik>
                    </Col>
                </Row>
            </Container>
            
    </div>
    )
  }
}