import React from 'react';
import './Login.css';
import { Card } from 'react-materialize';

class Login extends React.Component {

  //   goToStore(event) {
  //     event.preventDefault();
  //     console.log('You Changed the URL');
  //     // first grab the text from the box
  //     const storeId = this.storeInput.value;
  //     console.log(`Going to ${storeId}`)
  //     // second we're going to transition from / to /store/:storeId
  //     this.context.router.transitionTo(`/store/${storeId}`);
  //   }

  render() {
    // Any where else
    return (
      <div className="login full-screen">
        <div className="login__title">
          <h1>Alternative Hockey League</h1>
        </div>
        <div className="login__form-wrapper">
          <div className="login__form">
            <Card
              className='white center-align'
              title='Plese login to see your team'
              actions={[
                <a className="waves-effect waves-light btn-large social google"> <i className="fa fa-google"></i> Sign in with google</a>
              ]}>
            </Card>
          </div>
        </div>
      </div>
    )
  }
}

Login.contextTypes = {
  router: React.PropTypes.object
}

export default Login;
