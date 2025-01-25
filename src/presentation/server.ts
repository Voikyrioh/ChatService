// Import the framework and instantiate it
import Fastify, { FastifyRequest } from 'fastify'
import type { FastifyInstance } from 'fastify';
import fastifyWebsocket from "@fastify/websocket";
import type MessageController from './Controllers/MessageController'

class API {
    private _fastify: FastifyInstance;

    public async run(port: number, messageController: MessageController) {
        this._fastify = Fastify({
            logger: true
        })
        await this._fastify.register(fastifyWebsocket);

        await this._fastify.register(async function(fastify: fastifyWebsocket) {
            fastify.get(
              '/connect/',
              { websocket: true },
              (socket: WebSocket) => {
                messageController.connect(socket);
              }
            );
        });

        try {
            await this._fastify.listen({ port })
        } catch (err) {
            throw new Error(err);
        }
    }
}

export default new API();
