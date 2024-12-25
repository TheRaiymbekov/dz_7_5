const PokemonCard = ({ pokemon }) => (
    <div className="pokemon-card">
        <img src={pokemon.sprite} alt={pokemon.name} />
        <h3>{pokemon.name}</h3>
        <p>Types: {pokemon.types.join(', ')}</p>
    </div>
);

export default PokemonCard;
