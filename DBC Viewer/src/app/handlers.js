export class AppHandlers {
  constructor(state) {
    this.state = state;
  }

  async handleOpen(file) {
    try {
      const statusBar = document.getElementById('status-bar');
      statusBar.textContent = 'Loading file...';
      
      const data = await this.state.components.dbcParser.parse(file);
      console.log('App - Parsed file data:', data);
      
      this.state.pushToUndoStack();
      this.state.currentData = data;
      this.state.selectedMessage = null;
      this.state.redoStack = [];
      
      this.updateUI();
      statusBar.textContent = `Loaded ${file.name}`;
    } catch (error) {
      console.error('Error processing file:', error);
      document.getElementById('status-bar').textContent = `Error: ${error.message}`;
    }
  }

  handleMessageSelect(message) {
    if (!message) return;
    
    console.log('App - Handling message selection:', message);
    const selectedMessage = this.state.currentData.messages.find(
      m => m.idDecimal === message.idDecimal
    );
    
    if (selectedMessage) {
      this.state.selectedMessage = selectedMessage;
      if (Array.isArray(selectedMessage.signals)) {
        console.log('App - Setting signals for selected message:', selectedMessage.signals);
        this.state.components.signalTable.setSignals(selectedMessage.signals);
        this.state.components.messageTable.selectMessage(selectedMessage);
        this.state.components.sidebar.selectMessage(selectedMessage);
      } else {
        console.warn('Selected message has no signals array:', selectedMessage);
        this.state.components.signalTable.setSignals([]);
      }
    }
  }

  handleNew() {
    this.state.pushToUndoStack();
    this.state.currentData = { messages: [], signals: [] };
    this.state.selectedMessage = null;
    this.state.redoStack = [];
    this.updateUI();
    document.getElementById('status-bar').textContent = 'New file created';
  }

  handleSave() {
    try {
      if (!this.state.currentData?.messages?.length) {
        throw new Error('No data to save');
      }
      
      this.state.components.dbfConverter.convertToDBF(this.state.currentData);
      document.getElementById('status-bar').textContent = 'File saved successfully';
    } catch (error) {
      console.error('Error saving file:', error);
      document.getElementById('status-bar').textContent = `Error: ${error.message}`;
    }
  }

  handleUndo() {
    if (this.state.undoStack.length > 0) {
      this.state.redoStack.push(JSON.parse(JSON.stringify(this.state.currentData)));
      this.state.currentData = this.state.undoStack.pop();
      this.state.selectedMessage = null;
      this.updateUI();
      document.getElementById('status-bar').textContent = 'Undo successful';
    }
  }

  handleRedo() {
    if (this.state.redoStack.length > 0) {
      this.state.pushToUndoStack();
      this.state.currentData = this.state.redoStack.pop();
      this.state.selectedMessage = null;
      this.updateUI();
      document.getElementById('status-bar').textContent = 'Redo successful';
    }
  }

  updateUI() {
    console.log('App - Updating UI with data:', this.state.currentData);
    this.state.components.messageTable.setMessages(this.state.currentData.messages);
    this.state.components.sidebar.setMessages(this.state.currentData.messages);
    
    if (this.state.selectedMessage) {
      const message = this.state.currentData.messages.find(
        m => m.idDecimal === this.state.selectedMessage.idDecimal
      );
      if (message) {
        console.log('App - Selected message signals:', message.signals);
        this.state.components.signalTable.setSignals(message.signals || []);
        this.state.components.messageTable.selectMessage(message);
        this.state.components.sidebar.selectMessage(message);
      } else {
        this.state.components.signalTable.setSignals([]);
        this.state.selectedMessage = null;
      }
    } else {
      this.state.components.signalTable.setSignals([]);
    }
  }
}