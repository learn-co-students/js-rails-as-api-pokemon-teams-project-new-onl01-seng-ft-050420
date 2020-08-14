class TrainerSerializer
  def initialize(trainers)
    @trainers = trainers
  end

  def to_serialized_json
    options = {
      include: {
        pokemons: {
          only: [:species, :nickname, :id]
        }
      },
      except: [:updated_at, :created_at]
    }
    @trainers.to_json(options)
  end
end
