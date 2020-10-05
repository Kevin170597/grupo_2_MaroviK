module.exports = (sequelize, DataTypes) => {
    let alias = "Admins";
    let cols = {
        id: {
            type:DataTypes.INTERGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type:DataTypes.STRING(45),
            allowNull: false
        },
        lastName: {
            type:DataTypes.STRING(45),
            allowNull: false
        },
        email: {
            type:DataTypes.STRING(45),
            allowNull: false
        },
        id_user: {
            type:DataTypes.INTERGER(11),
            allowNull: true,
        }
    }

    let config = {
        tableName: "admins",
        timestamps: false
    }
    
    const Admin = sequelize.define(alias, cols, config);
    return Admin;
}