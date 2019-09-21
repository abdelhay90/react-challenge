export const stops = [
  {
    stationId: '',
    stationName: 'Talaat Harb Axis',
    coordinates: [29.995097117000945, 31.445976804476345].reverse(),
  },
  {
    stationId: '',
    stationName: 'Omar Ibn Abdelaziz',
    coordinates: [30.012880226989733, 31.431022685763764].reverse(),
  },
  {
    stationId: '',
    stationName: '',
    coordinates: [30.016423452010145, 31.43356512343098].reverse(),
  },
  {
    stationId: '',
    stationName: 'Southern Teseen',
    coordinates: [30.016375545253084, 31.39839364118893].reverse(),
  },
  {
    stationId: '',
    stationName: 'El-Shaikh Kamel Khedr',
    coordinates: [30.040987895343214, 31.34613896298947].reverse(),
  },
  {
    stationId: '',
    stationName: 'Ahmed ElZomor',
    coordinates: [30.04505095423728, 31.34143552756268].reverse(),
  },
  {
    stationId: '',
    stationName: 'Mostafa ElNahas',
    coordinates: [30.054089469238654, 31.34217149725646].reverse(),
  },
  {
    stationId: '',
    stationName: 'Makram Ebid',
    coordinates: [30.0619822837204, 31.34523262262769].reverse(),
  },
  {
    stationId: '',
    stationName: 'Makrem Ebeid Ext',
    coordinates: [30.073225027534153, 31.343785066473743].reverse(),
  },
  {
    stationId: '',
    stationName: 'ElThawra St.',
    coordinates: [30.08201257054215, 31.343882169980134].reverse(),
  },
];

export const passengers = [
  {
    id: '5d865ee507bfe196bac94ff3',
    name: 'Bailey Walls',
    status: 'completed',
    paymentMethod: 'cash',
    imageUrl: '/static/images/leo.jpg',
  },
  {
    id: '5d865ee543724f1184914907',
    name: 'Angie Rice',
    status: 'missed',
    paymentMethod: 'cash',
    imageUrl: '/static/images/full-face-1.jpg',
  },
  {
    id: '5d865ee54ec4f96a85fa3dbc',
    name: 'Cecilia Trevino',
    status: 'canceled',
    paymentMethod: 'credit',
    imageUrl: 'static/images/full-face-2.jpg',
  },
  {
    id: '5d865ee5ad0a247f264dd75f',
    name: 'Coffey Fleming',
    status: 'completed',
    paymentMethod: 'cash',
    imageUrl: 'static/images/full-face-2.jpg',
  },
  {
    id: '5d865ee5ecfd4d136af665ba',
    name: 'Stuart Orr',
    status: 'canceled',
    paymentMethod: 'cash',
    imageUrl: '/static/images/leo.jpg',
  },
  {
    id: '5d865ee5b3da2fb19e62a897',
    name: 'Vickie Beard',
    status: 'completed',
    paymentMethod: 'cash',
    imageUrl: '/static/images/full-face-1.jpg',
  },
  {
    id: '5d865ee525b0567a26b1c2f3',
    name: 'Sandra Blackburn',
    status: 'completed',
    paymentMethod: 'cash',
    imageUrl: '/static/images/leo.jpg',
  },
  {
    id: '5d865ee5f18d6587c1cb9ed0',
    name: 'Tia Oneal',
    status: 'canceled',
    paymentMethod: 'credit',
    imageUrl: '/static/images/leo.jpg',
  },
  {
    id: '5d865ee527d6024df9300d92',
    name: 'Marylou Carr',
    status: 'missed',
    paymentMethod: 'credit',
    imageUrl: 'static/images/full-face-2.jpg',
  },
  {
    id: '5d865ee51049173f6c386500',
    name: 'Rowe Rocha',
    status: 'missed',
    paymentMethod: 'credit',
    imageUrl: '/static/images/leo.jpg',
  },
  {
    id: '5d865ee5d0d97ea49d4e5124',
    name: 'Mcconnell Jefferson',
    status: 'completed',
    paymentMethod: 'credit',
    imageUrl: '/static/images/full-face-1.jpg',
  },
  {
    id: '5d865ee580c33a45ed14c2ed',
    name: 'Cook Best',
    status: 'canceled',
    paymentMethod: 'credit',
    imageUrl: '/static/images/full-face-1.jpg',
  },
];

export const trip = {
  id: '123456789',
  distance: 47,
  rateFare: 25,
  driverInfo: {
    carModel: ' TOYOTA HiAce 2019',
    carImageUrl: '/static/images/Toyota-HiAce.jpg',
    driverName: 'Ahmed Abdelhay',
    driverImageUrl: '/static/images/driver-1.jpg',
  },
  path: stops.slice(0),
  passengers: passengers.slice(0),
};
