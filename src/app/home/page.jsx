'use client';
import { getProtected, getUserShows } from "@/libs/api-methods";
import { useEffect, useState } from "react";
import { dayTranslations, genreTranslations } from "./Diccionarios";
import AnimeTable from "./AnimeTable";
import AnimeForm from "./AnimeForm";
//import { cookies } from "next/headers";

function Home() {
    const [animeForm, setAnimeForm] = useState(false);
    const [userId, setUserId] = useState(null);
    const [animeList, setAnimeList] = useState([
        { id: null, title: "", image: "", genre: "", emision_day: "", status: "", user_id: null },
    ]);
    const [isAnimeListInitialized, setIsAnimeListInitialized] = useState(false);

    useEffect(() => {
        const showAnimes = async () => {
            const response = await getProtected();
            setUserId(response.data.id);
            const value = await getUserShows(response.data.id);
            if (value.founded) {
                const animeResponse = value.data;
                const animes = animeResponse.map((anime) => ({
                    id: anime.id,
                    title: anime.title,
                    image: anime.image,
                    genre: genreTranslations[anime.genre] || anime.genre,
                    emision_day: dayTranslations[anime.emision_day] || anime.emision_day,
                    status: anime.status,
                    user_id: anime.user_id
                }));
                setAnimeList(animes);
                setIsAnimeListInitialized(true);
            }
        };

        if (!isAnimeListInitialized) {
            showAnimes();
        }
    }, [isAnimeListInitialized]);

    const handleForm = () => {
        document.body.classList.add('modal-open');
        setAnimeForm(!animeForm);
    }

    return (
        <div className="h-screen">
            <div className="md:flex relative justify-center w-11/12 mx-auto my-11">
                <h1 className="text-white md:text-center">Lista de Animes</h1>
                <button
                    onClick={handleForm}
                    className="md:absolute md:right-0 md:top-1/3 rounded-lg border-0 text-white bg-secondary py-3 px-4 cursor-pointer hover:bg-primary"
                >
                    Agregar anime
                </button>
            </div>
            <AnimeTable animeList={animeList} />
            {animeForm &&
                <AnimeForm setAnimeForm={setAnimeForm} userId={userId} />
            }
        </div>
    );
}

export default Home;