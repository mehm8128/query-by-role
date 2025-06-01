import { createTargetWindow } from './index'

describe('index', () => {
	beforeEach(() => {
		document.body.innerHTML = `
      <button aria-pressed="true">This is a button</button>
    `
	})

	it('can get button with queryByRole', () => {
		const targetWindow = createTargetWindow(window)
		const elements = targetWindow.queryByRole('button', {
			name: 'This is a button',
			pressed: true
		})
		expect(elements.length).toBe(1)
		expect(elements[0].tagName.toLowerCase()).toBe('button')
	})
})
