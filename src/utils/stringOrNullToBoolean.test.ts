import { stringOrNullToBoolean } from './stringOrNullToBoolean'

describe('stringOrNullToBoolean', () => {
	describe('stringOrNullToBoolean', () => {
		it('should return true for "true"', () => {
			expect(stringOrNullToBoolean('true')).toBe(true)
		})
		it('should return false for "false"', () => {
			expect(stringOrNullToBoolean('false')).toBe(false)
		})
		it('should return false for null', () => {
			expect(stringOrNullToBoolean(null)).toBe(false)
		})
		it('should throw an error for invalid strings', () => {
			expect(() => stringOrNullToBoolean('invalid')).toThrow(
				'Invalid boolean string: invalid'
			)
		})
	})
})
