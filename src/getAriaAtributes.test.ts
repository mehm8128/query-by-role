import {
	getAriaBusy,
	getAriaCurrent,
	getAriaExpanded,
	getAriaInvalid,
	getAriaPressed,
	getAriaSelected
} from './getAriaAttributes'

describe('getAriaAttributes', () => {
	describe('getAriaPressed', () => {
		const role = 'button' as const

		it('implicit button role (aria-pressed: true)', () => {
			const element = document.createElement('button')
			element.setAttribute('aria-pressed', 'true')
			const result = getAriaPressed(element, role)
			expect(result).toBe(true)
		})
		it('explicit button role (aria-pressed: false)', () => {
			const element = document.createElement('div')
			element.setAttribute('role', role)
			element.setAttribute('aria-pressed', 'false')
			const result = getAriaPressed(element, role)
			expect(result).toBe(false)
		})
	})
	describe('getAriaSelected', () => {
		const role = 'option' as const

		it('implicit option role (selected="true")', () => {
			const element = document.createElement('option')
			element.setAttribute('selected', 'true')
			const result = getAriaSelected(element, role)
			expect(result).toBe(true)
		})
		it('explicit option role (aria-selected: false)', () => {
			const element = document.createElement('div')
			element.setAttribute('role', role)
			element.setAttribute('aria-selected', 'false')
			const result = getAriaSelected(element, role)
			expect(result).toBe(false)
		})
		it('nothing related to selected state is attached', () => {
			const element = document.createElement('option')
			const result = getAriaSelected(element, role)
			expect(result).toBe(false)
		})
	})
	describe('getAriaBusy', () => {
		it('div element', () => {
			const element = document.createElement('div')
			element.setAttribute('aria-busy', 'true')
			const result = getAriaBusy(element)
			expect(result).toBe(true)
		})
	})
	describe('getAriaExpanded', () => {
		const role = 'button' as const

		it('implicit button role (aria-expanded: true)', () => {
			const element = document.createElement('button')
			element.setAttribute('aria-expanded', 'true')
			const result = getAriaExpanded(element, role)
			expect(result).toBe(true)
		})
		it('explicit button role (aria-expanded: false)', () => {
			const element = document.createElement('div')
			element.setAttribute('role', role)
			element.setAttribute('aria-expanded', 'false')
			const result = getAriaExpanded(element, role)
			expect(result).toBe(false)
		})
		it('implicit button role (open="true")', () => {
			const element = document.createElement('details')
			element.setAttribute('open', 'true')
			const result = getAriaExpanded(element, role)
			expect(result).toBe(true)
		})
		it('nothing related to expanded state is attached', () => {
			const element = document.createElement('details')
			const result = getAriaExpanded(element, role)
			expect(result).toBe(false)
		})
	})
	describe('getAriaInvalid', () => {
		const role = 'textbox' as const

		it('implicit textbox role (aria-invalid: true)', () => {
			const element = document.createElement('input')
			element.setAttribute('type', 'textbox')
			element.setAttribute('aria-invalid', 'true')
			const result = getAriaInvalid(element, role)
			expect(result).toBe('true')
		})
		it('implicit textbox role (aria-invalid: "grammar")', () => {
			const element = document.createElement('input')
			element.setAttribute('type', 'textbox')
			element.setAttribute('aria-invalid', 'grammar')
			const result = getAriaInvalid(element, role)
			expect(result).toBe('grammar')
		})
		it('explicit textbox role (aria-invalid: false)', () => {
			const element = document.createElement('div')
			element.setAttribute('role', role)
			element.setAttribute('aria-invalid', 'false')
			const result = getAriaInvalid(element, role)
			expect(result).toBe('false')
		})
	})
	describe('getAriaCurrent', () => {
		const role = 'link' as const

		it('aria-current: "page"', () => {
			const element = document.createElement('a')
			element.setAttribute('aria-current', 'page')
			const result = getAriaCurrent(element, role)
			expect(result).toBe('page')
		})
		it('aria-expanded: "false', () => {
			const element = document.createElement('a')
			element.setAttribute('role', role)
			element.setAttribute('aria-current', 'false')
			const result = getAriaCurrent(element, role)
			expect(result).toBe('false')
		})
	})
})
