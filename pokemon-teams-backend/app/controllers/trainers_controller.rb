class TrainersController < ApplicationController
    def index
        trainers = Trainer.all
        render json: trainers.to_json(include: {pokemons: {only: [:id, :nickname, :species, :trainer_id]}}, only: [:id,:name] ) 
        #render json: PokemonSerializer.new(trainers)
    end 

    def show
        trainer = Trainer.find(params[:id])
        render json: trainer
    end


end
