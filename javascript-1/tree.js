import { readFile } from 'fs/promises';
const data = JSON.parse(
  await readFile(
    new URL('./object.json', import.meta.url)
  )
);

export const tree = (data, depth = 0) => {
  const firstSymbol = depth === 0 ? '' : depth === 1 ? '├─' : '│'
  const indentation = `${' '.repeat(depth ? depth - 1 : 0)}${' '.repeat(depth > 2 ? depth - 2 : 0)}`
  const step = depth > 1 ? `└─` : ''
  const resultString = `${firstSymbol}${indentation}${step}${data.name}`

  if (data.name) {
    console.log(resultString)
  }

  if (data.items) {
    data.items.forEach(item => tree(item, depth + 1))
  }
}

//tree(data)
