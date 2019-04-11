import * as React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default class CommonModal extends React.Component {

    render() {
        const {shown, closeModal, title, subtitle, buttonText, onClick} = this.props;
        return (
          <Modal show={shown} onHide={closeModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{subtitle}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onClick}>
              {buttonText}
            </Button>
          </Modal.Footer>
        </Modal>
       
        )
    }
}