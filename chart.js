function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);

    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  }
}

// Render chart.
const data = [
  { time: '10:10', call: 4, waiting: 2, people: 2 },
  { time: '10:15', call: 2, waiting: 6, people: 3 },
  { time: '10:20', call: 13, waiting: 2, people: 5 },
  { time: '10:25', call: 9, waiting: 9, people: 1 },
  { time: '10:30', call: 5, waiting: 2, people: 3 },
  { time: '10:35', call: 8, waiting: 2, people: 1 },
  { time: '10:40', call: 13, waiting: 1, people: 2 },
];
const specs = [
  // Column
  {
    type: 'interval',
    data,
    encode: {
      x: 'time',
      y: 'waiting',
    },
    style: {
      fill: '#1783FF',
    },
    axis: {
      y: { title: 'Waiting', titleFill: '#1783FF' },
    }
  },
  // Point
  {
    type: 'point',
    data,
    encode: {
      x: 'time',
      y: 'call',
      shape: 'point',
      size: 10,
    },
    style: {
      fill: '#00C9C9',
      stroke: '#000',
      strokeOpacity: 0.3,
      lineWidth: 1,
    },
    axis: {
      y: { title: 'Call', titleFill: '#00C9C9' },
    }
  },
  // Line
  {
    type: 'line',
    data,
    encode: {
      x: 'time',
      y: 'people',
      shape: 'smooth',
    },
    style: {
      stroke: '#F0884D',
      lineWidth: 2,
    },
    axis: {
      y: { title: 'Call', titleFill: '#F0884D' },
    }
  }
];

let chart;
let selectedSepc;

function initialChart() {
  const KEY = 'chart-count';
  const count = Number(localStorage.getItem('chart-count')) || 0;
  localStorage.setItem(KEY, `${count + 1}`);
  selectedSepc = specs[count % 3];

  chart = new G2.Chart({
    container: 'container',
    autoFit: true,
  });

  chart.options(selectedSepc);
  chart.render();
}

const renderChart = debounce(() => {
  chart.render();
}, 500);