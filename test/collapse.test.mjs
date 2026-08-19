import assert           from 'node:assert/strict'
import { beforeEach }   from 'node:test'
import { describe }     from 'node:test'
import { it }           from 'node:test'
import { collapse }     from '../collapse.js'

class ClassList
{
	classes = new Set

	contains(className)
	{
		return this.classes.has(className)
	}

	remove(className)
	{
		this.classes.delete(className)
	}

	toggle(className)
	{
		if (this.classes.has(className)) {
			this.classes.delete(className)
			return false
		}
		this.classes.add(className)
		return true
	}
}

class Element
{
	anchors = []
	classList = new ClassList
	listeners = new Map

	constructor(parentElement)
	{
		this.parentElement = parentElement
	}

	addEventListener(event, listener)
	{
		this.listeners.set(event, listener)
	}

	click()
	{
		this.listeners.get('click')?.call(this)
	}

	closest()
	{
		return this.parentElement
	}

	querySelectorAll()
	{
		return this.anchors
	}
}

let anchor
let container
let toggle

beforeEach(() => {
	anchor = new Element
	container = new Element
	container.anchors = [anchor]
	toggle = new Element(container)
	globalThis.window = { innerWidth: 600 }
})

describe('collapse', () => {
	it('keeps a small-viewport container collapsed by default', () => {
		collapse(toggle)

		assert.equal(container.classList.contains('expand'), false)
	})

	it('expands and collapses the container on a small viewport', () => {
		collapse(toggle)

		toggle.click()
		assert.equal(container.classList.contains('expand'), true)

		toggle.click()
		assert.equal(container.classList.contains('expand'), false)
	})

	it('collapses the container after a contained link is activated', () => {
		collapse(toggle)
		toggle.click()

		anchor.click()

		assert.equal(container.classList.contains('expand'), false)
	})

	it('collapses and expands the container on a large viewport', () => {
		window.innerWidth = 601
		collapse(toggle)

		toggle.click()
		assert.equal(container.classList.contains('collapse'), true)

		toggle.click()
		assert.equal(container.classList.contains('collapse'), false)
	})
})
