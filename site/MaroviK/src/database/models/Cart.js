module.exports = (sequelize, DataTypes) =>{

    let alias = 'Cart';

    let cols ={
        id:{
            type:DataTypes.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },


        id_user:{
            type:DataTypes.INTEGER(11),
            allowNull: false,
        },


        id_product:{
            type:DataTypes.INTEGER(11),
            allowNull: false,
        },

        quantity:{
            type:DataTypes.STRING(100),
            allowNull: false
        }


    }

    let config={
        tableName: 'cart',
        timestamps: false
    }

    const Cart = sequelize.define(alias, cols, config);
    
    
    
    return Cart
}