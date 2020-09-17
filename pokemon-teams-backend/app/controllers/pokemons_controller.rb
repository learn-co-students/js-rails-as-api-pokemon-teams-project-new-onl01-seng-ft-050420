class PokemonsController < ApplicationController
    def index
        pokemons = Pokemon.all
        render json: pokemons, include: [:trainer]
    end

    def show
        pokemon = Pokemon.find_by(id: params[:id])
        render json: pokemon, include: [:trainer]
    end

    def create
        name = Faker::Name.first_name
        species = Faker::Games::Pokemon.name
        pokemon = Pokemon.new(nickname: name, species: species)
    end

    def destroy
        pokemon = Pokemon.find_by(id: params[:id])
        pokemon.delete

    end
end
