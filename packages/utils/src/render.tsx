import React, { type FunctionComponent } from 'react'
import { type RootType, render as copyRender } from './ReactDomRender'

export class ReactDOMRender<P = {}> {
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
