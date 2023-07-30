export class LateCheckinValidationError extends Error {
  constructor() {
    super('The check in time to validate expired')
  }
}
