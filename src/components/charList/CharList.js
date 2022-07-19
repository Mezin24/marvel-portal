import { Component } from 'react/cjs/react.production.min';

import './charList.scss';
import MarvelServices from '../../services/MarvelServices';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

class CharList extends Component {
  state = {
    chars: [],
    loading: true,
    error: false,
  };

  marvelServices = new MarvelServices();

  componentDidMount = () => {
    this.updateChars();
  };

  updateChars = () => {
    this.marvelServices
      .getAllCharacters()
      .then((res) => this.setState({ loading: false, chars: res }))
      .catch(() => this.setState({ loading: false, error: true }));
  };

  render() {
    const loading = this.state.loading ? <Spinner /> : null;
    const error = this.state.error ? <ErrorMessage /> : null;

    const content = this.state.chars.length ? (
      <View chars={this.state.chars} />
    ) : null;

    return (
      <div className='char__list'>
        {loading}
        {error}
        {content}
      </div>
    );
  }
}

const View = ({ chars }) => {
  const charsList = chars.map(({ name, thumbnail }) => {
    const imgFit = /image_not_available/g.test(thumbnail)
      ? { objectFit: 'contain' }
      : null;

    return (
      <li key={name} className='char__item'>
        <img style={imgFit} src={thumbnail} alt='abyss' />
        <div className='char__name'>{name}</div>
      </li>
    );
  });

  return (
    <>
      <ul className='char__grid'>{charsList}</ul>
      <button className='button button__main button__long'>
        <div className='inner'>load more</div>
      </button>
    </>
  );
};

export default CharList;
