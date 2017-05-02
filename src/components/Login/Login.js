import React from 'react';
import './Login.css';
import { Card } from 'react-materialize';
import base from '../../base';

class Login extends React.Component {

  constructor() {
    super();
    this.authenticate = this.authenticate.bind(this);
    this.logout = this.logout.bind(this);
    this.authHandler = this.authHandler.bind(this);

    this.state = {
      uid: null,
      owner: null,
      user:{
        groups: {}
      }
    }
  }

  componentDidMount() {
    base.onAuth((user) => {
      if (user) {
        this.authHandler(null, { user });
      }
    });
  }

  authenticate(provider) {
    console.log(`Trying to log in with ${provider}`);
    base.authWithOAuthPopup(provider, this.authHandler);
  }

  logout() {
    base.unauth();
    this.setState({ uid: null });
  }

  authHandler(err, authData) {
    if (err) {
      console.error(err);
      return;
    }

    // grab the store info
    const usersRef = base.database().ref('users');

    // query the firebase once for the user
    usersRef.once('value', (snapshot) => {
      const users = snapshot.val() || {};

      if (!users[authData.user.uid]) {
        usersRef.child(authData.user.uid).set({
          provider: authData.credential.provider,
          email: authData.user.email,
          name: authData.user.displayName
        })
      }

      this.setState({
        uid: authData.user.uid,
        displayName: authData.user.displayName,
        user: users[authData.user.uid]
      });
    });
  }

  render() {
    let card;

    if (!this.state.uid) {
      card = (
        <Card
          className='white center-align'
          title='Please login to see your team'
          actions={[
           <div>
              <a className="waves-effect waves-light btn-large social google"
               onClick={() => this.authenticate('google')}> <i className="fa fa-google"></i> Sign in with google</a>
               <a className="waves-effect waves-light btn-large"
               onClick={() => this.logout()}> <i className="fa fa-exit"></i> Logout</a>
           </div>
          ]}>
        </Card>
      )
    }
    else {
      card = (
        <Card
          className='white center-align'
          title={`Welcome to AHL ${this.state.user.name}`}
          actions={[
            <a className="waves-effect waves-light btn-large"
              onClick={() => this.logout()}> <i className="fa fa-exit"></i> Logout</a>
          ]}>
        </Card>
      )
    }


    // Any where else
    return (
      <div className="login full-screen">
        <div className="login__title">
          <h1>Fencing Ireland Rankings App</h1>
        </div>
        <div className="login__form-wrapper">
          <div className="login__form">
            {card}
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
