import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import linkController from "../controllers/LinkController";

async function linksRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
    fastify.post('/', async (req: FastifyRequest, rep: FastifyReply) => linkController.createLink(req, rep));
    fastify.get('/', async (req: FastifyRequest, rep: FastifyReply) => linkController.getLinks(req, rep));
}

export default linksRoutes;