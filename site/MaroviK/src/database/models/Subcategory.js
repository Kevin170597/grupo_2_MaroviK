module.exports = (sequelize, DataTypes) => {
    let alias = "Subcategories";
    let cols = {
        id: {
            type:DataTypes.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type:DataTypes.STRING(45),
            allowNull: false
        },
        name_path: {
            type:DataTypes.STRING(45),
            allowNull: false
        },
        image: {
            type:DataTypes.STRING(100),
            allowNull: false
        },
        id_category: {
            type:DataTypes.INTEGER(11),
            allowNull: true
        }
    }

    let config = {
        tableName: "subcategories",
        timestamps: false
    }
    
    const Subcategory = sequelize.define(alias, cols, config);

    Subcategory.associate = function(models){
        Subcategory.belongsTo(models.Category, {
            as: 'categories',
            foreignKey: 'id_category'
        }),
        Subcategory.hasMany(models.Product, {
            as: 'products',
            foreignKey: 'id_subcategory'
        })
    }
    }

    return Subcategory;
}