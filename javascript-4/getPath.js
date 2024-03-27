export const getPath = (element) => {
   /*  if (!(element instanceof Element)) {
        throw new Error('Not HTML Element')
    } */

    const path = []

    while(element.tagName !== 'HTML') {
        let selector = element.tagName.toLowerCase()

        if (element.id) {
            selector += `#${element.id}`
            path.unshift(selector)
            break
        } else if (element.className) {
            selector += `.${element.className}`
        } else {
            const elementIndex = Array.from(element.parentNode.children).indexOf(element)
            selector += `:nth-child(${elementIndex + 1})`
        }
        path.unshift(selector)
        element = element.parentNode
    }

    return path.join(' ')
}
