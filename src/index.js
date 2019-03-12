import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import {Redirect, Route, Router} from "react-router";
import createBrowserHistory from "history/createBrowserHistory";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import * as serviceWorker from './serviceWorker';
import Login from './components/Login/Login'
import {About} from './components/About/About';
import {Contact} from './components/Contact/Contact'
import {Catalogo} from './components/Catalog/Catalog'
import Admin from './components/Admin/Admin';
import Profile from './components/Profile/Profile';
import Home from './components/Home/Home';
import 'bootstrap/dist/css/bootstrap.css';

const muiTheme = getMuiTheme({
    appBar: {
        color: "#37517E",
        height: 50
    },
})

export const customHistory = createBrowserHistory();

const Root = () => (
    <MuiThemeProvider muiTheme={muiTheme}>
        <Router history={customHistory}>
            <div>
                <Route path="/login" component={Login}/>
                <Route path="/catalog" component={Catalogo}/>
                <Route path="/profile" component={Profile}/>
                <Route path="/about" component={About} />
                <Route path="/admin" component={Admin} />
                <Route path="/contact" component={Contact} />
                <Route path="/home" component={Home} />
                <Redirect from="/" to="/login"/>
            </div>
        </Router>
    </MuiThemeProvider>
);
ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
