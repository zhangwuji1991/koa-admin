const Sequelize = require('sequelize')
const {
    dbName,
    host,
    port,
    user, 
    password
} = require('../config/config').database

const sequelize = new Sequelize(dbName,user,password,{
    dialect:'mysql',
    host,
    port,
    looging:true,
    timezone: '+08:00',
    define:{
        //create_time update_time delete_time
        timestamps:true,
        paranoid:true,
        createdAt:'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        underscored:true
    }
})

sequelize.sync({
    force:false
})

module.exports = {
    sequelize
}