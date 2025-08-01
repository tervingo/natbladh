export const LekarData = {
  tími: null, // time
  aðvarun: false, // bool - aviso
  styrkur: 1, // [1, 2, 3] - intensidad
  inní: 0, // [0, 1, 2] - dentro
  þörf: 0, // [0, 1, 2] - necesidad
};

export const UpplýsingarData = {
  hvar: '', // string - donde
  kaffi: 0, // integer - cafés
  áfengi: false, // bool - alcohol
  æfing: 0, // [0, 1, 2] - ejercicio
  seðl: false, // bool - sedal?
  'lip-riv': null, // time - labio-riv?
  'síð lio': null, // time - última lio?
  kvöldmat: null, // time - cena
  'að sofa': null, // time - ir a dormir
  natft: false, // bool - nat ft?
  bl: false, // bool - bl?
  pap: false, // bool - pap?
};

export const DailyRecord = {
  date: '', // "2025-08-01"
  lekar: [], // Array of LekarData
  'fjöldi leka': 0, // calculated automatically
  upplýsingar: UpplýsingarData,
  athugasemd: '', // string - comentarios
};