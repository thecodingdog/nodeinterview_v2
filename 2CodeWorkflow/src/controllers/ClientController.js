const ClientService = require('../services/ClientService');

/**
 * @swagger
 * definitions:
 *   ErrorResponse:
 *     type: object
 *     properties:
 *       code:
 *         type: string
 *       message:
 *         type: string
 */
class ClientController {
  static async getById(ctx) {
    const {log, ok, params} = ctx;

    log.debug('ClientController.getById');

    const client = await ClientService.getById(log, params.clientId);
    ok(client);
  }

  /**
   * @swagger
   * /config/v2/clients/by-origin:
   *   get:
   *     description: |
   *       Get client by HTTP header Origin.
   *     tags:
   *       - clients
   *     parameters:
   *       - name: Origin
   *         in: header
   *         required: true
   *         type: string
   *     responses:
   *       '200':
   *         schema:
   *           type: object
   *           required:
   *             - id
   *             - apiKey
   *           properties:
   *             id:
   *               type: string
   *             apiKey:
   *               type: string
   *           examples:
   *             application/json: |
   *               {
   *                 'id': '0da29692-4610-43c2-be4b-8471c4823ecb',
   *                 'apiKey': '<sample-api-key>'
   *               }
   *       '400':
   *         schema:
   *           $ref: '#/definitions/ErrorResponse'
   *         examples:
   *           application/json: |
   *             {
   *               'code': 'INVALID_ORIGIN',
   *               'message': 'Invalid Origin'
   *             }
   *       '404':
   *         schema:
   *           $ref: '#/definitions/ErrorResponse'
   *         examples:
   *           application/json: |
   *             {
   *               'code': 'CLIENT_DOES_NOT_EXIST',
   *               'message': 'Client Does Not Exist'
   *             }
   */
  static async getByOrigin(ctx) {
    const {log, ok, headers} = ctx;

    log.debug('ClientController.getByOrigin');

    const client = await ClientService.getByOrigin(log, headers.origin);
    ok(client);
  }

  static async list(ctx) {
    const {log, ok} = ctx;

    log.debug('ClientController.list');

    const clients = await ClientService.list(log);
    ok({clients});
  }
}

module.exports = ClientController;
