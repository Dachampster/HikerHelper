module.exports = function(sequelize, DataTypes) {
  var Activity = sequelize.define("Activity", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3],
        isAlphanumeric: true
      }
    },
    activityIdentification: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true
      }
    },
    difficulty: {
      type: DataTypes.STRING
    },
    length: {
      type: DataTypes.DECIMAL(10, 2),
      validate: {
        isNumeric: true
      }
    },
    rating: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: true,
        max: 5,
        min: 1
      }
    }
  });

  Activity.associate = function(models){
    Activity.belongsTo(models.SearchParam, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Activity;
};