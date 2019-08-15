// Mock data object used for LineChart and BarChart

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      data: [50, 20, 2, 86, 71, 100],
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
    },
    {
      data: [20, 10, 4, 56, 87, 90],
    },
    {
      data: [30, 90, 67, 54, 10, 2],
    },
  ],
};

// Mock data object used for Contribution Graph

const contributionData = [
  { date: '2016-01-02', count: 1 },
  { date: '2016-01-03', count: 2 },
  { date: '2016-01-04', count: 3 },
  { date: '2016-01-05', count: 4 },
  { date: '2016-01-06', count: 5 },
  { date: '2016-01-30', count: 2 },
  { date: '2016-01-31', count: 3 },
  { date: '2016-03-01', count: 2 },
  { date: '2016-04-02', count: 4 },
  { date: '2016-03-05', count: 2 },
  { date: '2016-02-30', count: 4 },
];

// Mock data object for Pie Chart

const pieChartData = [
  {
    name: 'Seoul',
    population: 21500000,
    color: 'rgba(131, 167, 234, 1)',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Toronto',
    population: 2800000,
    color: '#F00',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Beijing',
    population: 527612,
    color: 'red',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'New York',
    population: 8538000,
    color: '#ffffff',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Moscow',
    population: 11920000,
    color: 'rgb(0, 0, 255)',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
];

// Mock data object for Progress
const stockData = [
  [{
    "x": 0,
    "y": 47782
  }, {
    "x": 1,
    "y": 48497
  }, {
    "x": 2,
    "y": 77128
  }, {
    "x": 3,
    "y": 73413
  }, {
    "x": 4,
    "y": 58257
  }, {
    "x": 5,
    "y": 40579
  }, {
    "x": 6,
    "y": 72893
  }, {
    "x": 7,
    "y": 60663
  }, {
    "x": 8,
    "y": 15715
  }, {
    "x": 9,
    "y": 40305
  }, {
    "x": 10,
    "y": 68592
  }, {
    "x": 11,
    "y": 95664
  }, {
    "x": 12,
    "y": 17908
  }, {
    "x": 13,
    "y": 22838
  }, {
    "x": 14,
    "y": 32153
  }, {
    "x": 15,
    "y": 56594
  }, {
    "x": 16,
    "y": 76348
  }, {
    "x": 17,
    "y": 46222
  }, {
    "x": 18,
    "y": 59304
  }],
  [{
    "x": 0,
    "y": 132189
  }, {
    "x": 1,
    "y": 61705
  }, {
    "x": 2,
    "y": 154976
  }, {
    "x": 3,
    "y": 81304
  }, {
    "x": 4,
    "y": 172572
  }, {
    "x": 5,
    "y": 140656
  }, {
    "x": 6,
    "y": 148606
  }, {
    "x": 7,
    "y": 53010
  }, {
    "x": 8,
    "y": 110783
  }, {
    "x": 9,
    "y": 196446
  }, {
    "x": 10,
    "y": 117057
  }, {
    "x": 11,
    "y": 186765
  }, {
    "x": 12,
    "y": 174908
  }, {
    "x": 13,
    "y": 75247
  }, {
    "x": 14,
    "y": 192894
  }, {
    "x": 15,
    "y": 150356
  }, {
    "x": 16,
    "y": 180360
  }, {
    "x": 17,
    "y": 175697
  }, {
    "x": 18,
    "y": 114967
  }],
  [{
    "x": 0,
    "y": 125797
  }, {
    "x": 1,
    "y": 256656
  }, {
    "x": 2,
    "y": 222260
  }, {
    "x": 3,
    "y": 265642
  }, {
    "x": 4,
    "y": 263902
  }, {
    "x": 5,
    "y": 113453
  }, {
    "x": 6,
    "y": 289461
  }, {
    "x": 7,
    "y": 293850
  }, {
    "x": 8,
    "y": 206079
  }, {
    "x": 9,
    "y": 240859
  }, {
    "x": 10,
    "y": 152776
  }, {
    "x": 11,
    "y": 297282
  }, {
    "x": 12,
    "y": 175177
  }, {
    "x": 13,
    "y": 169233
  }, {
    "x": 14,
    "y": 237827
  }, {
    "x": 15,
    "y": 242429
  }, {
    "x": 16,
    "y": 218230
  }, {
    "x": 17,
    "y": 161511
  }, {
    "x": 18,
    "y": 153227
  }]
];
const progressChartData = [0.4, 0.6, 0.8];

export { data, contributionData, pieChartData, progressChartData, stockData };
