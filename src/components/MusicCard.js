import React from 'react';
import { PropTypes } from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { music, player } = this.props;
    return (
      <div>
        <h4>{music}</h4>

        <audio data-testid="audio-component" src={ player } controls>

          <track kind="captions" />
        </audio>
      </div>

    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.string,
}.isRequired;

export default MusicCard;
