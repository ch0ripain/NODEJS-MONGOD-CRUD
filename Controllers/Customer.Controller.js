import createError from 'http-errors';
import mongoose from 'mongoose';
//XDDD
import Customer from '../Models/Customer.model.js';

  export const renderCustomers = async (req, res) => {
    try {
      // Utilizamos Mongoose para obtener todos los documentos de la colección 'customers'
      const customers = await Customer.find({}, { __v: 0 });
  
      // Renderizamos la vista 'customers' y pasamos los datos recuperados
      res.render("customers", { customers });
    } catch (error) {
      // Manejo de errores en caso de que haya un problema al acceder a la base de datos
      console.error(error);
      res.status(500).send("Error al obtener los clientes de la base de datos");
    }
  }

  export const getAllCustomers = async (req, res, next) => {
    try {
      const results = await Customer.find({}, { __v: 0 });
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  }

  export const createNewCustomer = async (req, res, next) => {
    try {
      const customer = new Customer(req.body);
      const result = await customer.save();
      res.redirect('/');
    } catch (error) {
      console.log(error.message);
      if (error.name === 'ValidationError') {
        next(createError(422, error.message));
        return;
      }
      next(error);
    }
  }

  export const findCustomerById = async (req, res, next) => {
    const id = req.params.id;
    try {
      const customer = await Customer.findById(id);
      if (!customer) {
        throw createError(404, 'Customer does not exist.');
      }
      res.send(customer);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Customer id'));
        return;
      }
      next(error);
    }
  }

  export const editCustomer = async (req, res) => {
    try {
      const { id } = req.params;

      // Buscar el cliente por su ID en MongoDB
      const customer = await Customer.findById(id);

      if (!customer) {
        throw createError(404, 'Customer does not exist.');
      }

      // Renderizar la vista customers_edit.ejs con los datos del cliente
      res.render('customers_edit', { customer });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, 'Invalid Customer Id'));
      }
      // Manejar otros errores
      next(error);
    }
  };

  export const updateCustomer = async (req, res, next) => {
    try {
      const id = req.params.id;
      const updates = req.body;

      const result = await Customer.findByIdAndUpdate(id, updates, { new: true });
      if (!result) {
        throw createError(404, 'Customer does not exist');
      }

      res.redirect('/');
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, 'Invalid Customer Id'));
      }

      next(error);
    }
  };


  export const deleteCustomer = async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await Customer.findByIdAndDelete(id);
      if (!result) {
        throw createError(404, 'Customer does not exist.');
      }
      res.redirect('/');
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Customer id'));
        return;
      }
      next(error);
    }
  }