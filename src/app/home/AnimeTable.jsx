import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import { useState } from "react";
import ModalComponent from "./ModalComponent";
import Image from "next/image";
import { deleteShow, updateShow } from "@/libs/api-methods";
import Link from "next/link";
import { toast } from "sonner";

const AnimeTable = ({ animeList }) => {
    const [open, setOpen] = useState(false);
    const [selectedAnime, setSelectedAnime] = useState(null);
    const [animeState, setAnimeState] = useState('');
    const [loading, setLoading] = useState(false);

    const handleModalOpen = (anime) => {
        setSelectedAnime(anime);
        setOpen(true);
    };
    const handleModalClose = () => setOpen(false);

    const handleChange = (event) => {
        setAnimeState(event.target.value);
    };

    async function handleClick(e) {
        e.preventDefault();
        setLoading(true);

        const updatedAnime = { ...selectedAnime, status: animeState };
        try {
            const { status, message } = await updateShow(updatedAnime);
            if (status !== 200) {
                alert(message);
            } else {
                toast.success(message);
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }
        } catch (error) {
            console.error('Error al actualizar anime:', error);
        }
    }

    const handleDelete = async (id) => {
        toast('¿Seguro que quieres borrar este show?', {
            action:{
              label: 'Borrar',
              onClick: () => {
                toast.promise(deleteShow(id), {
                  loading: 'Borrando...',
                  success: () => {
                    setTimeout(() => {
                      window.location.reload();
                    }, 2000);
                    return 'Show borrado correctamente';
                  },
                  error: 'Ocurrio un error inesperado al borrar el show',
                })      
              }
            }
          })
    };

    return (
        <table className="table-auto w-11/12 mx-auto border-collapse overflow-scroll">
            <thead>
                <tr className="text-center">
                    <th className="py-5 px-3 bg-tertiary">En emisión/viendo</th>
                    <th className="py-5 px-3 bg-tertiary">Esperando temporada</th>
                    <th className="py-5 px-3 bg-tertiary">Pausadas por mí</th>
                </tr>
            </thead>
            <tbody>
                <tr className="align-top">
                    <td className="bg-[#EADFDF] w-1/3">{renderAnimeCell(animeList.filter(anime => anime.status === 'En emisión'), handleDelete, handleModalOpen, handleModalClose, open, handleClick, loading, animeState, handleChange)}</td>
                    <td className="bg-[#D1CCCC] w-1/3">{renderAnimeCell(animeList.filter(anime => anime.status === 'Esperando temporada'), handleDelete, handleModalOpen, handleModalClose, open, handleClick, loading, animeState, handleChange)}</td>
                    <td className="bg-[#EADFDF] w-1/3">{renderAnimeCell(animeList.filter(anime => anime.status === 'Pausadas por mí'), handleDelete, handleModalOpen, handleModalClose, open, handleClick, loading, animeState, handleChange)}</td>
                </tr>
            </tbody>
        </table>
    );
};

const renderAnimeCell = (animes, handleDelete, handleModalOpen, handleModalClose, open, handleClick, loading, animeState, handleChange) => {
    return (
        <ul className="list-none p-0 m-0">
            {animes.map((anime) => (
                <li key={anime.id} className="flex items-center mb-2 flex-wrap">
                    <Image src={anime.image} alt={anime.title} width={50} height={70} className="mr-2" />
                    <div className="flex-1 relative">
                        <Link href={`https://www.crunchyroll.com/search?q=${encodeURIComponent(anime.title)}`} title="Buscar en Crunchyroll" target="_blank" rel="noreferrer" className="text-black hover:text-[#FF7F50]">
                            <strong className="text-xs md:text-lg mb-1 pr-5">{anime.title}</strong>
                        </Link>
                        <div className="flex flex-wrap gap-2 md:gap-0">
                            {anime.status === 'En emisión' ? (
                                <>
                                    <div className="bg-[#FF5C00] text-white rounded-full px-1 md:px-3 py-0.5 md:py-1 mr-7 text-xs md:text-base">
                                        <p>{anime.emision_day}</p>
                                    </div>
                                    <div className="bg-[#FF5C00] text-white rounded-full px-1 md:px-3 py-0.5 md:py-1 text-xs md:text-base">
                                        <p>{anime.genre}</p>
                                    </div>
                                </>
                            ) : (
                                <div className="bg-[#FF5C00] text-white rounded-full px-1 md:px-3 py-0.5 md:py-1 text-xs md:text-base">
                                    <p>{anime.genre}</p>
                                </div>
                            )}
                        </div>

                        <ModalComponent
                            open={open}
                            onClose={handleModalClose}
                            animeState={animeState}
                            handleChange={handleChange}
                            handleClick={handleClick}
                            loading={loading}
                        />
                    </div>
                    <div className="flex flex-col">
                        <IconButton aria-label="delete" className="p-0 hover:text-primary" title="Borrar anime" onClick={() => handleDelete(anime.id)}>
                            <DeleteIcon />
                        </IconButton>
                        <IconButton aria-label="move" className="p-0 hover:text-primary" title="Mover anime" onClick={() => handleModalOpen(anime)}>
                            <CompareArrowsIcon />
                        </IconButton>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default AnimeTable;
