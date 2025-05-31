import { type ARIARoleDefinitionKey, roleElements } from 'aria-query'
import { computeAccessibleName } from 'dom-accessibility-api'
import { getAriaPressedInternal } from './getAriaAttributes'
import type { AriaPressedValue } from './types'

interface QueryByRoleOptions {
	name?: string
	pressed?: AriaPressedValue
}

export class TargetWindow {
	window: Window
	constructor(window: Window) {
		this.window = window
	}
	queryByRole(role: string, options?: QueryByRoleOptions): Element[] {
		const window = this.window

		const selector = this.getSelectorForRole(role)

		const elements = Array.from(window.document.querySelectorAll(selector))
		const filteredElements = elements
			.filter((element: Element) => {
				if (options?.name === undefined) {
					return true
				}
				return this.getAccessibleName(element) === options.name
			})
			.filter((element: Element) => {
				if (options?.pressed === undefined) {
					return true
				}
				return this.getAriaPressed(element, role) === options?.pressed
			})

		return filteredElements
	}

	private getSelectorForRole(role: string) {
		const explicitRoleSelector = `[role="${role}"]`

		const elementsFromAriaQuery =
			roleElements.get(role as ARIARoleDefinitionKey) ?? new Set()
		const implicitRoleSelectors = Array.from(elementsFromAriaQuery).map(
			({ name }) => name
		)

		return [explicitRoleSelector, ...implicitRoleSelectors].join(',')
	}

	private getAccessibleName(element: Element) {
		const computedAccessibleName = computeAccessibleName(element, {
			computedStyleSupportsPseudoElements: true
		})
		return computedAccessibleName
	}
	private getAriaPressed(element: Element, role: string): AriaPressedValue {
		return getAriaPressedInternal(element, role)
	}
}

export const createTargetWindow = (window: Window): TargetWindow => {
	return new TargetWindow(window)
}
