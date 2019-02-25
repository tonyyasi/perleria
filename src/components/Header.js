import * as React from 'react';

import '../Header.css'

import { NavLink } from 'react-router-dom';


export const Header = () => (
    <header>
        <div className="navItems">
        <NavLink className="nav" activeClassName="is-active" exact={true} to ="/">Home</NavLink>
        <NavLink className="nav" activeClassName="is-active" to ="/about">About</NavLink>
        </div>
    </header>
)