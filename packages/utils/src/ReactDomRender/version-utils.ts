import { isUndefined } from '../is'
import type { ReactVersion } from './types'

const SECRET_INTERNALS_KEY =
  '__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED'

function parseVersion(versionString: string | undefined): ReactVersion | null {
  if (!versionString) {
    return null
  }

  const parts = versionString.split('.')
  if (parts.length < 1) {
    return null
  }

  const major = Number.parseInt(parts[0] ?? '0', 10)
  const minor = parts.length > 1 ? Number.parseInt(parts[1] ?? '0', 10) : 0
  const patch = parts.length > 2 ? Number.parseInt(parts[2] ?? '0', 10) : 0

  if (Number.isNaN(major)) {
    return null
  }

  return {
    major,
    minor,
    patch,
    raw: versionString,
  }
}

export function getReactVersion(version?: string): ReactVersion | null {
  return parseVersion(version)
}

export function isReact18OrHigher(version?: string): boolean {
  const parsedVersion = getReactVersion(version)
  if (parsedVersion === null) {
    return false
  }
  return parsedVersion.major >= 18
}

export type ReactDOMSecretInternals = {
  usingClientEntryPoint?: boolean
  [key: string]: unknown
}

export function getReactDOMSecretInternals<T extends object>(
  reactDOM: T,
): ReactDOMSecretInternals | null {
  const internals = (reactDOM as Record<string, unknown>)[SECRET_INTERNALS_KEY]

  if (
    !isUndefined(internals) &&
    typeof internals === 'object' &&
    internals !== null
  ) {
    return internals as ReactDOMSecretInternals
  }

  return null
}

export function setUsingClientEntryPointFlag(
  internals: ReactDOMSecretInternals,
  value: boolean,
): void {
  internals.usingClientEntryPoint = value
}
