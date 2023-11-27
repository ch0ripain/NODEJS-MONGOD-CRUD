import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MONGODB_URIS = process.env.MONGODB_URI.split(',');

const connectToDatabase = async () => {
  let currentIndex = parseInt(process.env.CURRENT_MONGODB_URI_INDEX, 10);
  console.log('indice post env-> ' + currentIndex);
  while (currentIndex < MONGODB_URIS.length) {
    try {
      await mongoose.connect(MONGODB_URIS[currentIndex], {
        dbName: customersdb,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      });

      console.log(`Mongodb connected...\nMongoose Connect Options:
        MONGODB_URI: ${MONGODB_URIS[currentIndex]}
        DB_NAME: ${process.env.DB_NAME}`);

      // Actualizamos el índice para la próxima vez que se inicie la aplicación
      process.env.CURRENT_MONGODB_URI_INDEX = currentIndex;

      break; // Salimos del bucle si la conexión es exitosa
    } catch (error) {
      console.error(error.message);
      currentIndex += 1;
      console.log('indice fallo +1-> ' + currentIndex);
    }
  }

  if (currentIndex === MONGODB_URIS.length) {
    console.error('Ningún nodo activo.');
  }

  // Resto del código de manejo de eventos y limpieza
  mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to db...');
  });

  mongoose.connection.on('error', err => {
    console.log(err.message);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose connection is disconnected...');
  });

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log(
        'Mongoose connection is disconnected due to app termination...'
      );
      process.exit(0);
    });
  });
};

export default connectToDatabase;
