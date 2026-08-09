import { zValidator } from "@hono/zod-validator"
import { PrismaD1 } from "@prisma/adapter-d1"
import { z } from "zod"
import { factory } from "@/factory"
import { PrismaClient } from "@/generated/prisma"

const zUserInput = z.object({
  email: z.string().trim().email().max(254),
  name: z.string().trim().min(1).max(128),
})

export const GET = factory.createHandlers(async (c) => {
  const adapter = new PrismaD1(c.env.MY_DB)

  const prisma = new PrismaClient({ adapter })

  const users = await prisma.user.findMany()

  return c.json(users)
})

export const POST = factory.createHandlers(zValidator("json", zUserInput), async (c) => {
  const input = c.req.valid("json")
  const adapter = new PrismaD1(c.env.MY_DB)
  const prisma = new PrismaClient({ adapter })

  const user = await prisma.user.create({
    data: {
      id: crypto.randomUUID(),
      ...input,
    },
  })

  return c.json(user, 201)
})
