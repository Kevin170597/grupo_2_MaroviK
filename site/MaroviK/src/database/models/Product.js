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
        /*created_at:{
            type:DataTypes.STRING(45),
            allowNull:true
        },
        updated_at:{
            type:DataTypes.STRING(45),
            allowNull:true
        },
        id_user:{
            type:DataTypes.INTEGER(11),
            allowNull:true
        },*/
        id_subcategory:{
            type:DataTypes.INTEGER(11),
            allowNull:true
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
        Product.belongsToMany(models.users, {
            as: 'user',
            through: 'cart',
            foreignKey: 'id_user',
            otherKey: 'id_product',
            timestamps: false
        }),
        Product.belongsTo(models.users, {
            as: 'user_public',
            foreignKey: 'id_user'
        })
    }
    return Product;
}