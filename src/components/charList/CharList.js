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
    offset: 210,
    newItemLoading: false,
  };

  marvelServices = new MarvelServices();

  componentDidMount = () => {
    this.updateChars();
  };

  updateChars = () => {
    this.onCharLoading();
    this.marvelServices
      .getAllCharacters(this.state.offset)
      .then(this.onCharLoaded)
      .catch(this.onError);
  };

  onCharLoaded = (newChars) => {
    let ended = false;
    if (newChars.length < 9) {
      ended = true;
    }

    this.setState(({ chars, offset }) => ({
      loading: false,
      chars: [...chars, ...newChars],
      offset: offset + 9,
      newItemLoading: false,
      endedItems: ended,
    }));
  };

  onCharLoading = () => {
    if (this.state.chars.length > 0) {
      this.setState({ newItemLoading: true });
      return;
    }

    this.setState({ loading: true });
  };

  onError = () => {
    this.setState({ loading: false, error: true });
  };

  render() {
    const loading = this.state.loading ? <Spinner /> : null;
    const error = this.state.error ? <ErrorMessage /> : null;

    const content = this.state.chars.length ? (
      <View
        chars={this.state.chars}
        onSelectChar={this.props.onSelectChar}
        updateChars={this.updateChars}
        newItemLoading={this.state.newItemLoading}
        endedItems={this.state.endedItems}
      />
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

const View = ({
  chars,
  onSelectChar,
  updateChars,
  newItemLoading,
  endedItems,
}) => {
  const charsList = chars.map(({ name, thumbnail, id }) => {
    const imgFit = /image_not_available/g.test(thumbnail)
      ? { objectFit: 'unset' }
      : null;

    return (
      <li key={id} className='char__item' onClick={() => onSelectChar(id)}>
        <img style={imgFit} src={thumbnail} alt='abyss' />
        <div className='char__name'>{name}</div>
      </li>
    );
  });

  return (
    <>
      <ul className='char__grid'>{charsList}</ul>
      <button
        onClick={updateChars}
        className='button button__main button__long'
        disabled={newItemLoading}
        style={{ display: !endedItems ? 'block' : 'none' }}
      >
        <div className='inner'>load more</div>
      </button>
    </>
  );
};

export default CharList;
