import jsdom from "jsdom"
import { getPath } from './getPath'

const { JSDOM } = jsdom

describe('getPath', () => {
    test('Should return a unique CSS selector', () => {
        const dom = new JSDOM(`
            <html>
                <body>
                    <div id='container'>
                        <div class='someclass'>
                            <ul>
                                <li>
                                    First item
                                </li>
                            </ul>
                        </div>
                    </div>
                </body>
            </html>
        `)
        const element = dom.window.document.querySelector('li')
        const path = getPath(element)
        const elementByPath = dom.window.document.querySelector(path)
        expect(elementByPath.textContent.trim()).toBe('First item')
    })
})
