import { useEffect, useState, createContext, useContext } from "react";
import axios from "axios";

import UserContext from "../contexts/UserContext";

const PokemonsContext = createContext();
export default PokemonsContext;

export function PokemonsProvider({ children }) {
    const { token } = useContext(UserContext);
    const [pokemons, setPokemons] = useState(null);

    useEffect(() => {
        updatePokemons();
    }, []);

    function updatePokemons() {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/pokemons`, {
            headers: {
                Authorization: `Bearer ${token.token}`
            }
        }).then(response => {
            setPokemons(response.data.results);
        });
    }

    return (
        <PokemonsContext.Provider value={{ pokemons, updatePokemons }}>
            {children}
        </PokemonsContext.Provider>
    );
}
