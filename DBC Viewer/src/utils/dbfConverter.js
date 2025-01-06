import { saveAs } from 'file-saver';
import { createDBFBuffer } from './dbfBuffer';
import { formatDBCData } from './dataFormatter';

export class DBFConverter {
  convertToDBF(dbcData) {
    try {
      const records = formatDBCData(dbcData);
      
      if (records.length === 0) {
        throw new Error('No data to convert');
      }

      const buffer = createDBFBuffer(records);
      const blob = new Blob([buffer], { type: 'application/x-dbf' });
      saveAs(blob, 'converted.dbf');
    } catch (error) {
      console.error('Error converting to DBF:', error);
      throw error;
    }
  }
}