import React from 'react';
import './Login.css';
import { Redirect } from 'react-router-dom';
import { Preloader } from 'react-materialize';
import base from '../../base';

class Login extends React.Component {

  constructor() {
    super();
    this.authenticate = this.authenticate.bind(this);
    this.authHandler = this.authHandler.bind(this);
    this.renderCardContents = this.renderCardContents.bind(this);

    this.state = {
      authed: false,
      loading: true,
      uid: null
    }
  }

  componentWillUnmount() {
    this.removeListener()
  }

  componentDidMount() {
    this.removeListener = base.onAuth((user) => {
      if (user) {
        this.setState({ authed: true, loading: false });
      }
      else {
        this.setState({ authed: false, loading: false });
      }
    })
  }



  authenticate(provider) {
    console.log(`Trying to log in with ${provider}`);
    base.authWithOAuthPopup(provider, this.authHandler);
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

  renderCardContents() {

    if (this.state.loading) {
      return (<Preloader size='small' />)
    }
    else {
    return (
      <a className="waves-effect waves-light btn-large social google"
        onClick={() => this.authenticate('google')}>
        <i className="fa fa-google"></i> Sign in with google
      </a>
    );
    }


  }

  render() {

    if (this.state.authed) {
      return (<Redirect to="/"/>)
    }

    return (
      <div className="login full-screen">
        <div className="login__title">
          <h1>Fencing Ireland Rankings App</h1>
        </div>
        <div className="login__form-wrapper">
          <div className="login__form">
            <div className="white center-align card">
              <div className="card-content">
                <span className="card-title grey-text text-darken-4">Please login to see your team</span>
              </div>
              <div className="card-action">
                {this.renderCardContents()}
              </div>
            </div>
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
