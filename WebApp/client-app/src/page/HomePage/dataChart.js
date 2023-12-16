export const data = [
  {
    type: "ngay 1",
    sales: 29,
  },
  {
    type: "ngay 2",
    sales: 22,
  },
  {
    type: "ngay 3",
    sales: 23,
  },
  {
    type: "ngay 4",
    sales: 21,
  },
  {
    type: "ngay 5",
    sales: 20,
  },
  {
    type: "ngay 6",
    sales: 27,
  },
  {
    type: "ngay 7",
    sales: 26,
  },
];

export const rooms = [
  {
    roomId: "1",
    roomName: "Living room",
    device: [
      { deviceId: "1", deviceName: "Light", sensorID: "light-1" },
      { deviceId: "2", deviceName: "Fan", sensorID: "fan-1" },
      { deviceId: "3", deviceName: "Door", sensorID: "door-1" },
    ],
  },
  {
    roomId: "2",
    roomName: "Kitchen",
    device: [
      { deviceId: "1", deviceName: "Light", sensorID: "light-1" },
      { deviceId: "2", deviceName: "Fan", sensorID: "fan-1" },
      { deviceId: "3", deviceName: "Door", sensorID: "door-1" },
    ],
  },
  {
    roomId: "3",
    roomName: "Bedroom",
    device: [
      { deviceId: "1", deviceName: "Light", sensorID: "light-1" },
      { deviceId: "2", deviceName: "Fan", sensorID: "fan-1" },
      { deviceId: "3", deviceName: "Door", sensorID: "door-1" },
    ],
  },
];

export const sensor = [
  {
    Id: "light-1",
    // status: true,
    data: 100,
  },
  {
    Id: "fan-1",
    // status: false,
    data: 100,
  },
  {
    Id: "door-1",
    // status: true,
    data: 100,
  },
];
