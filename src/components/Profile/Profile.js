import * as React from 'react';
import firebase from 'firebase'
import Form from 'react-bootstrap/Form'
import {Button} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';

import {Header} from '../Header';

const h1Style = {
  textAlign: 'center',
  marginBottom: '30px',
  marginTop: '20px'
};


export default class Profile extends React.Component {

    user = undefined;
    componentWillMount() {
        this.user = firebase.auth().currentUser.displayName
    }
    constructor(props) {
        super(props);
        this.state = {
            displayName:'',
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleCreate = (e) => {
        e.preventDefault();
        const displayName = this.state.displayName;
        firebase.auth().currentUser.updateProfile({
            displayName
        }).then(() => {
            localStorage.setItem("currentUser",  JSON.stringify(firebase.auth().currentUser));
        });
    }

    render() {
        return (
            <div>
                <Header />
                <h1 style={h1Style}> Perfil del Usuario </h1>
                <Container >
                <Form onSubmit={this.handleCreate}>
                  <Form.Group controlId="displayName">
                    <Form.Label>Nombre:</Form.Label>
                    <Form.Control defaultValue={firebase.auth().currentUser.displayName} required name="displayName" type="text" onChange={this.handleChange}/>
                    <Form.Control.Feedback type="invalid">
                      Por favor ingrese un nuevo valor
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Button variant="primary" type="Crear" id="buttons">
                    Submit
                  </Button>
                  </Form>
                  </Container>

            </div>
        )
    }
}
