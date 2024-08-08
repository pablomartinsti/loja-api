import Sequelize, { Model } from "sequelize";
import bcrypt from 'bcrypt'

class User extends Model {
    static init(sequelize) {
        super.init({
            name: Sequelize.STRING,
            date_of_birth: Sequelize.STRING,
            gender: Sequelize.STRING,
            cpf: Sequelize.STRING,
            phone: Sequelize.STRING,
            mobile: Sequelize.STRING,
            street: Sequelize.STRING,
            number: Sequelize.STRING,
            complement: Sequelize.STRING,
            neighborhood: Sequelize.STRING,
            city: Sequelize.STRING,
            email: Sequelize.STRING,
            password: Sequelize.VIRTUAL,
            password_hash: Sequelize.STRING,
            admin: Sequelize.BOOLEAN,

        },
            {
                sequelize
            }
        )

        this.addHook('beforeSave', async (user) => {
            if (user.password) {
                user.password_hash = await bcrypt.hash(user.password, 10)
            }
        })
        return this
    }
    async checkPassword(password) {
        return bcrypt.compare(password, this.password_hash)
    }
}

export default User