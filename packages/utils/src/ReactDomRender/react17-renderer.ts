import type { ReactElement } from 'react'
import type ReactDOM from 'react-dom'
import type { RenderFnType, RootTypeReact17 } from './types'

type LegacyReactDOM = typeof ReactDOM & {
  render?: (
    element: ReactElement,
    container: Element | DocumentFragment,
    callback?: () => void,
  ) => void
  unmountComponentAtNode?: (container: Element | DocumentFragment) => boolean
}

export function createReact17Renderer(reactDOM: typeof ReactDOM): RenderFnType {
  const legacyReactDOM = reactDOM as LegacyReactDOM
  const hasLegacyRender =
    typeof legacyReactDOM.render === 'function' &&
    typeof legacyReactDOM.unmountComponentAtNode === 'function'

  if (!hasLegacyRender) {
    throw new Error(
      'Legacy ReactDOM.render and unmountComponentAtNode are not available. Please use React 18+ with createRoot.',
    )
  }

  return (
    app: ReactElement,
    container: Element | DocumentFragment,
  ): RootTypeReact17 => {
    legacyReactDOM.render!(app, container)

    return {
      render: (nextApp: ReactElement) => {
        legacyReactDOM.render!(nextApp, container)
      },
      _unmount() {
        legacyReactDOM.unmountComponentAtNode!(container)
      },
    }
  }
}
