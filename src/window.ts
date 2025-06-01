import { type ARIARoleDefinitionKey, roleElements } from 'aria-query'
import {
	type QueryByRoleOptions,
	filterElementsByRoleOptions
} from './queryByRole'
import type { QueryResult } from './queryResult'

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
	queryByRole(role: string, options?: QueryByRoleOptions): QueryResult {
		const selector = getSelectorForRole(role)
		const elements = Array.from(this.window.document.querySelectorAll(selector))
		return filterElementsByRoleOptions(role, options, elements)
	}
}

const getSelectorForRole = (role: string) => {
	const explicitRoleSelector = `[role="${role}"]`

	const elementsFromAriaQuery =
		roleElements.get(role as ARIARoleDefinitionKey) ?? new Set()
	const implicitRoleSelectors = Array.from(elementsFromAriaQuery).map(
		({ name }) => name
	)

	return [explicitRoleSelector, ...implicitRoleSelectors].join(',')
}

export const createTargetWindow = (window: Window): TargetWindow => {
	return new TargetWindow(window)
}
