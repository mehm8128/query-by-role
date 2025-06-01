export const stringOrNullToBoolean = (value: string | null): boolean => {
	if (value === 'true') {
		return true
	}
	if (value === 'false' || value === null) {
		return false
	}
	throw new Error(`Invalid boolean string: ${value}`)
}
