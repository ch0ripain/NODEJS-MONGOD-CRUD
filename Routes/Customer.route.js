//XD
import { 
    renderCustomers, 
    getAllCustomers, 
    createNewCustomer, 
    findCustomerById, 
    editCustomer,
    updateCustomer, 
    deleteCustomer 
} from '../Controllers/Customer.Controller.js'
import { Router } from 'express';
const router = Router();

// Ruta para mostrar la vista de todos los clientes
router.get('/', renderCustomers);

//Get a list of all customers
router.get('/allCustomers', getAllCustomers);

//Create a new customers
router.post('/add', createNewCustomer);

//Get a customer by id
router.get('/find/:id', findCustomerById);

//Recover a customer by id to edit
router.get('/update/:id', editCustomer);

//Update
router.post('/update/:id', updateCustomer);

//Delete a customer by id
router.post('/delete/:id', deleteCustomer);

export default router;
