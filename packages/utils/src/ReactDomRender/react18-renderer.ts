import type { ReactElement } from 'react'
import ReactDOM from 'react-dom'
import type { CreateRootFnType, RenderFnType, RootTypeReact18 } from './types'
import {
  getReactDOMSecretInternals,
  setUsingClientEntryPointFlag,
} from './version-utils'

export function createReact18Renderer(
  createRoot: CreateRootFnType,
): RenderFnType {
  if (typeof createRoot !== 'function') {
    throw new Error(
      'ReactDOM.createRoot is not available. Please ensure you are using React 18+.',
    )
  }

  return (
    app: ReactElement,
    container: Element | DocumentFragment,
  ): RootTypeReact18 => {
    const reactDOMInternals = getReactDOMSecretInternals(
      ReactDOM as typeof ReactDOM & Record<string, unknown>,
    )

    const previousFlag = reactDOMInternals?.usingClientEntryPoint

    if (reactDOMInternals) {
      setUsingClientEntryPointFlag(reactDOMInternals, true)
    }

    let root: RootTypeReact18 | null
    try {
      root = createRoot(container)
    } catch (error) {
      if (reactDOMInternals) {
        setUsingClientEntryPointFlag(reactDOMInternals, previousFlag ?? false)
      }
      throw error
    }

    if (reactDOMInternals) {
      setUsingClientEntryPointFlag(reactDOMInternals, previousFlag ?? false)
    }

    root.render(app)

    const unmount = root.unmount

    root._unmount = () => {
      setTimeout(() => {
        unmount?.()
      })
    }

    return root
  }
}
