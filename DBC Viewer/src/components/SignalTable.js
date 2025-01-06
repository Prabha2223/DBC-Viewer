export class SignalTable {
  constructor(container) {
    this.container = container;
    this.signals = [];
  }

  setSignals(signals) {
    this.signals = Array.isArray(signals) ? signals : [];
    this.render();
  }

  formatValue(value) {
    if (value === undefined || value === null) return '';
    return value.toString();
  }

  formatValues(values) {
    if (!Array.isArray(values) || values.length === 0) return '';
    
    // Sort values numerically and format horizontally
    return values
      .sort((a, b) => a.value - b.value)
      .map(v => `${v.value}=${v.description}`)
      .join(' | ');
  }

  render() {
    const table = document.createElement('table');
    table.className = 'min-w-full border-collapse';
    
    table.innerHTML = `
      <thead class="bg-gray-900 text-white sticky top-0">
        <tr>
          <th class="signal-header">#</th>
          <th class="signal-header">Name</th>
          <th class="signal-header">Start Bit</th>
          <th class="signal-header">Length</th>
          <th class="signal-header">Byte Order</th>
          <th class="signal-header">Type</th>
          <th class="signal-header">Factor</th>
          <th class="signal-header">Offset</th>
          <th class="signal-header">Min</th>
          <th class="signal-header">Max</th>
          <th class="signal-header">Unit</th>
          <th class="signal-header text-blue-400">Values</th>
        </tr>
      </thead>
      <tbody class="bg-gray-900 text-gray-300">
        ${this.signals.map((signal, index) => `
          <tr class="signal-row">
            <td class="signal-cell text-center">${index + 1}</td>
            <td class="signal-cell">${this.formatValue(signal.name)}</td>
            <td class="signal-cell text-right">${this.formatValue(signal.startBit)}</td>
            <td class="signal-cell text-right">${this.formatValue(signal.length)}</td>
            <td class="signal-cell">${this.formatValue(signal.byteOrder)}</td>
            <td class="signal-cell">${this.formatValue(signal.type)}</td>
            <td class="signal-cell text-right">${this.formatValue(signal.factor)}</td>
            <td class="signal-cell text-right">${this.formatValue(signal.offset)}</td>
            <td class="signal-cell text-right">${this.formatValue(signal.minimum)}</td>
            <td class="signal-cell text-right">${this.formatValue(signal.maximum)}</td>
            <td class="signal-cell">${this.formatValue(signal.unit)}</td>
            <td class="signal-cell values-cell" style="white-space: normal; line-height: 1.4;">
              ${this.formatValues(signal.values)}
            </td>
          </tr>
        `).join('')}
      </tbody>
    `;

    this.container.innerHTML = '';
    this.container.appendChild(table);
  }
}