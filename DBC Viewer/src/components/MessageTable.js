export class MessageTable {
  constructor(container) {
    this.container = container;
    this.messages = [];
    this.selectedRow = null;
    this.onRowSelect = null;
  }

  setMessages(messages) {
    console.log('MessageTable - Setting messages:', messages);
    this.messages = Array.isArray(messages) ? messages : [];
    this.selectedRow = null;
    this.render();
  }

  selectMessage(message) {
    if (!message) return;
    
    const index = this.messages.findIndex(msg => msg.idDecimal === message.idDecimal);
    if (index !== -1 && index !== this.selectedRow) {
      this.selectedRow = index;
      this.render();
    }
  }

  render() {
    const table = document.createElement('table');
    table.className = 'w-full text-sm border-collapse';
    
    table.innerHTML = `
      <thead class="bg-gray-100 dark:bg-gray-800 sticky top-0">
        <tr>
          <th class="table-header">#</th>
          <th class="table-header">Name</th>
          <th class="table-header">ID Decimal</th>
          <th class="table-header">ID HEX</th>
          <th class="table-header">PGN Decimal</th>
          <th class="table-header">PGN HEX</th>
          <th class="table-header">Frame Format</th>
          <th class="table-header">DLC</th>
          <th class="table-header">TX Node</th>
          <th class="table-header">Signals</th>
        </tr>
      </thead>
      <tbody>
        ${this.messages.map((msg, index) => `
          <tr class="table-row ${this.selectedRow === index ? 'bg-blue-100 dark:bg-blue-900' : ''}"
              data-index="${index}">
            <td class="table-cell">${index + 1}</td>
            <td class="table-cell">${msg.name || ''}</td>
            <td class="table-cell">${msg.idDecimal || ''}</td>
            <td class="table-cell">${msg.idHex || ''}</td>
            <td class="table-cell">${msg.pgnDecimal || ''}</td>
            <td class="table-cell">${msg.pgnHex || ''}</td>
            <td class="table-cell">${msg.frameFormat || ''}</td>
            <td class="table-cell">${msg.dlc || ''}</td>
            <td class="table-cell">${msg.txNode || ''}</td>
            <td class="table-cell">${(msg.signals || []).length}</td>
          </tr>
        `).join('')}
      </tbody>
    `;

    this.container.innerHTML = '';
    this.container.appendChild(table);

    table.querySelectorAll('tbody tr').forEach(row => {
      row.addEventListener('click', () => {
        const index = parseInt(row.dataset.index);
        const message = this.messages[index];
        if (message && this.onRowSelect && index !== this.selectedRow) {
          console.log('MessageTable - Selected message:', message);
          this.onRowSelect(message);
        }
      });
    });
  }
}