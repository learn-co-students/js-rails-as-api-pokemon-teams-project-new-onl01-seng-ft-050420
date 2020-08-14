class TrainersController < ApplicationController
    def index 
        trainers = Trainer.all
        # options = {      
        #     include: {
        #         pokemons: {
        #             only: [:id, :nickname, :species, :trainer_id]
        #         }
        #     },
        #     except: [:created_at, :updated_at]
        # }
        # render json: TrainerSerializer.new(trainers)
        render json: trainers, include: [:pokemons]
    end
end