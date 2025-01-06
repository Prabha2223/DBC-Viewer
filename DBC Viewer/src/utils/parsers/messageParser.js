export function parseMessages(text) {
  const messages = new Map();
  const messageRegex = /BO_ (\d+) (\w+) *: (\d+) (\w+)/g;
  let match;

  while ((match = messageRegex.exec(text)) !== null) {
    try {
      const id = parseInt(match[1]);
      if (isNaN(id)) {
        console.warn(`Invalid message ID: ${match[1]}`);
        continue;
      }

      messages.set(id, {
        idDecimal: id,
        idHex: id.toString(16).toUpperCase().padStart(8, '0'),
        name: match[2] || 'Unnamed',
        dlc: parseInt(match[3]) || 0,
        txNode: match[4] || '',
        frameFormat: id > 0x7FF ? 'Extended' : 'Standard',
        pgnDecimal: calculatePGN(id),
        pgnHex: calculatePGN(id).toString(16).toUpperCase().padStart(2, '0'),
        signals: [],
        comment: '',
        attributes: ''
      });
    } catch (error) {
      console.warn(`Failed to parse message: ${match[0]}`, error);
    }
  }

  return messages;
}

function calculatePGN(id) {
  if (id > 0x7FF) { // Extended frame
    return (id >> 8) & 0x1FFFF;
  }
  return id; // Standard frame
}