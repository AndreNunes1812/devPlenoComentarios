import React, { Component } from "react";

class SignUp extends Component {
  state = {
    email: "",
    passwd: ""
  };

  handleChange = field => event => {
    this.setState({
      [field]: event.target.value
    });
  };

  createAccount = () => {
    this.props.createAccount(this.state.email, this.state.passwd);
  };

  render() {
    const errorMessages = {
      "auth/wrong-password": "E-mail e/ou senha inválidos",
      "auth/user-not-found": "Usuário não encontrado.",
      "auth/invalid-email": "E-mail inválido",
      "auth/email-already-in-use": "E-mail já está em uso",
      "auth/weak-password": "Senha muito fraca."
    };
    return (
      <div>
        <h4>Criar Conta</h4>
        <form className="form-inline">
          <input
            type="text"
            className="form-control mr-1"
            onChange={this.handleChange("email")}
            placeholder="email"
          />
          <input
            type="password"
            className="form-control mr-1"
            onChange={this.handleChange("passwd")}
            placeholder="password"
          />
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.createAccount}
          >
            Criar conta
          </button>
          <button
            className="btn"
            onClick={() => this.props.changeScreen("login")}
          >
            já tenho uma conta, entrar!
          </button>
        </form>
        <div>
          {this.props.isSignUpError && (
            <div className="card text-white bg-danger mt-3">
              <div className="card-header">Erro ao criar uma nova conta</div>
              <div className="card-body">
                {errorMessages[this.props.signUpError]}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default SignUp;
