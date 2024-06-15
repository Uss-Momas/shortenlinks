import { createLinkSchema } from "../validations";
import { FastifyReply, FastifyRequest } from "fastify";
import linkRepository from "../repositories/LinkRepository";


class LinkController {
    async createLink(request: FastifyRequest, reply: FastifyReply) {
        const { code, url } = createLinkSchema.parse(request.body);
        
        const shortLink = await linkRepository.create({ code, url });
        return reply.status(201).send({ shortLinkId: shortLink.id });
    }

    async getLinks(request: FastifyRequest, reply: FastifyReply) {
        const links = await linkRepository.getAll();

        return reply.send({ data: links });
    }
}
const linkController = new LinkController();
export default linkController;