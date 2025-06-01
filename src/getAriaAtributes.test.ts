import {
	getAriaBusyInternal,
	getAriaExpandedInternal,
	getAriaPressedInternal,
	getAriaSelectedInternal
} from './getAriaAttributes'

describe('getAriaAttributes', () => {
	describe('getAriaPressedInternal', () => {
		const role = 'button' as const

		it('implicit button role (aria-pressed: true)', () => {
			const element = document.createElement('button')
			element.setAttribute('aria-pressed', 'true')
			const result = getAriaPressedInternal(element, role)
			expect(result).toBe(true)
		})
		it('explicit button role (aria-pressed: false)', () => {
			const element = document.createElement('div')
			element.setAttribute('role', role)
			element.setAttribute('aria-pressed', 'false')
			const result = getAriaPressedInternal(element, role)
			expect(result).toBe(false)
		})
	})
	describe('getAriaSelectedInternal', () => {
		const role = 'option' as const

		it('implicit option role (selected="true")', () => {
			const element = document.createElement('option')
			element.setAttribute('selected', 'true')
			const result = getAriaSelectedInternal(element, role)
			expect(result).toBe(true)
		})
		it('explicit option role (aria-selected: false)', () => {
			const element = document.createElement('div')
			element.setAttribute('role', role)
			element.setAttribute('aria-selected', 'false')
			const result = getAriaSelectedInternal(element, role)
			expect(result).toBe(false)
		})
		it('nothing related to selected state is attached', () => {
			const element = document.createElement('option')
			const result = getAriaSelectedInternal(element, role)
			expect(result).toBe(false)
		})
	})
	describe('getAriaBusyInternal', () => {
		it('div element', () => {
			const element = document.createElement('div')
			element.setAttribute('aria-busy', 'true')
			const result = getAriaBusyInternal(element)
			expect(result).toBe(true)
		})
	})
	describe('getAriaExpandedInternal', () => {
		const role = 'button' as const

		it('implicit button role (aria-expanded: true)', () => {
			const element = document.createElement('button')
			element.setAttribute('aria-expanded', 'true')
			const result = getAriaExpandedInternal(element, role)
			expect(result).toBe(true)
		})
		it('explicit option role (aria-expanded: false)', () => {
			const element = document.createElement('div')
			element.setAttribute('role', role)
			element.setAttribute('aria-expanded', 'false')
			const result = getAriaExpandedInternal(element, role)
			expect(result).toBe(false)
		})
		it('implicit button role (open="true")', () => {
			const element = document.createElement('details')
			element.setAttribute('open', 'true')
			const result = getAriaExpandedInternal(element, role)
			expect(result).toBe(true)
		})
		it('nothing related to expanded state is attached', () => {
			const element = document.createElement('details')
			const result = getAriaExpandedInternal(element, role)
			expect(result).toBe(false)
		})
	})
})
