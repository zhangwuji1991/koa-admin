const { sequelize } = require('../../core/db')
const { Sequelize, Model } = require('sequelize')

class User extends Model{

}

User.init({
    // 主键 关系型数据库
    // 主键 不能重复 不能为空
    // 注册 user ID 设计 id编号系统
    // 自动增长ID编号
    // 数字 字符串 随机字符串
    // 并发 1000 注册
    // 爆漏 用户编号
    // 即使别人知道用户编号，也不能做坏事

    // 接口保护 权限 访问接口

    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    nickname:Sequelize.STRING,
    email:Sequelize.STRING,
    password:Sequelize.STRING,
    openid:{
        type:Sequelize.STRING(64),
        unique:true
    }
},{
    sequelize,
    tableName:'user'
})

//数据迁移 SQL 更新 风险