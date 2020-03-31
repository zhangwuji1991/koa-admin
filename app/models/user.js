const bcrypt = require('bcryptjs')
const { sequelize } = require('../../core/db')
const { Sequelize, Model } = require('sequelize')
const { NotFund, AuthFailed } = require('../../core/http-exception')
// const { User } = require('../../models/user')

class User extends Model {
    static async verifyEmailPassword(email,plainPassword){
        const user = await User.findOne({
            where:{
                email
            }
        })
        if (!user) {
            throw new NotFund('账号不存在')
        }
        const correct = bcrypt.compareSync(plainPassword,user.password)
        if (!correct) {
            throw new AuthFailed('密码不正确')
        }
        return user
    }
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

    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nickname: Sequelize.STRING,
    email: {
        type: Sequelize.STRING(128),
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        set(val) {
            const salt = bcrypt.genSaltSync(10)
            //明文 加密不同 彩虹攻击
            const psw = bcrypt.hashSync(val, salt)
            this.setDataValue('password',psw)
        }
    },
    openid: {
        type: Sequelize.STRING(64),
        unique: true
    }
}, {
    sequelize,
    tableName: 'user'
})

module.exports = {
    User
}
//数据迁移 SQL 更新 风险