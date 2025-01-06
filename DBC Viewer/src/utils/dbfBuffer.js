import { DBF_FIELDS } from './dbfTypes';

export function createDBFBuffer(records) {
  // Calculate sizes
  const headerSize = 32;
  const fieldDescriptorSize = 32 * DBF_FIELDS.length;
  const headerTerminator = 1;
  const totalHeaderSize = headerSize + fieldDescriptorSize + headerTerminator;
  
  // Calculate record size (including deletion flag byte)
  const recordSize = 1 + DBF_FIELDS.reduce((size, field) => size + field.size, 0);
  
  // Calculate total file size
  const totalSize = totalHeaderSize + (recordSize * records.length) + 1; // +1 for EOF marker
  
  // Create buffer
  const buffer = new ArrayBuffer(totalSize);
  const view = new DataView(buffer);
  let offset = 0;
  
  // Write file header (32 bytes)
  view.setUint8(offset++, 0x03); // Version - dBASE III
  
  // Write last update date
  const now = new Date();
  view.setUint8(offset++, now.getFullYear() - 1900);
  view.setUint8(offset++, now.getMonth() + 1);
  view.setUint8(offset++, now.getDate());
  
  // Write number of records (4 bytes)
  view.setUint32(offset, records.length, true);
  offset += 4;
  
  // Write header size (2 bytes)
  view.setUint16(offset, totalHeaderSize, true);
  offset += 2;
  
  // Write record size (2 bytes)
  view.setUint16(offset, recordSize, true);
  offset += 2;
  
  // Reserved bytes (20 bytes)
  offset += 20;
  
  // Write field descriptors
  DBF_FIELDS.forEach(field => {
    // Field name (11 bytes)
    const nameBytes = new TextEncoder().encode(field.name.padEnd(10, '\0'));
    for (let i = 0; i < 11; i++) {
      view.setUint8(offset++, i < nameBytes.length ? nameBytes[i] : 0);
    }
    
    // Field type (1 byte)
    view.setUint8(offset++, field.type.charCodeAt(0));
    
    // Field data address (4 bytes) - unused, set to 0
    offset += 4;
    
    // Field length (1 byte)
    view.setUint8(offset++, field.size);
    
    // Decimal count (1 byte)
    view.setUint8(offset++, field.decimals || 0);
    
    // Reserved bytes (14 bytes)
    offset += 14;
  });
  
  // Header terminator
  view.setUint8(offset++, 0x0D);
  
  // Write records
  records.forEach(record => {
    // Record deletion flag
    view.setUint8(offset++, 0x20);
    
    // Write field values
    DBF_FIELDS.forEach(field => {
      const value = String(record[field.name] || '').padEnd(field.size, ' ');
      const bytes = new TextEncoder().encode(value.slice(0, field.size));
      for (let i = 0; i < field.size; i++) {
        view.setUint8(offset++, i < bytes.length ? bytes[i] : 0x20);
      }
    });
  });
  
  // EOF marker
  view.setUint8(offset, 0x1A);
  
  return buffer;
}