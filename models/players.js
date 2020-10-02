'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Players extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Players.belongsTo(models.Team, { foreignKey: 'teamId' });
      Players.belongsToMany(models.Pokemon, {
        through: "PlayerPokemon",
        foreignKey: "playerId",
        otherKey: "pokemonId",
      });
    };
  };

  Players.init({
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    teamId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Players',
  });
  return Players;
};