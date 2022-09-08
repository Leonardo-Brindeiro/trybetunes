import React from 'react';
import { PropTypes } from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  state = {
    carregando: false,
    checked: false,
  };

  adicionarSong = async (favorits) => {
    console.log(favorits);
    const { favoritas } = this.props;
    if (favorits.target.checked === true) {
      this.setState({ carregando: true });
      await addSong(favoritas);
      this.setState({ carregando: false, checked: true });
    }
  };

  render() {
    const { music, player, trackId } = this.props;
    const { carregando, checked } = this.state;
    return (
      <div>
        {carregando ? <Loading /> : (
          <>
            <h4>{music}</h4>
            <audio data-testid="audio-component" src={ player } controls>

              <track kind="captions" />
            </audio>
            <label htmlFor="musicas">
              Favorita
              <input
                type="checkbox"
                data-testid={ `checkbox-music-${trackId}` }
                onChange={ this.adicionarSong }
                checked={ checked }
              />
            </label>
          </>
        )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.string,
}.isRequired;

export default MusicCard;
