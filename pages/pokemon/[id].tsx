import { GetServerSideProps } from "next";
import Link from "next/link";
import React from "react";

interface IPokemon {
  name: string;
  id: number;
}

interface IPokemonResponse {
  pokemon: IPokemon;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log("context", context.params);
  const response = await fetch(
    "https://pokeapi.co/api/v2/pokemon/" + context.params.id
  );
  const pokemon = await response.json();
  return {
    props: {
      pokemon,
    },
  };
};

const PokemonDetail: React.FC<IPokemonResponse> = ({
  pokemon: { name, id },
}) => {
  console.log("pokemon detail", name);
  if (!name || !id) return <p>Loading...</p>;
  return (
    <div>
      <p>ID: #{String(id).padStart(3, "0")}</p>
      <p>Nome: {name.toUpperCase()}</p>
      <div>
        <Link href="/">
          <a>Return Home</a>
        </Link>
      </div>
    </div>
  );
};

export default PokemonDetail;
