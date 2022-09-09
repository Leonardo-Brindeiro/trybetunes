import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends Component {
  state = {
    loading: false,
    favorites: [],
  }; // ajuda da Cristiane kizelevicius turma 24b

  async componentDidMount() {
    await this.somFavoritoMetallica();
  }

  somFavoritoMetallica = async () => {
    const recuperar = await getFavoriteSongs();
    this.setState({
      favorites: recuperar,
    });
  };

  favoritar = async ({ target }) => {
    const { trackName, previewUrl, trackId } = this.props;
    this.setState({
      loading: true,
    });
    if (target.checked) {
      await addSong({
        previewUrl,
        trackId,
        trackName,
      });
    } else {
      this.removeSong();
    }
    await this.somFavoritoMetallica();
    this.setState({
      loading: false,
    });
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { loading, favorites } = this.state;
    return (
      <div>
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor="favorite">
          Favorita
          <input
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            name="favorite"
            onChange={ this.favoritar }
            checked={ favorites.some((e) => e.trackId === trackId) }
          />
          {loading && <Loading />}

        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.string.isRequired,
};
