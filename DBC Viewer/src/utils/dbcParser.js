import { parseMessages } from './parsers/messageParser';
import { parseSignals } from './parsers/signalParser';
import { parseValueDescriptions } from './parsers/valueParser';

export class DBCParser {
  constructor() {
    this.data = null;
  }

  async parse(file) {
    if (!file) {
      throw new Error('No file provided');
    }

    if (!file.name.endsWith('.dbc')) {
      throw new Error('Invalid file type. Please select a .dbc file');
    }

    try {
      const text = await this.readFile(file);
      if (!text.trim()) {
        throw new Error('File is empty');
      }

      const messagesMap = parseMessages(text);
      if (messagesMap.size === 0) {
        throw new Error('No valid messages found in the file');
      }

      parseSignals(text, messagesMap);
      parseValueDescriptions(text, messagesMap);
      
      const messages = Array.from(messagesMap.values());
      console.log('Parsed messages:', messages);
      
      return { messages, signals: [] };
    } catch (error) {
      console.error('Error parsing DBC file:', error.message);
      throw new Error(`Failed to parse DBC file: ${error.message}`);
    }
  }

  async readFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    });
  }
}