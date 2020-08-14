class PokemonsController < ApplicationController
  def create
    nickname = Faker::Name.first_name
    species = Faker::Games::Pokemon.name
    pokemon = Pokemon.create(nickname: nickname, species: species, trainer_id: params[:trainer_id])
    render json: pokemon, except: [:created_at, :updated_at]
  end

  def destroy
    pokemon = Pokemon.find_by(id: params[:pokemon_id])
    render json: pokemon, except: [:created_at, :updated_at]
    pokemon.destroy
  end
end
