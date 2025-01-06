// Define DBF field structure
export const DBF_FIELDS = [
  { name: 'NAME', type: 'C', size: 30 },
  { name: 'ID_DEC', type: 'N', size: 10, decimals: 0 },
  { name: 'ID_HEX', type: 'C', size: 8 },
  { name: 'PGN_DEC', type: 'N', size: 10, decimals: 0 },
  { name: 'PGN_HEX', type: 'C', size: 8 },
  { name: 'FRAME_FMT', type: 'C', size: 10 },
  { name: 'DLC', type: 'N', size: 2, decimals: 0 },
  { name: 'TX_NODE', type: 'C', size: 20 },
  { name: 'COMMENT', type: 'C', size: 254 }
];