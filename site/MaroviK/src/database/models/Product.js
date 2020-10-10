module.exports = (sequelize, DataTypes) => {
    let alias = "Products";

    let cols = {
        id:{
            type:DataTypes.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        name:{
            type:DataTypes.STRING(100),
            allowNull: false
        },
        mark:{
            type:DataTypes.STRING(45),
            allowNull: false
        },
        price:{
            type:DataTypes.INTEGER(11),
            allowNull: false
        },
        discount:{
            type:DataTypes.INTEGER(11),
            allowNull: true
        },
        stock:{
            type:DataTypes.INTEGER(11),
            allowNull: false
        },
        description:{
            type:DataTypes.STRING(500),
            allowNull: false
        },
        image:{
            type:DataTypes.STRING(100),
            allowNull: false
        },
        id_user:{
            type: DataTypes.INTEGER(11),
        },
        id_subcategory: {
            type:DataTypes.INTEGER(11)
        }
        
    };

    let config ={
        tableName: 'products',
        timestamps: true,
        underscored: true,
    }

    const Product = sequelize.define(alias, cols, config);
    
    
    Product.associate = function(models){
        Product.belongsTo(models.Subcategories, {
            as: 'subcategories_p',
            foreignKey: 'id_subcategory'
        }),
        Product.belongsToMany(models.Users, {
            as: 'user',
            through: 'cart',
            foreignKey: 'id_product',
            otherKey: 'id_user',
            timestamps: false
        }),
        Product.belongsTo(models.Users, {
            as: 'user_public',
            foreignKey: 'id_user'
        })
    }
    return Product;
}