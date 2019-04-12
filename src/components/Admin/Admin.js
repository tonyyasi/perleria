import * as React from 'react';
import {Header} from '../Header';
import {Create} from './Create';
import {Delete} from './Delete';
import {Update} from './Update';
import { database, currentUser } from '../../config/config';
import Table from 'react-bootstrap/Table'
import CommonModal from './../CommonModal/CommonModal';
import {Button} from 'react-bootstrap';
import ButtonGroup from 'react-bootstrap/ButtonGroup'

const h1Style = {
  textAlign: 'center',
  marginBottom: '30px',
  marginTop: '20px'
};

const sImage = {
  maxHeight: '100px',
  maxWidth: '100px',
  borderRadius: '20px',
}

const contentStyle = {
    padding: '100px'
}

export default class Admin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedId: "",
            items: [],
            showAdmin: false,
            deleteModalShown: false,
            updateModalShown: false,
            createModalShown: false,
            modalTitle: "",
        }

        this.handleEdit = this.handleEdit.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentWillMount(){
      let databaseRef = database.ref("productos/");
      var previousProducts = [];
      databaseRef.on('child_added', snap => {
        previousProducts.push({
            id: snap.key,
            name: snap.val().name,
            description: snap.val().description,
            price: snap.val().price,
            image: snap.val().imageURL,
            category: snap.val().category,
            stock: snap.val().stock
        })
        this.setState({ items: previousProducts});
      })

      databaseRef.on('child_removed', snap => {
        for (let i = 0; i < previousProducts.length; i++)
          if (previousProducts[i].id === snap.key)
            previousProducts.splice(i, 1);
        this.setState({ items: previousProducts});
      })
    }

    componentDidMount() {
        this.reviseAdmin(currentUser().uid);
    }

    showModal = (title, modalType) => {
        let deleteModal = modalType === "delete" ? true : false;
        let updateModal = modalType === "edit" ? true : false;
        let createModal = modalType === "create" ? true : false;
        this.setState({
            modalTitle: title,
            deleteModalShown: deleteModal,
            updateModalShown: updateModal,
            createModalShown: createModal
        });
      };

    closeModal = () => {
        this.setState({
            deleteModalShown: false,
            updateModalShown: false,
            createModalShown: false
        });
    };

    reviseAdmin = (id) => {
        database.ref(`admins/${id}`).once('value').then((snapshot) => {
            const showAdmin = snapshot.val();
            this.setState({showAdmin});
        });
    }

    handleEdit(id) {
        this.setState({selectedId: id});
        this.showModal("Editar producto", "edit");
    }

    handleCreate() {
        this.showModal("Nuevo producto", "create");
    }

    handleDelete(id) {
        let databaseRef = database.ref("productos/");
        databaseRef.child(id).remove().then(() => {
            this.showModal("Producto eliminado!", "delete");
        })
    }

    render() {
        if (this.state.showAdmin){
            const {items} = this.state
            const itemList = items.map(item => {
                return (
                    <tr>
                        <td> <img src={item.image} style={sImage}/> </td>
                        <td> {item.name} </td>
                        <td> {item.description} </td>
                        <td> {item.category} </td>
                        <td> ${item.price} </td>
                        <td> {item.stock} </td>
                        <td>
                            <ButtonGroup>
                            <Button variant="primary" onClick={()=>{this.handleEdit(item.id)}}>
                              Editar
                            </Button>
                            <Button variant="primary" onClick={()=>{this.handleDelete(item.id)}}>
                              Eliminar
                            </Button>
                            </ButtonGroup>
                        </td>
                    </tr>
                  )
            })
            return (
                <div>
                    <Header />
                    <h1 style={h1Style}> Panel de Administrador </h1>

                    <div style={contentStyle}>
                        <Button variant="primary" onClick={()=>{this.handleCreate()}}>
                            Nuevo
                        </Button>
                        <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>Imagen</th>
                              <th>Nombre</th>
                              <th>Descripción</th>
                              <th>Categoría</th>
                              <th>Precio</th>
                              <th>Cantidad</th>
                              <th>Acción</th>
                            </tr>
                          </thead>
                          <tbody>
                            {itemList}
                          </tbody>
                        </Table>
                    </div>
                    <CommonModal shown={this.state.deleteModalShown}  closeModal={this.closeModal} title={this.state.modalTitle} subtitle={"El producto se eliminó correctamente"} buttonText={"Cerrar"} onClick={this.closeModal} />
                    <CommonModal shown={this.state.updateModalShown}  closeModal={this.closeModal} title={this.state.modalTitle} subtitle={<Update id={this.state.selectedId} />} buttonText={"Cerrar"} onClick={this.closeModal} />
                    <CommonModal shown={this.state.createModalShown}  closeModal={this.closeModal} title={this.state.modalTitle} subtitle={<Create />} buttonText={"Cerrar"} onClick={this.closeModal} />
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
