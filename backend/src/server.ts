import fastify from "fastify";
import { z } from 'zod';
import { prisma } from "./database/prisma";
import { redis } from "./database/redis";
import routes from "./routes";
import cors from '@fastify/cors';

const app = fastify();

app.register(cors, {
    origin: '*',
});

app.register(routes, { prefix: '/api/v1' });

app.get('/proxy/:code', async (req, reply) => {
    const getLinkSchema = z.object({
        code: z.string().min(3),
    });

    const { code } = getLinkSchema.parse(req.params);

    const result = await prisma.shortLink.findUnique({
        where: { code }, select: {
            id: true, originalUrl: true
        }
    });

    if (!result) {
        return reply.status(404).send({ message: "Link Not Found" });
    }

    const link = result.originalUrl;

    await redis.zIncrBy('metrics', 1, result.id);

    return reply.send({ link });
});

app.get('/:code', async (req, reply) => {
    const getLinkSchema = z.object({
        code: z.string().min(3),
    });

    const { code } = getLinkSchema.parse(req.params);

    const result = await prisma.shortLink.findUnique({
        where: { code }, select: {
            id: true, originalUrl: true
        }
    });

    if (!result) {
        return reply.status(404).send({ message: "Link Not Found" });
    }

    const link = result.originalUrl;

    await redis.zIncrBy('metrics', 1, result.id);

    return reply.redirect(301, link);
});

app.listen({
    port: 3333,
}).then(() => {
    console.log('HTTP Server running');
});