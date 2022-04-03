export default {
  isDOM: value => value instanceof Element,
  isObject: value => typeof value === 'object',
  isStr: value => typeof value === 'string',
  camel2Kebab: string => string.split('').map(s => s === s.toUpperCase() ? `-${s.toLowerCase()}` : s).join('')
};