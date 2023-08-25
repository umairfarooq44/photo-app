import mongoose from 'mongoose';

class Database {
  public async connect(
    databaseCredentials: string,
    //@ts-ignore
    log,
    debug: boolean = false
  ): Promise<void> {
    // The `EventListeners` is setup here.
    mongoose.connection.on('connected', () => {
      log.info('Database has connected successfully.');
    });

    mongoose.connection.on('disconnected', () => {
      log.warn('Database has disconnected.');
    });

    mongoose.connection.on('error', error => {
      log.error(
        { error },
        'Ops! There was an unexpected error connecting to the database.'
      );
    });

    // Set the debug level
    mongoose.set('debug', debug);

    // The actual connection to the database happens here.
    await mongoose.connect(databaseCredentials, {});
  }
}

export default new Database();
