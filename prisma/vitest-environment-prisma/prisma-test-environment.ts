import { Environment } from 'vitest'

export default <Environment>{
  name: 'prisma',
  async setup() {
    console.log('Executing')

    return {
      teardown() {
        console.log('teardown')
      },
    }
  },
}
