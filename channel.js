const CHANNEL_KEY = 'chart-addition-key';

/**
 * PageChannel is a channel for communicate between pages.
 * The information of page is stored in localStorage.
 */
class PageChannel {

  pageId = '';
  pages = {};

  constructor(pageId) {
    this.pageId = pageId;

    window.addEventListener('locastorage', (e) => {
      this.update();
    });

    window.addEventListener('beforeunload', () => {
      delete this.pages[this.pageId]
      this.save();
    });
  }

  // Send data to all page.
  boardcast(data) {
    this.update();
    this.pages[this.pageId] = data;
    this.save();
  }

  save() {
    localStorage.setItem(CHANNEL_KEY, JSON.stringify(this.pages));
  }

  getPage() {
    return this.pages[this.pageId] || { pageId: this.pageId, spec: {}, bbox: [0, 0, 0, 0] };
  }
  
  getPages() {
    return this.pages
  }

  update() {
    try {
      this.pages = JSON.parse(localStorage.getItem(CHANNEL_KEY) || '');
    } catch (e) {
      this.pages = {};
    }
  }
}