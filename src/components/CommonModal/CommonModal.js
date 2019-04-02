import * as React from 'react';
import Modal from 'react-modal';


const customStyles = {
    content: { top: '10%', left: '40%', right: 'auto', bottom: 'auto' },
  };

export default class CommonModal extends React.Component {

    render() {
        const {shown, closeModal, title, subtitle, buttonText, onClick} = this.props;
        return (
            <Modal
          isOpen={shown}
          onRequestClose={closeModal}
          contentLabel="Selected option"
          closeTimeoutMS={200}
          style={customStyles}
        >
        <h2>{title}</h2>
        <p>{subtitle}</p>
        <button onClick={onClick}>{buttonText}</button>
        
        </Modal>
        )
    }
}