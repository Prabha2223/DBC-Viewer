import { Toolbar } from '../components/Toolbar';
import { MessageTable } from '../components/MessageTable';
import { SignalTable } from '../components/SignalTable';
import { Sidebar } from '../components/Sidebar';
import { DBCParser } from '../utils/dbcParser';
import { DBFConverter } from '../utils/dbfConverter';
import { ThemeManager } from '../utils/themeManager';

export function initializeApp(state, handlers) {
  const themeManager = new ThemeManager();
  const dbcParser = new DBCParser();
  const dbfConverter = new DBFConverter();

  const components = {
    toolbar: new Toolbar({
      onNew: () => handlers.handleNew(),
      onOpen: (file) => handlers.handleOpen(file),
      onSave: () => handlers.handleSave(),
      onUndo: () => handlers.handleUndo(),
      onRedo: () => handlers.handleRedo(),
      onClear: () => handlers.handleNew(),
      onThemeToggle: () => themeManager.toggleDarkMode(),
    }),
    messageTable: new MessageTable(document.getElementById('message-table')),
    signalTable: new SignalTable(document.getElementById('signal-table')),
    sidebar: new Sidebar(
      document.getElementById('sidebar'),
      (message) => handlers.handleMessageSelect(message)
    ),
    dbcParser,
    dbfConverter,
    themeManager
  };

  components.messageTable.onRowSelect = (message) => handlers.handleMessageSelect(message);
  
  state.setComponents(components);
}