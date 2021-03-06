import React from "react";
import {Header} from '../Header';
import { customHistory } from "../../index";
import FlatButton from "material-ui/FlatButton";
import { validateSession } from "../../config/config";
import { Button } from 'react-bootstrap';

export default class Home extends React.Component {
    currentUser = JSON.parse(localStorage.getItem('currentUser'));

    componentWillMount() {
        if (!validateSession()) {
            customHistory.push('/login');
            return;
        } else {
        }
    }


    handleOrder = () => {
        customHistory.push('/catalog');
    }

    render() {
        if(this.currentUser) {
            const name = this.currentUser.displayName || 'no name';
        return (
            <div>
            <Header />
            <div style={{position:'fixed', top:'50%', left:'50%', transform:'translate(-50%,-50%)', fontSize:'120%', textAlign: 'center'}} >
                <h1>Bienvenido a perleria, {name}!</h1>
                <Button id="buttons" onClick={this.handleOrder} >
                              Empezar a buscar!
                </Button>
                </div>
            </div>
        );
        }
        else
        return <p>Home</p>
    }
}
