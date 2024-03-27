import fastify, { FastifyReply, FastifyRequest } from "fastify";
import { z } from 'zod';
import { prisma } from "./database/prisma";
import { Prisma } from "@prisma/client";
import { redis } from "./database/redis";
import cors from '@fastify/cors';

const app = fastify();


app.register(cors, {
    origin: '*',
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

app.get('/api/links', async (req, reply) => {
    const result = await prisma.shortLink.findMany({ orderBy: { createdAt: 'desc' } });

    return reply.send(result);
});

app.post('/api/links', async (request: FastifyRequest, reply: FastifyReply) => {
    const createLinkSchema = z.object({
        code: z.string().min(3),
        url: z.string().url(),
    });
    const { code, url } = createLinkSchema.parse(request.body);

    try {
        const shortLink = await prisma.shortLink.create({
            data: {
                code,
                originalUrl: url
            }
        });

        return reply.status(201).send({ shortLinkId: shortLink.id });
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                return reply.status(400).send({ message: "Duplicated Code" })
            }
        }

        console.error(error);
        return reply.status(500).send({ message: "Internal Error" });
    }
});

app.get('/api/metrics', async () => {
   const result = await redis.zRangeByScoreWithScores('metrics', 0, 50); // member, inicio, stop(-1 ultimo)
   const metrics = result.sort((a, b) => b.score - a.score).map((item) => {
    return {
        shortLink: item.value,
        clicks: item.score,
    }
   });
   return metrics;
});

app.listen({
    port: 3333,
}).then(() => {
    console.log('HTTP Server running');
});