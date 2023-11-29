const pageId = `page-${new Date().getTime()}-${Math.random() * 100000 | 0})`;

const channel = new PageChannel(pageId);

let newSpec;

function isEqual(bbox1, bbox2) {
  const [x1, y1, w1, h1] = bbox1;
  const [x2, y2, w2, h2] = bbox2;

  return x1 === x2 && y1 === y2 && w1 === w2 && h1 === h2;
}

function isCollide(bbox1, bbox2) {
  const [x1, y1, w1, h1] = bbox1;
  const [x2, y2, w2, h2] = bbox2;

  return x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2;
}

// Description: Main entry point for the application.
function update() {
  // [x, y, w, h]
  const bbox = [
    window.screenLeft,
    window.screenTop,
    window.innerWidth,
    window.innerHeight,
  ];

  const page = channel.getPage();

  if (!isEqual(bbox, page.bbox)) {
    channel.boardcast({
      pageId,
      spec: selectedSepc,
      bbox,
    });
  }


  newSpec = {
    type: 'view',
    children: [selectedSepc],
  };

  const pages = channel.getPages();

  Object.keys(pages).forEach((id) => {
    if (id !== pageId && isCollide(bbox, pages[id].bbox)) {
      newSpec.children.push(pages[id].spec);
    }
  });


  if (newSpec.children.length !== chart.options().children.length) {
    chart.options(newSpec);
    renderChart();
  }

  requestAnimationFrame(update);
}

if (new URLSearchParams(window.location.search).get('init')) {
  localStorage.clear();
} else {
  initialChart();

  setTimeout(() => {
    update();
  }, 1000);
}
