import generateUUIDCode from "../utils/generateCode";
import { prisma } from "../database/prisma";

interface BodyObject {
    code: string;
    url: string;
}

class LinkRepository {
    async getAll() {
        const result = await prisma.shortLink.findMany({ orderBy: { createdAt: 'desc' } });
        return result;
    }

    async create({ url, code }: BodyObject) {
        const shortLink = await prisma.shortLink.create({
            data: {
                code,
                originalUrl: url,
            }
        });

        return shortLink;
    }

    async isUniqueCode(code: string) {
        const link = await prisma.shortLink.findUnique({ where: { code } });
        if (link) {
            return false;
        }
        return true;
    }
}

const linkRepository = new LinkRepository();
export default linkRepository;