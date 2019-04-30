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
    const onSuccess = (payment) =>
      console.log('Successful payment!', payment);

    const onError = (error) =>
      console.log('Erroneous payment OR failed to load script!', error);

    const onCancel = (data) =>
      console.log('Cancelled payment!', data);

    return (
      <div>
        <PaypalButton
          client={CLIENT}
          env={ENV}
          commit={true}
          currency={'MXN'}
          total={this.props.totalPrice}
          onSuccess={onSuccess}
          onError={onError}
          onCancel={onCancel}
        />
      </div>
    );
  }
}

export default PaypalComponent;