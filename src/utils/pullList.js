export default {
  data: {
    pullParamsDefault: {
      pageNum: 1,
      pageLimit: 20,
      needPagination: 1,
    },
    pullParams: {},
    hasMore: true,
    pullModel: null,
    bottomLoading: false,
  },

  // 下拉刷新
  onPullDownRefresh() {
    // this.initPullList();
    if (typeof this.refresh === 'function') {
      this.refresh()
    }
  },
}
