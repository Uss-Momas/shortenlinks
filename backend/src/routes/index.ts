import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import linksRoutes from "./links.routes";
import metricsRoutes from "./metrics.routes";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";

async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
    fastify.register(linksRoutes, { prefix: '/links' });
    fastify.register(metricsRoutes, { prefix: '/metrics' });

    fastify.setErrorHandler(async (error, request: FastifyRequest, reply: FastifyReply) => {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                return reply.status(400).send({ message: "Duplicated Code" })
            }
        }

        if (error instanceof ZodError) {
            const errors = error.errors;
            const errorMessages = errors.map((e) => {
                return { field: e.path[0], message: e.message };
            });

            return reply.status(422).send({ message: 'Validation Errors!', errors: errorMessages });
        }
        return reply.status(500).send({ message: "Internal Error" });
    });
}

export default routes;