export class FileUploader {
  constructor(onFileSelected) {
    this.onFileSelected = onFileSelected;
    this.setupDropZone();
  }

  setupDropZone() {
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');

    dropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropZone.classList.add('border-blue-500');
    });

    dropZone.addEventListener('dragleave', () => {
      dropZone.classList.remove('border-blue-500');
    });

    dropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropZone.classList.remove('border-blue-500');
      const files = e.dataTransfer.files;
      if (files.length) {
        this.handleFile(files[0]);
      }
    });

    fileInput.addEventListener('change', (e) => {
      if (e.target.files.length) {
        this.handleFile(e.target.files[0]);
      }
    });
  }

  handleFile(file) {
    if (file.name.endsWith('.dbc')) {
      this.onFileSelected(file);
    } else {
      alert('Please select a .dbc file');
    }
  }
}