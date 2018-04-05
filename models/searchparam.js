module.exports = function(sequelize, DataTypes) {
  var SearchParam = sequelize.define("SearchParam", {
    latitude: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isNumeric: true
      }
    },
    longitude: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isNumeric: true
      }
    },
    maxDistance: {
      type: DataTypes.DECIMAL,
      validate: {
        isNumeric: true
      }
    },
    minLength: {
      type: DataTypes.DECIMAL(10, 2),
      validate: {
        isNumeric: true
      }
    }
  });

  SearchParam.associate = function(models){
    SearchParam.hasMany(models.Activity, {
      onDelete: "cascade"
    });
  };

  SearchParam.associate = function(models){
    SearchParam.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return SearchParam;
};