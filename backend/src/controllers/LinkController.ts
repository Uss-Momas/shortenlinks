import { createLinkSchema } from "../validations";
import { FastifyReply, FastifyRequest } from "fastify";
import generateUUIDCode from "../utils/generateCode";
import linkRepository from "../repositories/LinkRepository";

class LinkController {
    async createLink(request: FastifyRequest, reply: FastifyReply) {
        const { code, url } = createLinkSchema.parse(request.body);
        if (code) {
            const isUnique = await linkRepository.isUniqueCode(code);
            if (!isUnique) {
                return reply.status(400).send({ message: 'The code is already in use!' });
            }
        }
        const uniqueCode = code ? code : await generateUUIDCode();

        const shortLink = await linkRepository.create({ code: uniqueCode, url });
        return reply.status(201).send({ shortLinkId: shortLink.id });
    }

    async getLinks(request: FastifyRequest, reply: FastifyReply) {
        const links = await linkRepository.getAll();

        return reply.send({ data: links });
    }
}
const linkController = new LinkController();
export default linkController;