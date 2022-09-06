import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component { // ajuda da cris
  state = {
    name: '',
    loading: true,
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const name = await getUser();
    this.setState({ name: `Olá, ${name.name}`, loading: false });
  }

  render() {
    const { name, loading } = this.state;
    return (loading ? <Loading /> // se não for loading carrega os meus loads se não passa pros nomes
      : (
        <header>
          <div data-testid="header-component">
            <p data-testid="header-user-name">{name}</p>
            <button type="button">
              <Link to="/search" data-testid="link-to-search">Search</Link>
            </button>
            <button type="button">
              <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
            </button>
            <button type="button">
              <Link to="/profile" data-testid="link-to-profile">Profile</Link>
            </button>
          </div>
        </header>)

    );
  }
}

export default Header;
