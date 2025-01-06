export class DataViewer {
  constructor(container) {
    this.container = container;
  }

  displayData(data) {
    const table = document.createElement('table');
    table.className = 'min-w-full divide-y divide-gray-200';
    
    // Create table header
    const thead = document.createElement('thead');
    thead.className = 'bg-gray-50';
    const headerRow = document.createElement('tr');
    
    // Assuming first row contains headers
    if (data.length > 0) {
      data[0].forEach((header, index) => {
        const th = document.createElement('th');
        th.className = 'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider';
        th.textContent = `Column ${index + 1}`;
        headerRow.appendChild(th);
      });
    }
    
    thead.appendChild(headerRow);
    table.appendChild(thead);
    
    // Create table body
    const tbody = document.createElement('tbody');
    tbody.className = 'bg-white divide-y divide-gray-200';
    
    data.forEach((row, rowIndex) => {
      const tr = document.createElement('tr');
      tr.className = rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50';
      
      row.forEach(cell => {
        const td = document.createElement('td');
        td.className = 'px-6 py-4 whitespace-nowrap text-sm text-gray-500';
        td.textContent = cell;
        tr.appendChild(td);
      });
      
      tbody.appendChild(tr);
    });
    
    table.appendChild(tbody);
    
    // Clear and update container
    this.container.innerHTML = '';
    this.container.appendChild(table);
  }
}