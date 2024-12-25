import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://pokeapi.co/api/v2/pokemon?limit=150';

export const fetchPokemons = createAsyncThunk('pokemon/fetchPokemons', async () => {
    const response = await axios.get(API_URL);
    const detailedData = await Promise.all(
        response.data.results.map(async (pokemon) => {
            const pokemonDetails = await axios.get(pokemon.url);
            return {
                id: pokemonDetails.data.id,
                name: pokemonDetails.data.name,
                types: pokemonDetails.data.types.map((t) => t.type.name),
                sprite: pokemonDetails.data.sprites.front_default,
            };
        })
    );
    return detailedData;
});

const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState: {
        pokemons: [],
        filteredPokemons: [],
        loading: false,
        error: null,
    },
    reducers: {
        filterPokemons: (state, action) => {
            const { type } = action.payload;
            if (type) {
                state.filteredPokemons = state.pokemons.filter((pokemon) =>
                    pokemon.types.includes(type)
                );
            } else {
                state.filteredPokemons = state.pokemons;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPokemons.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPokemons.fulfilled, (state, action) => {
                state.loading = false;
                state.pokemons = action.payload;
                state.filteredPokemons = action.payload;
            })
            .addCase(fetchPokemons.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { filterPokemons } = pokemonSlice.actions;
export default pokemonSlice.reducer;
