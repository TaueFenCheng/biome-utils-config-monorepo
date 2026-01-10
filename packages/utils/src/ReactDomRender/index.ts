import type { ReactElement } from 'react'
import ReactDOM from 'react-dom'
import { createReact17Renderer } from './react17-renderer'
import { createReact18Renderer } from './react18-renderer'
import type { CreateRootFnType, RenderFnType } from './types'
import { isReact18OrHigher } from './version-utils'

type ExtendedReactDOM = typeof ReactDOM & {
  createRoot?: CreateRootFnType
}

const extendedReactDOM = ReactDOM as ExtendedReactDOM

function detectRenderer(): RenderFnType {
  const version = extendedReactDOM.version
  const isReact18 = isReact18OrHigher(version)
  const createRoot = extendedReactDOM.createRoot

  if (isReact18 && createRoot) {
    return createReact18Renderer(createRoot)
  }

  return createReact17Renderer(ReactDOM)
}

const render = detectRenderer()

export { render }
export type {
  CreateRootFnType,
  ReactVersion,
  RenderFnType,
  RootType,
  RootTypeReact,
  RootTypeReact17,
  RootTypeReact18,
} from './types'
export {
  getReactDOMSecretInternals,
  getReactVersion,
  isReact18OrHigher,
  setUsingClientEntryPointFlag,
} from './version-utils'
