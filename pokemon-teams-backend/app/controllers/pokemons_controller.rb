class PokemonsController < ApplicationController
    def index
        pokemons = Pokemon.all
        render json: PokemonSerializer.new(pokemons)
    end

    def create
        pokemon = Pokemon.new(pokemon_params)
        if pokemon.save
            render json: PokemonSerializer.new(pokemon)
        else
            alert('pokemon not saved')
        end
    end

    def destroy
        pokemon = Pokemon.find_by_id(params[:id])
        pokemon.destroy
        render json: PokemonSerializer.new(pokemon)
    end

    def pokemon_params
        params.require(:pokemon).permit(:nickname, :species, :trainer_id).merge(nickname: Faker::Name.first_name, species: Faker::Games::Pokemon.name)
    end
end
