import { type ARIARoleDefinitionKey, roleElements } from 'aria-query'
import { computeAccessibleName } from 'dom-accessibility-api'

interface QueryByRoleOptions {
	name?: string
}

export class TargetWindow {
	window: Window
	constructor(window: Window) {
		this.window = window
	}
	queryByRole(role: string, options: QueryByRoleOptions): Element[] {
		const { name } = options
		const window = this.window

		const selector = this.getSelectorForRole(role)

		const elements = Array.from(window.document.querySelectorAll(selector))
		const filteredElements = elements.filter((element: Element) => {
			if (name === undefined) {
				return true
			}
			return this.getAccessibleName(element) === name
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
}

export const createTargetWindow = (window: Window): TargetWindow => {
	return new TargetWindow(window)
}
