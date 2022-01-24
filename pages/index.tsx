import { GetServerSideProps } from "next";
import Link from "next/link";

interface IPokemon {
  name: string
  url: string
}

interface IPokemonResponse {
  pokemons: Array<IPokemon>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/");
  const pokemons = await response.json().then(res => res.results);

  return {
    props: {
      pokemons,
    },
  };
};

const Home: React.FC<IPokemonResponse> = ({pokemons}) => {
  if (!pokemons) return <p>Loading...</p>;
  return (
    <div>
      <ul>
        {pokemons.map((pokemon, index) => (
          <li key={index}>
            <Link href={`/pokemon/${pokemon.name}`}>{pokemon.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
