export function parseSignals(text, messages) {
  let currentMessageId = null;
  const lines = text.split('\n');

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Check for message definition
    const messageMatch = line.match(/^BO_ (\d+)/);
    if (messageMatch) {
      currentMessageId = parseInt(messageMatch[1]);
      continue;
    }
    
    // Check for signal definition
    if (line.startsWith('SG_') && currentMessageId !== null) {
      const signalMatch = line.match(/SG_ (\w+) *: *(\d+)\|(\d+)@([0-1])([+-]) \(([^,]*),([^)]*)\) \[([^|]*)\|([^]]*)\] "([^"]*)"/);
      
      if (signalMatch) {
        const message = messages.get(currentMessageId);
        if (message) {
          const signal = createSignal(signalMatch);
          message.signals.push(signal);
          console.log(`Added signal ${signal.name} to message ${message.name}:`, signal);
        }
      }
    }
  }
}

function createSignal(match) {
  return {
    name: match[1],
    startBit: parseInt(match[2]),
    length: parseInt(match[3]),
    byteOrder: match[4] === '0' ? 'Intel' : 'Motorola',
    type: match[5] === '+' ? 'Unsigned' : 'Signed',
    factor: parseFloat(match[6]) || 1,
    offset: parseFloat(match[7]) || 0,
    minimum: parseFloat(match[8]) || 0,
    maximum: parseFloat(match[9]) || 0,
    unit: match[10],
    mode: 'Signal',
    values: [],
    comment: ''
  };
}