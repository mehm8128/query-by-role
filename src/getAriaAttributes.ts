import { type ARIARoleDefinitionKey, roles } from 'aria-query'
import {
	computeAccessibleDescription,
	computeAccessibleName
} from 'dom-accessibility-api'
import type {
	AriaBusyValue,
	AriaCurrentValue,
	AriaExpandedValue,
	AriaInvalidValue,
	AriaPressedValue,
	AriaSelectedValue
} from './types'
import { stringOrNullToBoolean } from './utils/stringOrNullToBoolean'

// ref: https://www.w3.org/TR/html-aam-1.0/#html-attribute-state-and-property-mappings

export const getAccessibleName = (element: Element) => {
	const computedAccessibleName = computeAccessibleName(element)
	return computedAccessibleName
}
export const getAccessibleDescription = (element: Element) => {
	const computedAccessibleDescription = computeAccessibleDescription(element)
	return computedAccessibleDescription
}

export const getAriaPressed = (
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

export const getAriaSelected = (
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

export const getAriaBusy = (element: Element): AriaBusyValue => {
	const ariaSelected = element.getAttribute('aria-busy')
	return stringOrNullToBoolean(ariaSelected)
}

export const getAriaExpanded = (
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

export const getAriaInvalid = (
	element: Element,
	role: string
): AriaInvalidValue => {
	const ariaAttributeForRole = roles.get(role as ARIARoleDefinitionKey)
	if (ariaAttributeForRole?.props['aria-invalid'] === undefined) {
		return 'false'
	}

	const ariaInvalid = element.getAttribute('aria-invalid')
	if (
		!ariaInvalid ||
		ariaInvalid.trim() === '' ||
		ariaInvalid.toLocaleLowerCase() === 'false'
	)
		return 'false'
	if (
		ariaInvalid === 'true' ||
		ariaInvalid === 'grammar' ||
		ariaInvalid === 'spelling'
	)
		return ariaInvalid
	return 'true'
}

export const getAriaCurrent = (
	element: Element,
	role: string
): AriaCurrentValue => {
	const ariaCurrent = element.getAttribute(
		'aria-current'
	) as AriaCurrentValue | null

	return ariaCurrent ?? false
}
