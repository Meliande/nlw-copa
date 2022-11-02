import Fastify from 'fastify'
import cors from '@fastify/cors'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'
import ShortUniqueId from 'short-unique-id'

const prisma = new PrismaClient({
    log: ['query'],
})

async function boostrap() {
    const fastify = Fastify({
        logger: true,
    })

    await fastify.register(cors, {
        origin: true,
    })

    fastify.get('/polls/count', async () => {

        const count = await prisma.poll.count()

        return { count }
    })

    fastify.get('/users/count', async () => {

        const count = await prisma.user.count()

        return { count }
    })

    fastify.get('/guesses/count', async () => {

        const count = await prisma.guess.count()

        return { count }
    })

    fastify.post('/polls', async (request, reply) => {

        const creatPollBody = z.object({
            title: z.string(),
        })

        const {title} = creatPollBody.parse(request.body)

        const generate = new ShortUniqueId({length: 6})

        const code = String(generate()).toUpperCase()

        await prisma.poll.create({
            data: {
                title,
                code
            }
        })

        return reply.status(201).send({code})
    })

    await fastify.listen({port: 3333 , host: '0.0.0.0'})
}

boostrap()