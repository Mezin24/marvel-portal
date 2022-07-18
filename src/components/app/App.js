import AppHeader from '../appHeader/AppHeader';
import RandomChar from '../randomChar/RandomChar';
import CharList from '../charList/CharList';
import CharInfo from '../charInfo/CharInfo';
import MarvelServices from '../../services/MarvelServices';

import decoration from '../../resources/img/vision.png';

new MarvelServices()
  .getResourse()
  .then((res) => res.data.results.forEach((item) => console.log(item.id)));

new MarvelServices().getCharacter(1011196).then((res) => console.log(res));

const App = () => {
  return (
    <div className='app'>
      <AppHeader />
      <main>
        <RandomChar />
        <div className='char__content'>
          <CharList />
          <CharInfo />
        </div>
        <img className='bg-decoration' src={decoration} alt='vision' />
      </main>
    </div>
  );
};

export default App;
