import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CardAlbum extends Component {
  render() {
    const { artistId,
      artistName,
      collectionId,
      collectionName,
      collectionPrice,
      artworkUrl100,
      releaseDate,
      trackCount } = this.props;

    return (
      <div>
        <ul>
          {artistId}
          {artistName}
          {collectionId}
          {collectionName}
          {collectionPrice}
          {artworkUrl100}
          {releaseDate}
          {trackCount}
        </ul>
      </div>
    );
  }
}
CardAlbum.propTypes = { // ajuda mentoria
  artistId: PropTypes.string.isRequired,
  artistName: PropTypes.string.isRequired,
  collectionId: PropTypes.string.isRequired,
  collectionName: PropTypes.string.isRequired,
  collectionPrice: PropTypes.string.isRequired,
  artworkUrl100: PropTypes.string.isRequired,
  releaseDate: PropTypes.string.isRequired,
  trackCount: PropTypes.string.isRequired,
};

export default CardAlbum;
