import Fastify from 'fastify'
import cors from '@fastify/cors'
import { pollRoutes } from './routes/poll'
import { authRoutes } from './routes/auth'
import { gameRoutes } from './routes/game'
import { guessRoutes } from './routes/guess'
import { userRoutes } from './routes/user'
import jwt from '@fastify/jwt'

async function boostrap() {
    const fastify = Fastify({
        logger: true,
    })

    await fastify.register(cors, {
        origin: true,
    })

    // Em produção precisa ser variável ambiente

    await fastify.register(jwt, {
        secret:'nlwcopa',
    })

    // ##########################################

    await fastify.register(pollRoutes)
    await fastify.register(authRoutes)
    await fastify.register(gameRoutes)
    await fastify.register(guessRoutes)
    await fastify.register(userRoutes)

    await fastify.listen({port: 3333 , host: '0.0.0.0'})
}
boostrap()