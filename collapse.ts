

const COLLAPSE_CLASS           = 'collapse'
const EXPAND_CLASS             = 'expand'
const SMALL_VIEWPORT_MAX_WIDTH = 600

function isSmallViewport()
{
	return window.innerWidth <= SMALL_VIEWPORT_MAX_WIDTH
}

export function collapse(element: HTMLElement, closestSelector = '')
{
	const closestElement = (element: HTMLElement) =>
		(closestSelector.length ? element.closest(closestSelector) : null) ?? element.parentElement ?? element
	const container = closestElement(element)
	const anchors   = container.querySelectorAll('a')

	anchors.forEach(anchor => anchor.addEventListener('click', () => {
		if (isSmallViewport()) {
			container.classList.remove(EXPAND_CLASS)
		}
	}))

	element.addEventListener('click', () => {
		const containerClass = container.classList
		if (isSmallViewport()) {
			containerClass.remove(COLLAPSE_CLASS)
			containerClass.toggle(EXPAND_CLASS)
		}
		else {
			containerClass.remove(EXPAND_CLASS)
			containerClass.toggle(COLLAPSE_CLASS)
		}
	})
}
