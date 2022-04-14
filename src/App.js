import React, { useEffect, useState} from 'react';
import './App.css';
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow/index.js';
import FeaturedMovie from './components/FeaturedMovie/index.js';
import Header from './components/Header/index.js';


export default() => {

  const [movieList, setMovieList] = useState([])
  const [featuredData, setFeaturedData] = useState();
  const [blackHeader, setBlackHeader] = useState(false);

    useEffect(() => {
      const loadAll = async() =>{
        //Pegando a lista total
        let list = await Tmdb.getHomeList();
        setMovieList(list);

        //Pegando o Featured(filme em destaque)
        let originals = list.filter(i=>i.slug === 'originals');
        let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length -1));
        let chosen = originals[0].items.results[randomChosen];
        let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
        setFeaturedData(chosenInfo);
      }

      //chamando a função de pegar a lista total
      loadAll();
    }, []);

    useEffect(() => {
      const scrollListener = () => {
          if(window.scrollY > 10){
            setBlackHeader(true)
          } else {
            setBlackHeader(false)
          }
      }

      window.addEventListener('scroll', scrollListener);

      return () => {
        window.removeEventListener('scroll', scrollListener);
      }
    }, []);

  return(
    <div className='page'>

      <Header black={blackHeader}/>

      {featuredData &&
        <FeaturedMovie item={featuredData}/>
      }  

      <section className='lists'>
        {movieList.map((item, key) =>(
          <MovieRow key={key} title={item.title} items={item.items}/>
        ))}
      </section>

      <footer>
        <p>Feito com <span role="img" aria-label='coração'>❤ por Maria</span></p>
        <p>Direito de imagem para Netflix<br/></p>
        <p>API do site Themoviedb.org</p>
        <p>Projeto baseado em B7Web</p>
      </footer>

      {movieList.length <= 0 &&
      <div className='loading'>
          <img src="htps://www.filmelier.com/pt/br/news/wp-content/uploads/2020/03/netflix-loading.gif" alt="Carregando" />
      </div>
    }
    </div>
  );
}