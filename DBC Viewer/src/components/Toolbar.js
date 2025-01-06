import { saveAs } from 'file-saver';

export class Toolbar {
  constructor({ onNew, onOpen, onSave, onUndo, onRedo, onClear, onThemeToggle }) {
    this.callbacks = { onNew, onOpen, onSave, onUndo, onRedo, onClear, onThemeToggle };
    this.container = document.getElementById('toolbar');
    this.render();
    this.setupHandlers();
  }

  render() {
    const toolbar = document.createElement('div');
    toolbar.className = 'flex items-center gap-2 p-2 bg-white dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700';
    
    toolbar.innerHTML = `
      <button id="newBtn" class="toolbar-btn">
        <i class="fas fa-file"></i> New
      </button>
      <label for="fileInput" class="toolbar-btn cursor-pointer">
        <i class="fas fa-folder-open"></i> Open
      </label>
      <button id="saveBtn" class="toolbar-btn">
        <i class="fas fa-save"></i> Save
      </button>
      <div class="h-4 border-r border-gray-300 dark:border-gray-700 mx-2"></div>
      <button id="undoBtn" class="toolbar-btn">
        <i class="fas fa-undo"></i> Undo
      </button>
      <button id="redoBtn" class="toolbar-btn">
        <i class="fas fa-redo"></i> Redo
      </button>
      <button id="clearBtn" class="toolbar-btn">
        <i class="fas fa-trash"></i> Clear
      </button>
      <div class="flex-1"></div>
      <button id="themeBtn" class="toolbar-btn">
        <i class="fas fa-moon"></i>
      </button>
      <input type="file" id="fileInput" accept=".dbc" class="hidden">
    `;

    this.container.innerHTML = '';
    this.container.appendChild(toolbar);
  }

  setupHandlers() {
    const fileInput = document.getElementById('fileInput');
    
    document.getElementById('newBtn').onclick = () => this.callbacks.onNew?.();
    fileInput.onchange = (e) => {
      const file = e.target.files?.[0];
      if (file) {
        this.callbacks.onOpen?.(file);
        fileInput.value = '';
      }
    };
    document.getElementById('saveBtn').onclick = () => this.callbacks.onSave?.();
    document.getElementById('undoBtn').onclick = () => this.callbacks.onUndo?.();
    document.getElementById('redoBtn').onclick = () => this.callbacks.onRedo?.();
    document.getElementById('clearBtn').onclick = () => this.callbacks.onClear?.();
    document.getElementById('themeBtn').onclick = () => this.callbacks.onThemeToggle?.();
  }
}