import { renderHeader } from './SignalHeader';
import { renderRow } from './SignalRow';
import { ValuesDialog } from './ValuesDialog';
import './SignalTable.css';

export class SignalTable {
  constructor(container) {
    this.container = container;
    this.signals = [];
    this.valuesDialog = new ValuesDialog();
    this.setupEventListeners();
  }

  setupEventListeners() {
    this.container.addEventListener('click', (e) => {
      const valuesBtn = e.target.closest('.values-btn');
      if (valuesBtn) {
        const index = parseInt(valuesBtn.dataset.signalIndex);
        const signal = this.signals[index];
        if (signal && Array.isArray(signal.values)) {
          this.valuesDialog.show(signal.values);
        }
      }
    });
  }

  setSignals(signals) {
    this.signals = Array.isArray(signals) ? signals : [];
    this.render();
  }

  render() {
    const table = document.createElement('table');
    table.className = 'signal-table';
    
    table.innerHTML = `
      ${renderHeader()}
      <tbody>
        ${this.signals.map((signal, index) => renderRow(signal, index)).join('')}
      </tbody>
    `;

    this.container.innerHTML = '';
    this.container.appendChild(table);
  }
}