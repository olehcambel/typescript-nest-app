import { ReflectMetadata } from '@nestjs/common'

export const Roles = (...roles: string[]) => {
  return ReflectMetadata('roles', roles)
}