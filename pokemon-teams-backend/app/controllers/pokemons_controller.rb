class PokemonsController < ApplicationController
  def create
    trainer = Trainer.find(params[:id])
    if trainer.pokemons.count <= 5
      name = Faker::Name.first_name
      species = Faker::Games::Pokemon.name
      render json: trainer.pokemons.create(nickname: name, species: species).to_json
    else
      render json: {failure: true}.to_json
    end
  end
  def destroy
    Pokemon.destroy(params[:id])
    success = {message: "Successfuly deleted", status: 200}
    render json: success
  end
end
