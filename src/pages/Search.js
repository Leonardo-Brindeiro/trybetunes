import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';
import CardAlbum from '../components/CardAlbum';

class Search extends Component {
  state = {
    artist: '',
    isDisabled: true,
    carregando: false,
    artista: [],
    metallica: '',
    vazio: false,
  }; // passando o estado

  onInputChange = ({ target }) => { // recebendo o evento de digitar que vai ter o valor que o usuario esta digitando
    this.setState({
      [target.name]: target.value,
    }, this.checkInput); // sem essa função eu não consigo digitar nada no meu input
  };

  searchAlbum = async () => {
    const { artist } = this.state;
    this.setState({ carregando: true, metallica: artist });
    const metal = await searchAlbumsAPI(artist);
    if (metal.length === 0) {
      this.setState({ vazio: true });
    }
    this.setState({ artist: '', artista: metal, carregando: false });
  };

  checkInput = () => {
    const { artist } = this.state;
    const min = 2;
    this.setState({ isDisabled: artist.length < min });
  };

  render() {
    const { artist, isDisabled, carregando, artista, metallica, vazio } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {carregando ? <Loading /> : (
          <form>
            <label htmlFor="artist">
              Nome do Artista
              <input
                type="text"
                data-testid="search-artist-input"
                name="artist"
                id="artist"
                value={ artist }
                onChange={ this.onInputChange }
              />
            </label>
            <button
              type="button"
              data-testid="search-artist-button"
              disabled={ isDisabled }
              onClick={ this.searchAlbum }

            >
              Pesquisar
            </button>
          </form>
        )}
        {metallica && <p>{`Resultado de álbuns de: ${metallica}`}</p>}
        {vazio && <p>Nenhum álbum foi encontrado</p>}
        {artista.map((m) => (
          <Link
            to={ `/album/${m.collectionId}` }
            data-testid={ `link-to-album-${m.collectionId}` }
            key={ m.collectionId }
          >
            <CardAlbum
              key={ m.collectionId }
              artistId={ m.artistId }
              artistName={ m.artistName }
              collectionId={ m.collectionId }
              collectionName={ m.collectionName }
              collectionPrice={ m.collectionPrice }
              artworkUrl100={ m.artworkUrl100 }
              releaseDate={ m.releaseDate }
              trackCount={ m.trackCount }

            />

          </Link>))}

      </div>

    );
  }
}

export default Search;
