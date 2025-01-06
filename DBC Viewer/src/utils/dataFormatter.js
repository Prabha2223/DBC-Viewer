import { DBF_FIELDS } from './dbfTypes';

// Format DBC data to match DBF field structure
export function formatDBCData(dbcData) {
  if (!dbcData?.messages?.length) {
    return [];
  }

  return dbcData.messages.map(msg => {
    const record = {};
    DBF_FIELDS.forEach(field => {
      switch (field.name) {
        case 'NAME':
          record[field.name] = String(msg.name || '').slice(0, field.size);
          break;
        case 'ID_DEC':
          record[field.name] = Number(msg.idDecimal || 0);
          break;
        case 'ID_HEX':
          record[field.name] = String(msg.idHex || '').slice(0, field.size);
          break;
        case 'PGN_DEC':
          record[field.name] = Number(msg.pgnDecimal || 0);
          break;
        case 'PGN_HEX':
          record[field.name] = String(msg.pgnHex || '').slice(0, field.size);
          break;
        case 'FRAME_FMT':
          record[field.name] = String(msg.frameFormat || '').slice(0, field.size);
          break;
        case 'DLC':
          record[field.name] = Number(msg.dlc || 0);
          break;
        case 'TX_NODE':
          record[field.name] = String(msg.txNode || '').slice(0, field.size);
          break;
        case 'COMMENT':
          record[field.name] = String(msg.comment || '').slice(0, field.size);
          break;
      }
    });
    return record;
  });
}