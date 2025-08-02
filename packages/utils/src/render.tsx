import React, { type FunctionComponent } from 'react'
import { render as copyRender, type RootType } from './ReactDomRender'

export class ReactDOMRender<P = Record<string, any>> {
  root: RootType | undefined

  app: FunctionComponent<P>

  container: Element | DocumentFragment

  constructor(
    app: FunctionComponent<P>,
    container: Element | DocumentFragment,
  ) {
    this.app = app
    this.container = container
  }

  render = (props: any) => {
    const CustomApp = this.app
    if (this.root) {
      this.root.render(<CustomApp {...props} />)
    } else {
      this.root = copyRender(<CustomApp {...props} />, this.container)
    }
  }

  unmount = () => {
    this.root?._unmount()
    this.root = undefined
  }
}
