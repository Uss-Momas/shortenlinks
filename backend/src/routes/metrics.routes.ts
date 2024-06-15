import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import metricController from "../controllers/MetricController";

async function metricsRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
    fastify.get('/', async (req: FastifyRequest, reply: FastifyReply) => metricController.getMetrics(req, reply));
}

export default metricsRoutes;