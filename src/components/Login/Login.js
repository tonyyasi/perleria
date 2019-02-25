import React from "react";
import {FontIcon, RaisedButton} from "material-ui";
import {loginWithGoogle} from "../../helpers/auth";
import {firebaseAuth } from "../../config/config";
import {logout} from "../../helpers/auth";
import {customHistory} from '../../index';
import { SignUpHeader } from "../SignUpHeader/SignupHeader";

const firebaseAuthKey = "firebaseAuthInProgress";
const appTokenKey = "appToken";

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.handleGoogleLogin = this.handleGoogleLogin.bind(this);
    }

    handleGoogleLogin() {
        loginWithGoogle()
            .catch(function (error) {
                alert(error); 
                localStorage.removeItem(firebaseAuthKey);
            });
        localStorage.setItem(firebaseAuthKey, "1");
    }

    componentWillMount() {  
        // We have appToken relevant for our backend API, redirect home
        if (localStorage.getItem(appTokenKey)) {
            customHistory.push("/home");
            return;
        } else {
        }

        firebaseAuth().onAuthStateChanged(user => {
            if (user) {

                localStorage.removeItem(firebaseAuthKey);
                // store key to avoid loging in everytime.
                localStorage.setItem(appTokenKey, user.uid);
                localStorage.setItem("currentUser",  JSON.stringify(user));

                customHistory.push("/home");
                } 
        });
    }

    render() {
        return <LoginPage handleGoogleLogin={this.handleGoogleLogin}/>;
    }
}

const iconStyles = {
    color: "#ffffff"
};
const LoginPage = ({handleGoogleLogin}) => (
    <div>
    <SignUpHeader />
        <div style={{position:'fixed', top:'50%', left:'50%', transform:'translate(-50%,-50%)', fontSize:'140%'}}>
        <h1>Bienvenido a Perleria!</h1>
            <RaisedButton
                label="Sign in with Google"
                labelColor={"#ffffff"}
                backgroundColor="#dd4b39"
                icon={<FontIcon className="fa fa-google-plus" style={iconStyles}/>}
                onClick={handleGoogleLogin}
            />
        </div>
    </div>
);