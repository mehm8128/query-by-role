import { getAriaPressedInternal } from './getAriaAttributes'

describe('getAriaAttributes', () => {
	describe('getAriaPressedInternal', () => {
		const role = 'button' as const

		it('implicit button role', () => {
			const element = document.createElement('button')
			element.setAttribute('aria-pressed', 'true')
			const result = getAriaPressedInternal(element, role)
			expect(result).toBe(true)
		})
		it('explicit button role', () => {
			const element = document.createElement('div')
			element.setAttribute('role', role)
			element.setAttribute('aria-pressed', 'true')

			const result = getAriaPressedInternal(element, role)
			expect(result).toBe(true)
		})
	})
})
