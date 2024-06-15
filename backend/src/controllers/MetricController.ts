import { FastifyReply, FastifyRequest } from "fastify";
import { redis } from "../database/redis";

class MetricController {
    async getMetrics(request: FastifyRequest, reply: FastifyReply) {
        const result = await redis.zRangeByScoreWithScores('metrics', 0, 50); // member, inicio, stop(-1 ultimo)
        const metrics = result.sort((a, b) => b.score - a.score).map((item) => {
            return {
                shortLink: item.value,
                clicks: item.score,
            }
        });
        return reply.send({ data: metrics });
    }
}
const metricController = new MetricController();
export default metricController;