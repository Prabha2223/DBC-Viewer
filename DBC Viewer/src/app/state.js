export class AppState {
  constructor() {
    this.currentData = {
      messages: [],
      signals: []
    };
    this.undoStack = [];
    this.redoStack = [];
    this.selectedMessage = null;
    this.components = {};
  }

  setComponents(components) {
    this.components = components;
  }

  pushToUndoStack() {
    if (this.currentData) {
      this.undoStack.push(JSON.parse(JSON.stringify(this.currentData)));
      if (this.undoStack.length > 50) {
        this.undoStack.shift();
      }
    }
  }
}