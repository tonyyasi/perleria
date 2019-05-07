import React from 'react';
import PaypalButton from './PaypalButton';

const CLIENT = {
  sandbox: process.env.REACT_APP_SANDBOX_URL,
  production: process.env.REACT_APP_LIVE_URL,
};

const ENV = process.env.NODE_ENV === 'production'
  ? 'production'
  : 'sandbox';

class PaypalComponent extends React.Component {
  render() {
    return (
      <div>
        <PaypalButton
          client={CLIENT}
          env={ENV}
          commit={true}
          currency={'MXN'}
          total={this.props.totalPrice}
          onSuccess={this.props.onSuccess}
          onError={this.props.onError}
          onCancel={this.props.onCancel}
        />
      </div>
    );
  }
}

export default PaypalComponent;