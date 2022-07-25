import { Component } from 'react/cjs/react.production.min';
import PropTypes from 'prop-types'; //

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
    // window.addEventListener('scroll', this.onScrollUpdate);
  };

  // componentWillUnmount = () => {
  //   window.removeEventListener('scroll', this.onScrollUpdate);
  // };

  // onScrollUpdate = () => {
  //   if (
  //     window.scrollY + document.documentElement.clientHeight >=
  //     document.documentElement.scrollHeight
  //   ) {
  //     // this.updateChars();
  //   }
  // };

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

class View extends Component {
  itemRefs = [];

  handleItemClick = (e, id) => {
    this.props.onSelectChar(id);
    this.itemRefs.forEach((item) =>
      item.classList.remove('char__item_selected')
    );
    e.target.closest('.char__item').classList.add('char__item_selected');
  };

  setItemRef = (elem) => {
    elem.setAttribute('tabindex', 0);
    this.itemRefs.push(elem);
  };

  keyDownSelectHandler = (e, id) => {
    if (e.key === 'Enter') {
      this.handleItemClick(e, id);
    }
  };

  render() {
    const { chars, updateChars, newItemLoading, endedItems } = this.props;
    const charsList = chars.map(({ name, thumbnail, id }) => {
      const imgFit = /image_not_available/g.test(thumbnail)
        ? { objectFit: 'unset' }
        : null;

      return (
        <li
          ref={this.setItemRef}
          key={id}
          className='char__item'
          onClick={(e) => this.handleItemClick(e, id)}
          onKeyDown={(e) => this.keyDownSelectHandler(e, id)}
        >
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
          <div className='inner'>
            {newItemLoading ? 'Loading....' : 'load more'}
          </div>
        </button>
      </>
    );
  }
}

CharList.propTypes = {
  onSelectChar: PropTypes.func,
};

export default CharList;
