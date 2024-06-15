import { prisma } from "../database/prisma";

interface BodyObject {
    code?: string;
    url: string;
}

class LinkRepository {
    async getAll() {
        const result = await prisma.shortLink.findMany({ orderBy: { created_at: 'desc' } });
        return result;
    }

    async create({ url, code }: BodyObject) {
        const codeNew = code ? code : '';
        const shortLink = await prisma.shortLink.create({
            data: {
                code: codeNew,
                original_url: url,
            }
        });

        return shortLink;
    }
}

const linkRepository = new LinkRepository();
export default linkRepository;