const { DataTypes } = require("sequelize/types");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) =>{

    // nombre de tabla //
    let alias = 'users';

    // Campos de la tabla //
    let cols = {
        id:{
            type:DataTypes.INTERGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },

        //Nombre//
        name:{
            type:DataTypes.STRING(45),
            allowNull: false
        },

        //apellido//
        lastName:{
            type:DataTypes.STRING(45),
            allowNull: false
        },

        email:{
            type:DataTypes.STRING(100),
            allowNull: false
        },

        password:{
            type:DataTypes.STRING(100),
            allowNull: false
        },

        //imagen de perfil//
        avatar:{
            type:DataTypes.STRING(100)
        },

        // direccion //
        address:{
            type:DataTypes.STRING(45)
        },
        
        // ciudad //
        city:{
            type:DataTypes.STRING(45)
        },

        // provincia //
        province:{
            type:DataTypes.STRING(45)
        },

        cp:{
            type:DataTypes.INTERGER(11)
        },

        rol:{
            type:DataTypes.STRING(45)
        }
    }

    let config ={
        tableName: 'users',
        timestamps: true,
        underscored: true,
    }

    const User = sequelize.define(alias, cols, config);
    return User;

}