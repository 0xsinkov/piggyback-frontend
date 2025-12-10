export const capitalizeFirstLetter = (text: string): string =>
  text ? text.charAt(0).toUpperCase() + text.slice(1) : '';

export const lowercaseFirstLetter = (text: string): string =>
  text ? text.charAt(0).toLowerCase() + text.slice(1) : '';
