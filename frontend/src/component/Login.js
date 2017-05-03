import React, {Component} from 'react';

class Login extends Component {
  state = {
    name:'',
    email:'',
    password:''
  }

  login = () => {
    fetch('/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      })
    }).then(function(response) {
      return response.json()
    }).then(function(json) {
      localStorage.setItem('token',JSON.stringify(json));
    }).catch(function(ex) {
      console.log('parsing failed', ex)
    })
  }

  register = () => {
    fetch('/v1/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
      })
    }).then(function(response) {
      return response.json()
    }).then(function(json) {
      console.log('parsed json', json)
    }).catch(function(ex) {
      console.log('parsing failed', ex)
    })
  }

  render() {
    return (
      <div className="container">
        <div className="col-md-4 col-md-offset-4">
          <h2 className="form-signin-heading">Lütfen giriş yapın</h2>
          <div className="form-group">
            <input type="text" className="form-control" placeholder="İsminiz" value={this.state.name} onChange={(e)=>{this.setState({name:e.target.value})}}/>
          </div>
          <div className="form-group">
            <input type="email" className="form-control" placeholder="E-posta adresiniz" value={this.state.email} onChange={(e)=>{this.setState({email:e.target.value})}}/>
          </div>
          <div className="form-group">
            <input type="password" className="form-control" placeholder="Parolanız"  value={this.state.password} onChange={(e)=>{this.setState({password:e.target.value})}}/>
          </div>
          <button className="btn btn-primary btn-block" onClick={this.login}>Giriş Yap</button>
          <button className="btn btn-primary btn-block" onClick={this.register}>Kayıt Ol</button>
        </div>
    </div>
    );
  }
}

export default Login;
