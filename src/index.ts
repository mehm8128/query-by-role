import { type ARIARoleDefinitionKey, roleElements } from 'aria-query'
import { computeAccessibleName } from 'dom-accessibility-api'
import {
	getAriaBusyInternal,
	getAriaExpandedInternal,
	getAriaPressedInternal,
	getAriaSelectedInternal
} from './getAriaAttributes'
import type {
	AriaBusyValue,
	AriaExpandedValue,
	AriaPressedValue,
	AriaSelectedValue
} from './types'

interface QueryByRoleOptions {
	name?: string
	pressed?: AriaPressedValue
	selected?: AriaSelectedValue
	busy?: AriaBusyValue
	expanded?: AriaExpandedValue
}

/**
 * NOTE: aria-queryのARIAState。これが必要最低限
 *
 * "aria-busy"
    | "aria-checked"
    | "aria-disabled"
    | "aria-expanded"
    | "aria-grabbed" -> deprecatedなのでやらない
    | "aria-hidden"
    | "aria-invalid"
    | "aria-pressed"
    | "aria-selected";
 */

export class TargetWindow {
	window: Window
	constructor(window: Window) {
		this.window = window
	}
	queryByRole(role: string, options?: QueryByRoleOptions): Element[] {
		const selector = this.getSelectorForRole(role)

		const elements = Array.from(this.window.document.querySelectorAll(selector))
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
			.filter((element: Element) => {
				if (options?.selected === undefined) {
					return true
				}
				return this.getAriaSelected(element, role) === options?.selected
			})
			.filter((element: Element) => {
				if (options?.busy === undefined) {
					return true
				}
				return this.getAriaBusy(element) === options?.busy
			})
			.filter((element: Element) => {
				if (options?.expanded === undefined) {
					return true
				}
				return this.getAriaExpanded(element, role) === options?.expanded
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
		const computedAccessibleName = computeAccessibleName(element)
		return computedAccessibleName
	}
	private getAriaPressed(element: Element, role: string): AriaPressedValue {
		return getAriaPressedInternal(element, role)
	}
	private getAriaSelected(element: Element, role: string): AriaSelectedValue {
		return getAriaSelectedInternal(element, role)
	}
	private getAriaBusy(element: Element): AriaBusyValue {
		return getAriaBusyInternal(element)
	}
	private getAriaExpanded(element: Element, role: string): AriaExpandedValue {
		return getAriaExpandedInternal(element, role)
	}
}

export const createTargetWindow = (window: Window): TargetWindow => {
	return new TargetWindow(window)
}
