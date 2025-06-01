import { type ARIARoleDefinitionKey, roles } from 'aria-query'
import type {
	AriaBusyValue,
	AriaExpandedValue,
	AriaPressedValue,
	AriaSelectedValue
} from './types'
import { stringOrNullToBoolean } from './utils/stringOrNullToBoolean'

// ref: https://www.w3.org/TR/html-aam-1.0/#html-attribute-state-and-property-mappings

export const getAriaPressedInternal = (
	element: Element,
	role: string
): AriaPressedValue => {
	const ariaAttributeForRole = roles.get(role as ARIARoleDefinitionKey)
	if (ariaAttributeForRole?.props['aria-pressed'] === undefined) {
		return false
	}

	const ariaPressed = element.getAttribute('aria-pressed')
	if (ariaPressed === 'mixed') {
		return 'mixed'
	}
	return stringOrNullToBoolean(ariaPressed)
}

export const getAriaSelectedInternal = (
	element: Element,
	role: string
): AriaSelectedValue => {
	if (element.tagName.toLowerCase() === 'option') {
		return (element as HTMLOptionElement).selected
	}

	const ariaAttributeForRole = roles.get(role as ARIARoleDefinitionKey)
	if (ariaAttributeForRole?.props['aria-selected'] === undefined) {
		return false
	}

	const ariaSelected = element.getAttribute('aria-selected')
	return stringOrNullToBoolean(ariaSelected)
}

export const getAriaBusyInternal = (element: Element): AriaBusyValue => {
	const ariaSelected = element.getAttribute('aria-busy')
	return stringOrNullToBoolean(ariaSelected)
}

export const getAriaExpandedInternal = (
	element: Element,
	role: string
): AriaExpandedValue => {
	if (element.tagName.toLowerCase() === 'details') {
		return (element as HTMLDetailsElement).open
	}

	const ariaAttributeForRole = roles.get(role as ARIARoleDefinitionKey)
	if (ariaAttributeForRole?.props['aria-expanded'] === undefined) {
		return false
	}
	// NOTE: undefined(ここではnull)とfalseは厳密には違うが、今回は一緒にしてしまってOK
	const ariaExpanded = element.getAttribute('aria-expanded')
	return stringOrNullToBoolean(ariaExpanded)
}
