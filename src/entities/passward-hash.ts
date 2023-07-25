import { compare, hash } from 'bcryptjs'

export default class PasswordHash {
  private password: string

  constructor(password: string) {
    this.password = password
  }

  hash = async (salt: number): Promise<string> => {
    const password_hash = await hash(this.password, salt)

    if (!password_hash) {
      throw new Error('Cannot generate password hash')
    }

    return password_hash
  }

  compare = async (password_hash: string): Promise<boolean> => {
    const isCorrectlyPassword = compare(this.password, password_hash)
    return isCorrectlyPassword
  }
}
