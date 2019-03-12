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
import {database} from "../../config/config";

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
    email: Yup.string()
        .min(4, 'Por favor ingresa un Email valido.')
        .max(50, 'Por favor ingresa un Email valido.')
        .required('Por favor ingresa un Email valido.')
        .email('Por favor ingresa un Email valido.'),
    name: Yup.string()
        .min(4, 'Por favor ingresa tu nombre completo.')
        .required('Por favor ingresa tu nombre completo.'),
    message: Yup.string()
        .required('Es necesario escribir un mensaje.')

  })

  let currentUser = JSON.parse(localStorage.getItem('currentUser'));
  let nameUser = currentUser.displayName
  let emailUser = currentUser.email
  let databaseRef = database.ref().child('contacto')


export class Contact extends React.Component{

  state = {
    showModal: false
}

toggleModal = () => {
    this.setState({
        showModal: !this.state.showModal
    });
}

  render()
  {
    return(
        <div>
        <Header/>
            <Container>
                <h3 style={{textAlign:'center', marginTop:'15px'}}>Contacto</h3>
                <Line></Line>
                <Row>
                    <Col sm={{ span: 6, offset: 3 }}>
                        <Formik 
                        initialValues={{
                            message:'',
                            name: nameUser,
                            email: emailUser,

                        }}
                        validationSchema = {ContactSchema}
                        onSubmit = {
                            (values,actions) =>{
                            let key = databaseRef.push().key;
                            databaseRef.push().set({
                                id: key,
                                name: values.name,
                                email: values.email,
                                message: values.message,
                            });
                            this.setState({
                              showModal: !this.state.showModal
                          })
                            console.log(values)
                            actions.resetForm()
                        }}>
                        {({ errors, touched, validateField, validateForm }) => (
                            <Form>
                                <LabelForms>Nombre: </LabelForms>
                                <Field style={sInput} name='name' placeholder="Tu nombre completo"></Field>
                                {errors.name && touched.name && <ErrorSpan>{errors.name}<br/></ErrorSpan>}
                                <LabelForms>Email: </LabelForms>
                                <Field style={sInput} name="email" placeholder="Correo electrónico"></Field>
                                {errors.email && touched.email && <ErrorSpan>{errors.email}<br/></ErrorSpan>}
                                <LabelForms>Mensaje: </LabelForms>
                                <Field style={sInput} type="text" name="message" placeholder="Danos tus sugerencias"></Field>
                                {errors.message && touched.message && <ErrorSpan>{errors.message}<br/></ErrorSpan>}
                                <Field style={sInput} className="btn btn-primary" value='Enviar' type='submit' name='submit' style={{marginTop: '0.5rem', width:'33%'}} ></Field>
                            </Form>)}
                        </Formik>
                    </Col>
                </Row>
            </Container>
            
            <Modal show={this.state.showModal} onHide={this.toggleModal} centered>
              <Modal.Header closeButton>
                <Modal.Title>Éxito</Modal.Title>
              </Modal.Header>
              <Modal.Body>Tu mensaje sera leído lo mas pronto posible</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.toggleModal}>
                  Cerrar
                </Button>
              </Modal.Footer>
            </Modal>
    </div>
    )
  }
}