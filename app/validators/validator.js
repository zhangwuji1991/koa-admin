const { LinValidator, Rule } = require('../../core/lin-validator')
const { User } = require('../models/user')
const { LoginType } = require('../lib/enum')

// 校验参数是否为正整数
class ValidationInteger extends LinValidator {
    constructor() {
        super()
        this.id = [
            // 这里可以添加多个校验规则，但是规则是且的关系
            // 三个参数：第一个参数：需要满足的规则，第二个参数：提示信息，第三个参数：可选参数
            new Rule('isInt', '参数必须为正整数', { min: 1 })
            // new Rule ('isNotEmpty', '必须传入参数')
        ]
    }
}

class RegisterValidator extends LinValidator {
    constructor() {
        super()
        this.email = [
            new Rule('isEmail', '不符合Email规范')
        ]
        this.password1 = [
            //设置密码复杂程度
            new Rule('isLength', '密码至少6个字符，最多32个字符串', {
                min: 6,
                max: 32
            }),
            new Rule('matches', '密码不符合规范', '^(?![0-9]+$)(?![a-zA-z]+$)[0-9A-Za-z]')
        ]
        this.password2 = this.password1
        this.nickname = [
            new Rule('isLength', '昵称不符合长度规范', {
                min: 4,
                max: 32
            }),
        ]
    }

    validatePassword(vals) {
        const psw1 = vals.body.password1
        const psw2 = vals.body.password2
        if (psw1 !== psw2) {
            throw new Error('两个密码必须相同')
        }
    }

    async validateEmail(vals) {
        const email = vals.body.email
        const user = await User.findOne({
            where: {
                email: email
            }
        })
        if (user) {
            throw new Error("email已存在")
        }
    }
}

class TokenValidator extends LinValidator {
    constructor() {
        super()
        this.account = [
            new Rule('isLength', '不符合账号规则', {
                min: 4,
                max: 32
            })
        ]
        this.secret = [
            new Rule('isOptional'),
            new Rule('isLength', '至少6个字符', {
                min: 6,
                max: 128
            })
        ]
    }
    // 枚举 js中没有枚举
    validateLoginType(vals) {
        if (!vals.body.type) {
            throw new Error('type是必须参数')
        }
        if (!LoginType.isThisType(vals.body.type)) {
            throw new Error('type参数不合法')
        }
    }
}



module.exports = { 
    ValidationInteger, 
    RegisterValidator,
    TokenValidator
}