import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  state = {
    albums: '',
    cantor: '',
    music: [],

  };

  componentDidMount() {
    this.audio();
  }

  audio = async () => {
    const { match: { params: { id } } } = this.props;
    const musicApi = await getMusics(id);
    this.setState({
      albums: musicApi[0].collectionName,
      cantor: musicApi[0].artistName,
      music: musicApi.filter((_e, indice) => indice !== 0),
    });
    console.log(musicApi);
  };

  render() {
    const { albums, cantor, music } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h1 data-testid="album-name">
          {albums}
        </h1>
        <h2 data-testid="artist-name">
          {cantor}
        </h2>
        {music.map((e, i) => (<MusicCard
          key={ i }
          music={ e.trackName }
          player={ e.previewUrl }
        />))}
      </div>
    );
  }
}
Album.propTypes = { // ajuda mentoria o shape é a tipagem do objeto
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
