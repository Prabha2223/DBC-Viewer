export function renderHeader() {
  return `
    <thead>
      <tr>
        <th class="signal-header-cell" style="width: 40px">#</th>
        <th class="signal-header-cell">Name</th>
        <th class="signal-header-cell">Start Bit</th>
        <th class="signal-header-cell">Length</th>
        <th class="signal-header-cell">Byte Order</th>
        <th class="signal-header-cell">Type</th>
        <th class="signal-header-cell">Factor</th>
        <th class="signal-header-cell">Offset</th>
        <th class="signal-header-cell">Min</th>
        <th class="signal-header-cell">Max</th>
        <th class="signal-header-cell">Unit</th>
        <th class="signal-header-cell" style="color: #4299e1">Values</th>
      </tr>
    </thead>
  `;
}