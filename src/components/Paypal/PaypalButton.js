import React from 'react';
import ReactDOM from 'react-dom';
import scriptLoader from 'react-async-script-loader';

class PaypalButton extends React.Component {
  constructor(props) {
    super(props);
    window.React = React
    window.ReactDOM = ReactDOM
    this.state = {
      showButton: false,
    };

    window.React = React;
    window.ReactDOM = ReactDOM;
  }

  componentWillUnmount() {
    delete window.React
    delete window.ReactDOM
  }

  componentWillReceiveProps ({ isScriptLoaded, isScriptLoadSucceed }) {
    if (!this.state.showButton) {
      if (isScriptLoaded && !this.props.isScriptLoaded) { 
        if (isScriptLoadSucceed) {
          this.setState({ showButton: true })
        }
        else this.props.onError()
      }
    }
  }

  componentDidMount () {
    const { isScriptLoaded, isScriptLoadSucceed } = this.props
    if (isScriptLoaded && isScriptLoadSucceed) {
      this.setState({ showButton: true })
    }
  }

  render() {
    const {
      total,
      currency,
      env,
      commit,
      client,
      onSuccess,
      onError,
      onCancel,
    } = this.props;

    const {
      showButton,
    } = this.state;

    const payment = () =>
    window.paypal.rest.payment.create(env, client, {
      transactions: [
        {
          amount: {
            total,
            currency,
          }
        },
      ],
    });

  const onAuthorize = (data, actions) =>
    actions.payment.execute()
      .then(() => {
        const payment = {
          paid: true,
          cancelled: false,
          payerID: data.payerID,
          paymentID: data.paymentID,
          paymentToken: data.paymentToken,
          returnUrl: data.returnUrl,
        };

        onSuccess(payment);
      });
      if (showButton){
      const Btn = window.paypal.Button.react;
      return (
          <Btn
          env={env}
        client={client}
        commit={commit}
        payment={payment}
        onAuthorize={onAuthorize}
        onCancel={onCancel}
        onError={onError}
          />
      )
      }
    return (
      <div>
      loading  
      </div>
    );
  }

}

export default scriptLoader('https://www.paypalobjects.com/api/checkout.js')(PaypalButton);

/*
{showButton && <paypal.Button.react
          env={env}
          client={client}
          commit={commit}
          payment={payment}
          onAuthorize={onAuthorize}
          onCancel={onCancel}
          onError={onError}
        />}
        */