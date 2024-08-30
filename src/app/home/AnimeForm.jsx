import { useEffect, useState } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Autocomplete, Box, TextField } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import Image from "next/image";
import { saveShow } from "@/libs/api-methods";

// eslint-disable-next-line react/prop-types
const AnimeForm = ({ setAnimeForm, userId }) => {
    //Form
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const defaultProps = {
        options: results || [], // Garantiza que options no sea undefined
        getOptionLabel: (option) => option ? option.title || '' : '', // Maneja casos en los que option es undefined o no tiene una propiedad title
    };

    const handleAutocompleteChange = (event, value, reason) => {
        if (reason === 'input') {
            setQuery(value);
        }
    };

    //Dropdown de estado
    const [animeState, setAnimeState] = useState('');

    const handleChange = (event) => {
        setAnimeState(event.target.value);
    };

    //Boton enviar
    const [loading, setLoading] = useState(false);
    const handleClick = async (e) => {
        // Aquí puedes enviar la información de 'selectedAnime' a través de una API y guardarla en la base de datos.
        // Por ejemplo, puedes utilizar fetch para enviar una solicitud POST a tu API.
        e.preventDefault();
        if(query.trim() !== ''){
            try {
                // Realizar la llamada a la API con la consulta actual.
                const response = await fetch(`https://api.jikan.moe/v4/anime?type=tv&q=${query}`);
                let data = await response.json();
                data = data.data[0]
                // Actualizar el estado con los resultados.
                const anime = { title: data.title, genre: data.genres[0].name, image: data.images.webp.image_url, emision_day: data.broadcast.day, status: animeState, user_id: userId };
                console.log(anime)
                setLoading(true);
                //Enviar "anime" a una funcion del UserContext para almecenarlo en la base de datos
                const { status, message } = await saveShow(anime);
                alert(message);
                setLoading(false);
                window.location.reload();
            } catch (error) {
                console.error('Error al buscar anime:', error);
                // Manejar el error según sea necesario.
            }

        }else{
            alert('Ingresa un anime para agregarlo');
        }
    }

    //cerrar el form
    const handleCloseForm = () => {
        document.body.classList.remove('modal-open');
        setAnimeForm(false);
      };

    useEffect(() => {
        const searchAnime = async () => {
            try {
                // Realizar la llamada a la API con la consulta actual.
                const response = await fetch(`https://api.jikan.moe/v4/anime?type=tv&q=${query}`);
                const data = await response.json();
                // Actualizar el estado con los resultados.
                setResults(data.data || []);
            } catch (error) {
                console.error('Error al buscar anime:', error);
                // Manejar el error según sea necesario.
            }
        };

        // Llamar a la función de búsqueda solo si la consulta no está vacía.
        if (query.trim() !== '') {
            searchAnime();
        } else {
            setResults([])
        }
    }, [query]);

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-10">
            <form
                className="bg-gray-300 rounded-3xl max-w-md w-full max-h-[90%] overflow-y-auto p-6 relative"
                onSubmit={handleClick}
                method="post"
            >
                <h2 className="text-black text-center pt-6">AGREGAR ANIME</h2>
                <button
                    className="absolute top-6 right-6 text-gray-800 text-xl cursor-pointer bg-transparent border-0"
                    onClick={handleCloseForm}
                >
                    <CancelIcon />
                </button>
                <div className="w-4/5 mx-auto">
                    <Autocomplete
                        {...defaultProps}
                        id="disable-clearable"
                        disableClearable
                        onChange={handleAutocompleteChange}
                        inputValue={query}
                        onInputChange={(event, newInputValue) => {
                            setQuery(newInputValue);
                        }}
                        renderOption={(props, option) => (
                            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                <Image
                                    loading="lazy"
                                    width={60}
                                    height={60}
                                    src={option.images.webp.image_url}
                                    alt=""
                                />
                                {option.title}
                            </Box>
                        )}
                        renderInput={(params) => (
                            <TextField {...params} label="Elige un anime" variant="standard" />
                        )}
                    />
                </div>
                <div className="w-4/5 mx-auto pt-20 pr-2">
                    <FormControl variant="standard" className="w-full" required>
                        <InputLabel id="demo-simple-select-standard-label">Estado del anime</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={animeState}
                            onChange={handleChange}
                            label="Estado del anime"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={'En emisión'}>En emisión</MenuItem>
                            <MenuItem value={'Esperando temporada'}>Esperando temporada</MenuItem>
                            <MenuItem value={'Pausadas por mí'}>Pausadas por mí</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className="w-4/5 mx-auto pt-16 pb-16">
                    <p>Apreta el boton para confirmar</p>
                    <LoadingButton
                        color="secondary"
                        type="submit"
                        loading={loading}
                        loadingPosition="start"
                        startIcon={<SaveIcon />}
                        variant="contained"
                    >
                        <span>Guardar</span>
                    </LoadingButton>
                </div>
            </form>
        </div>
    );
}

export default AnimeForm;