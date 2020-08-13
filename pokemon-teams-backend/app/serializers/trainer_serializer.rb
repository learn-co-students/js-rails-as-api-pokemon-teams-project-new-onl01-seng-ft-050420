class TrainerSerializer
  include FastJsonapi::ObjectSerializer
  has_many :pokemons
  attributes :name
  attribute :pokemons do |object|
    object.pokemons.as_json
  end
end
