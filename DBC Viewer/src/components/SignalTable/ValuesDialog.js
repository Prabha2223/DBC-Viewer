export class ValuesDialog {
  constructor() {
    this.dialog = this.createDialog();
    document.body.appendChild(this.dialog);
  }

  createDialog() {
    const dialog = document.createElement('div');
    dialog.className = 'fixed inset-0 bg-black bg-opacity-50 hidden flex items-center justify-center z-50';
    dialog.innerHTML = `
      <div class="bg-gray-800 rounded-lg shadow-xl w-[600px] text-gray-100">
        <div class="flex items-center justify-between p-4 border-b border-gray-700">
          <h3 class="text-lg font-semibold">Signal Values</h3>
          <button class="close-btn text-gray-400 hover:text-gray-200">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="p-4">
          <div class="values-container max-h-[400px] overflow-y-auto">
            <table class="w-full border-collapse">
              <thead>
                <tr class="bg-gray-900">
                  <th class="p-2 border border-gray-700 text-left w-16">Value</th>
                  <th class="p-2 border border-gray-700 text-left">Description</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>
        </div>
        <div class="flex justify-end gap-2 p-4 border-t border-gray-700">
          <button class="ok-btn px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Close</button>
        </div>
      </div>
    `;

    this.setupEventListeners(dialog);
    return dialog;
  }

  setupEventListeners(dialog) {
    dialog.querySelector('.close-btn').onclick = () => this.hide();
    dialog.querySelector('.ok-btn').onclick = () => this.hide();
    
    // Close on background click
    dialog.addEventListener('click', (e) => {
      if (e.target === dialog) {
        this.hide();
      }
    });
  }

  show(values) {
    if (!Array.isArray(values)) return;
    
    const tbody = this.dialog.querySelector('tbody');
    tbody.innerHTML = values
      .sort((a, b) => a.value - b.value)
      .map(item => `
        <tr class="border-t border-gray-700">
          <td class="p-2 border border-gray-700 text-right font-mono">${item.value}</td>
          <td class="p-2 border border-gray-700">${item.description}</td>
        </tr>
      `).join('');
    
    this.dialog.classList.remove('hidden');
  }

  hide() {
    this.dialog.classList.add('hidden');
  }
}