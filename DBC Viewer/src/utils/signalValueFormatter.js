export function formatSignalValue(value, description) {
  if (value === undefined || value === null) return '';
  if (description === undefined || description === null) return value.toString();
  return `${value}: ${description}`;
}

export function sortSignalValues(values) {
  if (!Array.isArray(values)) return [];
  return [...values].sort((a, b) => {
    if (typeof a.value === 'number' && typeof b.value === 'number') {
      return a.value - b.value;
    }
    return String(a.value).localeCompare(String(b.value));
  });
}

export function validateSignalValues(values) {
  if (!Array.isArray(values)) return [];
  return values.filter(v => 
    v && typeof v === 'object' && 
    'value' in v && 
    'description' in v
  );
}