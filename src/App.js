import React, { useEffect, useState } from 'react';
import './App.css';
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';

const App = () => {

    const [movieList, setMovieList] = useState([]);
    const [featuredData, setFeaturedData] = useState(null);
    const [blackHeader, setBlackHeader] = useState(false);

    useEffect(() => {
        const loadAll = async () => {
            // Pegando a lista total
            let list = await Tmdb.getHomeList();
            setMovieList(list);

            // Pega somente os filmes originais do Netflix
            let originals = list.filter(item => item.slug === 'originals');

            // Pega um item aleatóriamente da lista de originais
            let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
            let chosen = originals[0].items.results[randomChosen];
            let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
            setFeaturedData(chosenInfo);

        }


        loadAll();
    }, []);

    useEffect(() => {
        const scrollListener = () => {
            if (window.scrollY > 10) {
                setBlackHeader(true);
            } else {
                setBlackHeader(false);
            }
        }

        window.addEventListener('scroll', scrollListener);

        return () => {
            window.removeEventListener('scroll', scrollListener);
        }
    }, []);

    return (
        <div className="page">
            <Header black={blackHeader} />

            {featuredData &&
                <FeaturedMovie item={featuredData} />
            }

            <section className="lists">
                {movieList.map((item, key) => (
                    <div key={key}>
                        <MovieRow key={key} title={item.title} items={item.items} />
                    </div>
                ))}
            </section>

            <footer>
                Feito com <span role="img" aria-label="coração">❤️</span> por Fernando S. Claro<br />
                Direitos de imagem para Netflix<br />
                Dados pegos do site Themoviedb.org
            </footer>

            {movieList.length <= 0 &&
                <div className="loading">
                    <img src="netflix-loading.gif" alt="Carregando" />
                </div>
            }
        </div>
    );
}

export default App;
