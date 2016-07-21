export default {
  isSmartPhone: function () {
    const width = window.fakeInnerWidth || window.innerWidth;
    return width <= 568;
  }
}
