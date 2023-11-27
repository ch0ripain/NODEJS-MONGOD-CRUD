import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

// Cadenas de conexión a las bases de datos
const connectionStrings = [
  'mongodb://mongo_db:27017',
  'mongodb://mongodS1:27017/?directConnection=true&readPreference=secondaryPreferred',
  'mongodb://mongodS2:27017/?directConnection=true&readPreference=secondaryPreferred'
];

// Configurar las opciones de conexión
const connectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
};

const connectToDatabase = async () => {
  let connected = false;

  for (const connectionString of connectionStrings) {
    try {
      await mongoose.connect(connectionString, connectionOptions);
      console.log(`Connected to MongoDB: ${connectionString}`);
      connected = true;
      break; // Salir del bucle si la conexión es exitosa
    } catch (error) {
      console.error(`Failed to connect to MongoDB: ${connectionString}. Error: ${error.message}`);
    }
  }

  if (!connected) {
    console.error('All MongoDB connections failed. Cluster is down.');
    // Puedes agregar código aquí para manejar el caso en que todas las conexiones fallen
  }
};

export default connectToDatabase;
