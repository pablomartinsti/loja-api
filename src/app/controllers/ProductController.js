import * as Yup from 'yup';
import Product from '../models/Product';
import Category from '../models/Category';
import User from '../models/User';

class ProductController {
  async store(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      price: Yup.string().required(),
      category_id: Yup.number().required(),
      offer: Yup.boolean(),
      news: Yup.boolean(),
    });

    try {
      schema.validateSync(request.body, { abortEarly: false });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }

    const { admin: isAdmin } = await User.findByPk(request.userId);

    if (!isAdmin) {
      return response.status(401).json();
    }

    const { filename: path } = request.file;
    const { name, price, category_id, offer, news } = request.body;

    const product = await Product.create({
      name,
      price,
      category_id,
      path,
      offer,
      news,
    });
    return response.status(201).json(product);
  }

  async update(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      price: Yup.string(),
      category_id: Yup.number(),
      offer: Yup.boolean(),
      news: Yup.boolean(),
    });

    try {
      schema.validateSync(request.body, { abortEarly: false });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }

    const { admin: isAdmin } = await User.findByPk(request.userId);

    if (!isAdmin) {
      return response.status(401).json();
    }

    const { id } = request.params;

    const findProduct = await Product.findByPk(id);

    if (!findProduct) {
      return response
        .status(400)
        .json({ error: 'make sure your product ID is correct' });
    }

    let path;
    if (request.file) {
      path = request.file.filename;
    }
    const { name, price, category_id, offer, news } = request.body;

    await Product.update(
      {
        name,
        price,
        category_id,
        path,
        offer,
        news,
      },
      {
        where: {
          id,
        },
      },
    );
    return response.status(201).json();
  }

  async index(request, response) {
    const products = await Product.findAll({
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name'],
        },
      ],
    });
    return response.json(products);
  }
}

export default new ProductController();
