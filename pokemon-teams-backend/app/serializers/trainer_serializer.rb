class TrainerSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name
  has_many :pokemons

  attribute :pokemons do |object|
    object.pokemons.as_json
  end
end
