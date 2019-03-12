import * as React from 'react';
import {Header} from '../Header';
import {Create} from './Create';
import {Delete} from './Delete';

const h1Style = {
  textAlign: 'center',
  marginBottom: '30px',
  marginTop: '20px'
};

export default class Admin extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <h1 style={h1Style}> Panel de Administrador </h1>
                <Create />
                <br />
                <Delete />
            </div>
        )
    }
}
