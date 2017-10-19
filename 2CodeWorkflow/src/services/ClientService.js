const ClientModel = require('../models/ClientModel');
const ApiKeyManager = require('../helpers/ApiKeyManager');
const {NotFound} = require('../helpers/customError');
const {RESPONSE_MESSAGES} = require('../const');

class ClientService {
  static async getById(log, clientId) {
    log.debug('ClientService.getById', {clientId});

    const client = await ClientModel.get(clientId);
    if (!client)
      throw new NotFound(RESPONSE_MESSAGES.CLIENT_DOES_NOT_EXIST);

    return client;
  }

  static async list(log) {
    log.debug('ClientService.list');

    const clients = await ClientModel.scan().exec();
    return clients;
  }

  static async getByOrigin(log, origin) {
    log.debug('ClientService.getByOrigin', {origin});

    const clients = (await this.list(log)) || [];
    const filtered = clients.filter((client) => client.origins && client.origins.includes(origin));
    const client = filtered[0];
    if (client) {
      client.apiKey = ApiKeyManager.create(client.id, origin);
    }

    switch (filtered.length) {
      case 0:
        throw new NotFound(RESPONSE_MESSAGES.CLIENT_DOES_NOT_EXIST);
      case 1:
        return client;
      default:
        log.error('ClientService.getByOrigin', {message: 'Multiply clients.', clients: filtered});
        return client;
    }
  }
}

module.exports = ClientService;
