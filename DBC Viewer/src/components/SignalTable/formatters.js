export function formatValue(value) {
  if (value === undefined || value === null) return '';
  return value.toString();
}

export function formatSignalValues(values) {
  if (!Array.isArray(values) || values.length === 0) return '';
  
  // Sort values numerically
  const sortedValues = [...values].sort((a, b) => a.value - b.value);
  
  // Format as "value=description" with pipe separator
  return sortedValues
    .map(v => `${v.value}=${v.description}`)
    .join(' , ');
}