import { Component } from 'react/cjs/react.production.min';
import Skeleton from '../skeleton/Skeleton';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './charInfo.scss';
import MarvelServices from '../../services/MarvelServices';

class CharInfo extends Component {
  state = {
    char: null,
    loading: false,
    error: false,
  };

  marvelService = new MarvelServices();

  componentDidMount = () => {
    this.updateChar();
  };

  componentDidUpdate = (prevProps) => {
    if (this.props.charId !== prevProps.charId) {
      this.updateChar();
    }
  };

  onCharLoading = () => {
    this.setState({ loading: true });
  };

  onError = () => {
    this.setState({ error: true, loading: false });
  };

  updateChar = () => {
    const { charId } = this.props;

    if (!charId) return;

    this.onCharLoading();
    this.marvelService
      .getCharacter(this.props.charId)
      .then(this.onCharLoaded)
      .catch(this.onError);
  };

  onCharLoaded = (char) => {
    this.setState({ char, loading: false });
  };

  render() {
    const { char, loading, error } = this.state;

    const skeleton = char || loading || error ? null : <Skeleton />;
    const spinner = loading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;
    const content = !(loading || error || !char) ? <View char={char} /> : null;

    return (
      <div className='char__info'>
        {skeleton}
        {spinner}
        {errorMessage}
        {content}
      </div>
    );
  }
}

const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki, comics } = char;

  const imgFit = /image_not_available/g.test(thumbnail)
    ? { objectFit: 'contain' }
    : null;

  return (
    <>
      <div className='char__basics'>
        <img src={thumbnail} alt={name} style={imgFit} />
        <div>
          <div className='char__info-name'>{name}</div>
          <div className='char__btns'>
            <a href={homepage} className='button button__main'>
              <div className='inner'>homepage</div>
            </a>
            <a href={wiki} className='button button__secondary'>
              <div className='inner'>Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className='char__descr'>{description} </div>
      <div className='char__comics'>Comics:</div>
      {comics.length > 0 ? (
        <ul className='char__comics-list'>
          {[...comics].splice(0, 10).map((item) => {
            return (
              <li key={item.name} className='char__comics-item'>
                {item.name}
              </li>
            );
          })}
        </ul>
      ) : (
        <p>Sorry, no information about comics</p>
      )}
    </>
  );
};

export default CharInfo;
