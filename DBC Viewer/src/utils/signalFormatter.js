export function formatSignal(signal) {
  if (!signal || typeof signal !== 'object') return null;

  return {
    name: signal.name || '',
    type: signal.type || '',
    byteOrder: signal.byteOrder || '',
    mode: signal.mode || '',
    startBit: signal.startBit || '',
    length: signal.length || '',
    factor: signal.factor || '',
    offset: signal.offset || '',
    minimum: signal.minimum || '',
    maximum: signal.maximum || '',
    unit: signal.unit || '',
    comment: signal.comment || '',
    values: Array.isArray(signal.values) ? signal.values : []
  };
}