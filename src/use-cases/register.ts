import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

interface RegisterDTO {
  name: string
  email: string
  password: string
}

export async function registerUseCase(data: RegisterDTO) {
  const { email, name, password } = data
  const emailAlreadyRegistered = await prisma.user.findUnique({
    where: {
      email,
    },
  })
  if (emailAlreadyRegistered) throw new Error('Invalid data')
  const password_hash = await hash(password, 6)
  await prisma.user.create({
    data: {
      name,
      email,
      password_hash,
    },
  })
}
