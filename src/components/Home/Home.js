import React from "react";
import {Header} from '../Header';
import { customHistory } from "../../index";
import FlatButton from "material-ui/FlatButton";
import { validateSession } from "../../config/config";

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
        customHistory.push('/catalogo');
    }

    render() {
        if(this.currentUser)
        return (
            <div>
            <Header />
            <div style={{position:'fixed', top:'50%', left:'50%', transform:'translate(-50%,-50%)', fontSize:'120%'}} >
                <h1>Bienvenido a perleria, {this.currentUser.displayName}!</h1>
                <FlatButton backgroundColor='lightgrey' onClick={this.handleOrder} label="Empezar a buscar!">  </FlatButton>
                </div>
            </div>
        );
        else
        return <p>Home</p>
    }
}
