import {
	getAccessibleDescription,
	getAccessibleName,
	getAriaBusy,
	getAriaExpanded,
	getAriaInvalid,
	getAriaPressed,
	getAriaSelected
} from './getAriaAttributes'
import { QueryResult } from './queryResult'
import type {
	AriaBusyValue,
	AriaExpandedValue,
	AriaInvalidValue,
	AriaPressedValue,
	AriaSelectedValue
} from './types'

export interface QueryByRoleOptions {
	name?: string
	description?: string
	pressed?: AriaPressedValue
	selected?: AriaSelectedValue
	busy?: AriaBusyValue
	expanded?: AriaExpandedValue
	invalid?: AriaInvalidValue
}

export const filterElementsByRoleOptions = (
	role: string,
	options: QueryByRoleOptions | undefined,
	elements: Element[]
): QueryResult => {
	const filteredElements = elements
		.filter((element: Element) => {
			if (options?.name === undefined) {
				return true
			}
			return getAccessibleName(element) === options.name
		})
		.filter((element: Element) => {
			if (options?.description === undefined) {
				return true
			}
			return getAccessibleDescription(element) === options.description
		})
		.filter((element: Element) => {
			if (options?.pressed === undefined) {
				return true
			}
			return getAriaPressed(element, role) === options?.pressed
		})
		.filter((element: Element) => {
			if (options?.selected === undefined) {
				return true
			}
			return getAriaSelected(element, role) === options?.selected
		})
		.filter((element: Element) => {
			if (options?.busy === undefined) {
				return true
			}
			return getAriaBusy(element) === options?.busy
		})
		.filter((element: Element) => {
			if (options?.expanded === undefined) {
				return true
			}
			return getAriaExpanded(element, role) === options?.expanded
		})
		.filter((element: Element) => {
			if (options?.invalid === undefined) {
				return true
			}
			return getAriaInvalid(element, role) === options?.invalid
		})

	return new QueryResult(filteredElements)
}
