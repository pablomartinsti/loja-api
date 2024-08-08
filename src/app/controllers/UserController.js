import { v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';

import User from '../models/User';

class UserController {
    async store(request, response) {

        const schema = Yup.object({
            name: Yup.string().required(),
            date_of_birth: Yup.string().required(),
            gender: Yup.string().required(),
            cpf: Yup.string().required(),
            phone: Yup.string(),
            mobile: Yup.string().required(),
            email: Yup.string().email().required(),
            street: Yup.string().required(),
            number: Yup.string().required(),
            complement: Yup.string(),
            neighborhood: Yup.string().required(),
            city: Yup.string().required(),
            password: Yup.string().min(6).required(),
            admin: Yup.boolean()
        });

        try {
            schema.validateSync(request.body, { abortEarly: false })
        } catch (err) {
            return response.status(400).json({ error: err.errors })
        }

        const {
            name, date_of_birth, gender, cpf, phone, mobile,
            email, street, number, complement, neighborhood,
            city, admin, password,
        } = request.body;

        const userExists = await User.findOne({
            where: {
                email,
            }
        })

        if (userExists) {
            return response.status(400).json({ error: 'User already exists' })
        }

        const user = await User.create({
            id: uuidv4(),
            name,
            date_of_birth,
            gender,
            cpf,
            phone,
            mobile,
            email,
            street,
            number,
            complement,
            neighborhood,
            city,
            admin,
            password
        });


        return response.status(201).json({
            id: user.id,
            name,
            email,
            admin
        });
    }
}

export default new UserController();
