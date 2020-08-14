class PokemonsController < ApplicationController
    def create
        trainer = Trainer.find_by_id(params[:trainer_id])
        pokemon = Pokemon.create(nickname: Faker::Name.first_name, species: Faker::Games::Pokemon.name, trainer_id: trainer.id)
        options = {
            except: [:created_at, :updated_at]
        }
        render json: PokemonSerializer.new(pokemon)
    end

    def destroy
        pokemon = Pokemon.find_by_id(params[:pokemon_id])
        render json: PokemonSerializer.new(pokemon)
        pokemon.destroy
    end
end