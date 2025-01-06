export function parseValueDescriptions(text, messages) {
  const lines = text.split('\n');
  let currentValues = [];

  for (const line of lines) {
    const match = line.match(/VAL_ (\d+) (\w+)\s+(.*);/);
    if (match) {
      const messageId = parseInt(match[1]);
      const signalName = match[2];
      const valueString = match[3];
      
      const message = messages.get(messageId);
      if (message) {
        const signal = message.signals.find(s => s.name === signalName);
        if (signal) {
          signal.values = parseValues(valueString);
          console.log(`Parsed values for signal ${signalName}:`, signal.values);
        }
      }
    }
  }
}

function parseValues(valueString) {
  const values = [];
  const regex = /(\d+)\s+"([^"]*)"/g;
  let match;

  while ((match = regex.exec(valueString)) !== null) {
    values.push({
      value: parseInt(match[1]),
      description: match[2].trim()
    });
  }

  return values;
}