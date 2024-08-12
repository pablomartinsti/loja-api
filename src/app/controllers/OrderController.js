import * as Yup from 'yup'
import Order from '../schemas/Ordes'
import Product from '../models/Product.js'
import Category from '../models/Category.js'
import User from '../models/User.js'

class OrderController {
    async store(request, response) {
        const schema = Yup.object({
            products: Yup.array().required().of(
                Yup.object({
                    id: Yup.number().required(),
                    quantity: Yup.number().required(),
                })
            )
        })


        try {
            schema.validateSync(request.body, { abortEarly: false })
        } catch (err) {
            return response.status(400).json({ error: err.errors })
        }

        const { products } = request.body

        const productsIds = products.map((product) => product.id)

        const findProducts = await Product.findAll({
            where: {
                id: productsIds
            },
            include: [
                {
                    model: Category,
                    as: 'category',
                    attributes: ['name']
                }
            ]
        })

        const fromattedProducts = findProducts.map((product) => {
            const productIndex = products.findIndex(item => item.id === product.id)

            const newProduct = {
                id: product.id,
                name: product.name,
                category: product.category,
                price: product.price,
                url: product.url,
                quantity: products[productIndex].quantity
            }

            return newProduct
        })

        const order = {
            user: {
                id: request.userId,
                name: request.userName,
            },

            products: fromattedProducts,
            status: 'pedido realizado'
        }

        const createOrder = await Order.create(order)


        return response.status(201).json(createOrder)
    }

    async index(request, response) {
        const orders = await Order.find()

        return response.json(orders)

    }

    async update(request, response) {
        const schema = Yup.object({
            status: Yup.string().required()
        })

        try {
            schema.validateSync(request.body, { abortEarly: false })
        } catch (err) {
            return response.status(400).json({ error: err.errors })
        }

        const { admin: isAdmin } = await User.findByPk(request.userId)

        if (!isAdmin) {
            return response.status(401).json()
        }

        const { id } = request.params
        const { status } = request.body

        await Order.updateOne({ _id: id }, { status })

        return response.json({ message: 'status update sucessfully' })
    }

}

export default new OrderController()