import { describe, expect, it, vi } from 'vitest'
import { render as actualRender } from '../src/ReactDomRender'
import { createReact17Renderer } from '../src/ReactDomRender/react17-renderer'
import { createReact18Renderer } from '../src/ReactDomRender/react18-renderer'
import type { RenderFnType } from '../src/ReactDomRender/types'
import {
  getReactVersion,
  isReact18OrHigher,
} from '../src/ReactDomRender/version-utils'

describe('ReactDomRender', () => {
  describe('version-utils', () => {
    describe('getReactVersion', () => {
      it('should parse valid version string', () => {
        const version = getReactVersion('18.2.0')
        expect(version).toEqual({
          major: 18,
          minor: 2,
          patch: 0,
          raw: '18.2.0',
        })
      })

      it('should parse version with only major version', () => {
        const version = getReactVersion('18')
        expect(version).toEqual({
          major: 18,
          minor: 0,
          patch: 0,
          raw: '18',
        })
      })

      it('should return null for undefined version', () => {
        const version = getReactVersion(undefined)
        expect(version).toBeNull()
      })

      it('should return null for invalid version', () => {
        const version = getReactVersion('invalid')
        expect(version).toBeNull()
      })
    })

    describe('isReact18OrHigher', () => {
      it('should return true for React 18', () => {
        expect(isReact18OrHigher('18.0.0')).toBe(true)
      })

      it('should return true for React 19', () => {
        expect(isReact18OrHigher('19.0.0')).toBe(true)
      })

      it('should return false for React 17', () => {
        expect(isReact18OrHigher('17.0.2')).toBe(false)
      })

      it('should return false for undefined version', () => {
        expect(isReact18OrHigher(undefined)).toBe(false)
      })
    })
  })

  describe('render function', () => {
    it('should export a render function', () => {
      expect(typeof actualRender).toBe('function')
    })

    it('should have the correct signature', () => {
      const _mockElement = { type: 'div', props: {} } as any

      expect(() => {
        expect(actualRender).toHaveProperty('call')
        expect(actualRender.length).toBe(2)
      }).not.toThrow()
    })
  })

  describe('React 18 renderer', () => {
    it('should throw error when createRoot is not a function', () => {
      expect(() => {
        createReact18Renderer(undefined as any)
      }).toThrow(
        'ReactDOM.createRoot is not available. Please ensure you are using React 18+.',
      )
    })

    it('should throw error when createRoot is not defined', () => {
      expect(() => {
        createReact18Renderer(null as any)
      }).toThrow(
        'ReactDOM.createRoot is not available. Please ensure you are using React 18+.',
      )
    })
  })

  describe('React 17 renderer', () => {
    it('should throw error when legacy render methods are not available', () => {
      const mockReactDOM = {
        version: '17.0.0',
      } as any

      expect(() => {
        createReact17Renderer(mockReactDOM)
      }).toThrow(
        'Legacy ReactDOM.render and unmountComponentAtNode are not available. Please use React 18+ with createRoot.',
      )
    })

    it('should throw error when render is not a function', () => {
      const mockReactDOM = {
        version: '17.0.0',
        render: 'not a function',
        unmountComponentAtNode: () => true,
      } as any

      expect(() => {
        createReact17Renderer(mockReactDOM)
      }).toThrow(
        'Legacy ReactDOM.render and unmountComponentAtNode are not available. Please use React 18+ with createRoot.',
      )
    })

    it('should throw error when unmountComponentAtNode is not a function', () => {
      const mockReactDOM = {
        version: '17.0.0',
        render: () => {},
        unmountComponentAtNode: 'not a function',
      } as any

      expect(() => {
        createReact17Renderer(mockReactDOM)
      }).toThrow(
        'Legacy ReactDOM.render and unmountComponentAtNode are not available. Please use React 18+ with createRoot.',
      )
    })
  })
})
