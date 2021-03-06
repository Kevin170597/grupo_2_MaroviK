module.exports = (sequelize, DataTypes) =>{

    // nombre de tabla //
    let alias = 'Users'

    // Campos de la tabla //
    let cols = {
        id:{
            type:DataTypes.INTEGER(11),
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
        last_name:{
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
            type:DataTypes.INTEGER(11)
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
    
    User.associate = function(models){
        User.belongsToMany(models.Products, {
            as: 'product_u',
            through: 'cart',
            foreignKey: 'id_user',
            otherKey: 'id_product',
            timestamps: false
        })
        User.hasMany(models.Products, {
            as: 'products_public',
            foreignKey: 'id_user'
        })
    }

    return User;

}