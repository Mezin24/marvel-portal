import { Component } from 'react/cjs/react.production.min';

import MarvelServices from '../../services/MarvelServices';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

class RandomChar extends Component {
  state = {
    char: {},
    loading: true,
    error: false,
  };

  marvelService = new MarvelServices();

  componentDidMount = () => {
    this.updateChar();
  };

  onChatLoaded = (char) => {
    this.setState({ char, loading: false });
  };

  onError = () => {
    this.setState({ loading: false, error: true });
  };

  updateChar = () => {
    const randomId = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    this.marvelService
      .getCharacter(randomId)
      .then((res) => this.onChatLoaded(res))
      .catch(() => this.onError());
  };

  onChangeChar = () => {
    this.setState({ loading: true });
    this.updateChar();
  };

  render() {
    const { char, loading, error } = this.state;

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(error || loading) ? <View char={char} /> : null;

    return (
      <div className='randomchar'>
        {errorMessage}
        {spinner}
        {content}
        <div className='randomchar__static'>
          <p className='randomchar__title'>
            Random character for today!
            <br />
            Do you want to get to know him better?
          </p>
          <p className='randomchar__title'>Or choose another one</p>
          <button className='button button__main' onClick={this.onChangeChar}>
            <div className='inner'>try it</div>
          </button>
          <img src={mjolnir} alt='mjolnir' className='randomchar__decoration' />
        </div>
      </div>
    );
  }
}

const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki } = char;

  let descr = 'Sorry, no information about this character';

  if (description) {
    descr = description;
  }

  if (descr.length > 150) {
    descr = descr.slice(0, 150) + '...';
  }

  const imgFit = /image_not_available/g.test(thumbnail)
    ? { objectFit: 'contain' }
    : null;
  // http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg
  return (
    <div className='randomchar__block'>
      <img
        style={imgFit}
        src={thumbnail}
        alt='Random character'
        className='randomchar__img'
      />
      <div className='randomchar__info'>
        <p className='randomchar__name'>{name}</p>
        <p className='randomchar__descr'>{descr}</p>
        <div className='randomchar__btns'>
          <a href={homepage} className='button button__main'>
            <div className='inner'>homepage</div>
          </a>
          <a href={wiki} className='button button__secondary'>
            <div className='inner'>Wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RandomChar;
