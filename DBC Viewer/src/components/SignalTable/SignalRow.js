import { formatValue, formatSignalValues } from './formatters';

export function renderRow(signal, index) {
  const hasValues = Array.isArray(signal.values) && signal.values.length > 0;

  return `
    <tr class="signal-row">
      <td class="signal-cell" style="text-align: center">${index + 1}</td>
      <td class="signal-cell">${formatValue(signal.name)}</td>
      <td class="signal-cell numeric">${formatValue(signal.startBit)}</td>
      <td class="signal-cell numeric">${formatValue(signal.length)}</td>
      <td class="signal-cell">${formatValue(signal.byteOrder)}</td>
      <td class="signal-cell">${formatValue(signal.type)}</td>
      <td class="signal-cell numeric">${formatValue(signal.factor)}</td>
      <td class="signal-cell numeric">${formatValue(signal.offset)}</td>
      <td class="signal-cell numeric">${formatValue(signal.minimum)}</td>
      <td class="signal-cell numeric">${formatValue(signal.maximum)}</td>
      <td class="signal-cell">${formatValue(signal.unit)}</td>
      <td class="signal-cell values-cell" style="max-width: 300px; white-space: normal">
        ${hasValues ? formatSignalValues(signal.values) : ''}
      </td>
    </tr>
  `;
}