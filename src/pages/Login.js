import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      disabled: true,
      username: '',
      loading: false,
      redirect: false,
    };
  }

  mudandoBotao = ({ target }) => {
    const minimoDeDigitação = 3;
    const validacao = target.value.length < minimoDeDigitação;
    if (validacao) {
      this.setState(
        {
          disabled: true, // mentoria
          username: target.value,
        },
      );
    } else {
      this.setState(
        {
          disabled: false, // vou mudar o estado do meu botão!
          username: target.value,
        },
      );
    }
  };

  botãoClick = () => {
    const { username } = this.state;
    this.setState({ loading: true }, async () => {
      await createUser({ name: username });
      this.setState({ redirect: true });
    });
  };

  render() {
    const { disabled, username, loading, redirect } = this.state;

    return (
      <div data-testid="page-login">
        <form>
          <p>Login</p>
          <input
            data-testid="login-name-input"
            type="text"
            onChange={ this.mudandoBotao }
            value={ username }
          />
          <button // esse é um quadradinho que serve ded botao
            type="button"
            data-testid="login-submit-button"
            disabled={ disabled }
            onClick={ this.botãoClick } // coloquei um click que vai receber a minha função botão click acima
          >
            Entrar
          </button>
        </form>
        { loading && <Loading /> }
        { redirect && <Redirect to="/search" /> }
      </div>
    );
  }
}
export default Login;
