import * as React from 'react';

import '../Header.css'

import { NavLink } from 'react-router-dom';
import {logout} from "../helpers/auth";
import {customHistory} from '../index';
import { currentUser, database } from '../config/config';
import { Navbar } from 'react-bootstrap';
import { NavDropdown } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

import { Nav } from 'react-bootstrap';
const appTokenKey = "appToken"; 

export class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showAdmin: false
        }
    }

    reviseAdmin = (id) => {
        database.ref(`admins/${id}`).once('value').then((snapshot) => {
            const showAdmin = snapshot.val();
            this.setState({showAdmin});
        });
    }

    componentDidMount() {
        this.reviseAdmin(currentUser().uid);
    }

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
            <Navbar id="navbar"  expand="lg">
                <Navbar.Brand href="/home">
                    <img
                        width="100"
                        height="50"
                        src="/perleriaLogo.png"
                        className="d-inline-block align-top"
                    /> 
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <NavLink className="nav navItems"  to ="/catalog" href="./catalog">Catálogo</NavLink>
                        <NavLink className="nav navItems" activeClassName="is-active" to ="/about">¿Quiénes Somos?</NavLink>
                        <NavLink className="nav navItems" activeClassName="is-active" to ="/contact">Contacto</NavLink>
                        {this.state.showAdmin &&
                        <NavLink className="nav navItems" activeClassName="is-active" to ="/admin">Admin</NavLink>
                        }
                        
                        
                    </Nav>
                    <NavDropdown title="Usuario" id="collasible-nav-dropdown">
                        <NavDropdown.Item> 
                            <NavLink className="nav navItems" activeClassName="is-active" to ="/profile">Perfil</NavLink>
                        </NavDropdown.Item>
                        <NavDropdown.Item> 
                            <button className="logoutButton" onClick={this.handleLogout}>Logout</button>
                        </NavDropdown.Item>
                    </NavDropdown>
                    <NavLink className="nav navItems" activeClassName="is-active" to ="/cart">
                        <img
                            width="30"
                            height="30"
                            src="/carrito.png"
                            className="d-inline-block align-top" 
                        />
                    </NavLink>
                    
                </Navbar.Collapse>
            </Navbar>
    </header>
        )
    }

}