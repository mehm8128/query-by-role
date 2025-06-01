export class QueryResult {
	private elements: Element[]
	constructor(elements: Element[]) {
		this.elements = elements
	}
	get length(): number {
		return this.elements.length
	}
	all(): Element[] {
		return this.elements
	}
	first(): Element | null {
		return this.elements[0] ?? null
	}
	nth(index: number): Element | null {
		return this.elements[index] ?? null
	}
	forEach(callback: (element: Element, index: number) => void): void {
		this.elements.forEach(callback)
	}
}
