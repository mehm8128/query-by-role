import { type ARIARoleDefinitionKey, roles } from 'aria-query'
import type { AriaPressedValue } from './types'

export const getAriaPressedInternal = (
	element: Element,
	role: string
): AriaPressedValue => {
	const ariaAttributeForRole = roles.get(role as ARIARoleDefinitionKey)
	if (ariaAttributeForRole?.props['aria-pressed'] === undefined) {
		return false
	}

	const ariaPressed = element.getAttribute('aria-pressed')
	if (ariaPressed === 'true') {
		return true
	}
	if (ariaPressed === 'mixed') {
		return 'mixed'
	}
	return false
}
