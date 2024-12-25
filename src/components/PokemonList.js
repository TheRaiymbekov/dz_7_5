import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPokemons, filterPokemons } from '../features/pokemonSlice';
import PokemonCard from './PokemonCard';

const PokemonList = () => {
    const dispatch = useDispatch();
    const { pokemons, filteredPokemons, loading, error } = useSelector((state) => state.pokemon);

    useEffect(() => {
        dispatch(fetchPokemons());
    }, [dispatch]);

    const handleFilterChange = (e) => {
        dispatch(filterPokemons({ type: e.target.value }));
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <select onChange={handleFilterChange}>
                <option value="">All</option>
                <option value="grass">Grass</option>
                <option value="fire">Fire</option>
                <option value="water">Water</option>
            </select>
            <div className="pokemon-grid">
                {filteredPokemons.map((pokemon) => (
                    <PokemonCard key={pokemon.id} pokemon={pokemon} />
                ))}
            </div>
        </div>
    );
};

export default PokemonList;
