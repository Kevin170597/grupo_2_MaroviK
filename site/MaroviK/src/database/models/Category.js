module.exports = (sequelize, DataTypes) =>{

    let alias = 'categories';

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
    return Category



}