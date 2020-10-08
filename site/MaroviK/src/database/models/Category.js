module.exports = (sequelize, DataTypes) =>{

    let alias = 'Categories';

    let cols ={
        id:{
            type:DataTypes.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },


        title:{
            type:DataTypes.STRING(45),
            allowNull: false
        },


        namePath:{
            type:DataTypes.STRING(45),
            allowNull: false
        },

        image:{
            type:DataTypes.STRING(100),
            allowNull: false
        }


    }

    let config={
        tableName: 'categories',
        timestamps: false

    }

    const Category = sequelize.define(alias, cols, config);
    
    Category.associate = function(models){
        Category.hasMany(models.Subcategory, {
            as: 'subcategories',
            foreignKey: 'id_category'
        })

    } 
    return Category



}