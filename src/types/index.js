export const LekarData = {
  tími: null, // time
  aðvarun: false, // bool - aviso
  styrkur: 1, // [1, 2, 3] - intensidad
  þörf: 0, // [0, 1, 2] - necesidad
};

export const UpplýsingarData = {
  hvar: '', // string - donde
  ki: 0, // integer - renamed from kaffi
  áfengi: false, // bool - alcohol
  æfing: 0, // [0, 1, 2] - ejercicio
  sðl: false, // bool - renamed from seðl
  'lip-riv': null, // time - labio-riv?
  'síð lio': null, // time - última lio?
  kvöldmatur: null, // time - renamed from kvöldmat
  'síð lát': null, // time - último lát
  'að sofa': null, // time - ir a dormir
  natft: false, // bool - nat ft?
  bl: false, // bool - bl?
  pap: false, // bool - pap?
};

export const LátData = {
  tími: null, // time
  flaedi: 0, // [0, 1, 2] - flow intensity
};

export const DailyRecord = {
  date: '', // "2025-08-01"
  upplýsingar: UpplýsingarData,
  lekar: [], // Array of LekarData
  lát: [], // Array of LátData
  'fjöldi leka': 0, // calculated automatically
  athugasemd: '', // string - comentarios
};