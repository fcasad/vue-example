export const isObject = val => typeof val === 'object' && val !== null;

export const hasProp = (prop, obj) => isObject(obj) && obj[prop] !== undefined;

export const isOption = val => hasProp('label', val) && hasProp('value', val);

export const isOptionsArray = val => Array.isArray(val) && val.every(isOption);