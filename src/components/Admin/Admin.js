import * as React from 'react';
import {Header} from '../Header';
import {Create} from './Create';
import {Delete} from './Delete';
import {Update} from './Update';
import { checkAdmin, currentUser } from '../../config/config';

const h1Style = {
  textAlign: 'center',
  marginBottom: '30px',
  marginTop: '20px'
};

export default class Admin extends React.Component {
    render() {
        if (checkAdmin(currentUser().uid)){
        return (
            <div>
                <Header />
                <h1 style={h1Style}> Panel de Administrador </h1>
                <Create />
                <br />
                <Delete />
                <Update />
            </div>
        )
        } else {
            return (
                <div>
                    <h1>You are not an admin</h1>
                </div>
            )
        }
    }
}
