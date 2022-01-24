import {pokemons} from '../../../pokemons'

export default function getPokemons(req, res) {
  res.status(200).json(pokemons)
}
