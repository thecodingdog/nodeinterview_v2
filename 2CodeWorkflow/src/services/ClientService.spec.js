const expect = require('chai').expect;
const assert = require('assert');
const sinon = require('sinon');
const proxyquire = require('proxyquire').noCallThru();
const {NotFound} = require('../helpers/customError');
const {RESPONSE_MESSAGES} = require('../const');

const ClientModelMock = {
  get: () => ({}),

  scan: () => ({
    async exec() {
    }
  })
};

const logMock = {
  debug() {
  },
  error() {
  }
};

const ApiKeyManagerMock = {
  create() {
  }
};

const ClientService = proxyquire('./ClientService', {
  '../models/ClientModel': ClientModelMock,
  '../helpers/ApiKeyManager': ApiKeyManagerMock
});

describe('ClientService V2', () => {
  it('should get client by identifier', async () => {
    const spiedGetClient = sinon.spy(ClientModelMock, 'get');

    await ClientService.getById(logMock, {});

    expect(spiedGetClient.calledOnce).to.be.true;

    spiedGetClient.restore();
  });

  it('should get list of clients', async () => {
    const spiedGetClients = sinon.spy(ClientModelMock, 'scan');

    await ClientService.list(logMock, {});

    expect(spiedGetClients.calledOnce).to.be.true;

    spiedGetClients.restore();
  });

  describe('getByOrigin', () => {

    const _originList = ClientService.list;
    const clientsList = [
      {
        id: 1,
        origins: [
          'http://localhost:8080'
        ]
      },
      {
        id: 2,
        origins: [
          'http://the.same'
        ]
      },
      {
        id: 3,
        origins: [
          'http://the.same'
        ]
      },
    ];

    before(() => {
      ClientService.list = function () {
        return clientsList;
      }
    });

    it('should return appropriate client object', async () => {
      const result = await ClientService.getByOrigin(logMock, 'http://localhost:8080');

      assert.equal(result, clientsList[0]);
    });

    it('should return first appropriate client object if several ones was found', async () => {
      const result = await ClientService.getByOrigin(logMock, 'http://the.same');

      assert.equal(result, clientsList[1]);
    });

    it('should throw appropriate error when no client was found', async () => {
      try {
        await ClientService.getByOrigin(logMock, 'http://unexisting');
      } catch (error) {
        assert.equal(error.constructor.name, NotFound.name);
        assert.equal(error.message.code, RESPONSE_MESSAGES.CLIENT_DOES_NOT_EXIST.code);
        return;
      }
      throw new Error('it did not throw');
    });

    after(() => {
      ClientService.list = _originList;
    });
  });
});
