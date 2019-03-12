import * as React from 'react';

import '../Header.css'

import { NavLink } from 'react-router-dom';
import {logout} from "../helpers/auth";
import {customHistory} from '../index';


const appTokenKey = "appToken"; 

export class Header extends React.Component {

    handleLogout() {
        logout().then(function () {
            localStorage.removeItem(appTokenKey);
            localStorage.removeItem('currentUser');
            customHistory.push("/login");
            console.log("user signed out from firebase");
        });
    }

    render() {
    
        return (
        <header>
        <div>
        <NavLink className="nav navItems" activeClassName="is-active" exact={true} to ="/home">Home</NavLink>
        <NavLink className="nav navItems" activeClassName="is-active" to ="/about">¿Quiénes Somos?</NavLink>
        <NavLink className="nav navItems" activeClassName="is-active" to ="/contact">Contacto</NavLink>
        <NavLink className="nav navItems" activeClassName="is-active" to ="/admin">Admin</NavLink>
        <NavLink className="nav navItems" activeClassName="is-active" to ="/profile">Profile</NavLink>
        <button className="logoutButton" onClick={this.handleLogout}>Logout</button>

        </div>
    </header>
        )
    }

}