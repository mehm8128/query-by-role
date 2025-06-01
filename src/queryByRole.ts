import { getAccessibleName } from './getAriaAttributes'
import {
	getAriaBusy,
	getAriaExpanded,
	getAriaPressed,
	getAriaSelected
} from './getAriaAttributes'
import { QueryResult } from './queryResult'
import type {
	AriaBusyValue,
	AriaExpandedValue,
	AriaPressedValue,
	AriaSelectedValue
} from './types'

export interface QueryByRoleOptions {
	name?: string
	pressed?: AriaPressedValue
	selected?: AriaSelectedValue
	busy?: AriaBusyValue
	expanded?: AriaExpandedValue
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

	return new QueryResult(filteredElements)
}
