import type { ReactElement } from 'react'

export interface RootType {
  render: (container: ReactElement) => void
  _unmount: () => void
}

export interface RootTypeReact18 extends RootType {
  unmount?: () => void
}

export type RootTypeReact17 = RootType

export type RootTypeReact = RootTypeReact18 | RootTypeReact17

export type CreateRootFnType = (
  container: Element | DocumentFragment,
) => RootTypeReact18

export type RenderFnType = (
  app: ReactElement,
  container: Element | DocumentFragment,
) => RootTypeReact

export type ReactVersion = {
  major: number
  minor: number
  patch: number
  raw: string
}
