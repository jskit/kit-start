/**
 *Created by jiachenpan on 16/11/29.
 * @param {Sting} url
 * @param {Sting} title
 * @param {Number} w
 * @param {Number} h
 */

const { screen } = window;

export default function openWindow(url, title, w, h) {
  // Fixes dual-screen position                            Most browsers       Firefox
  const dualScreenLeft =
    window.screenLeft !== undefined ? window.screenLeft : screen.left;
  const dualScreenTop =
    window.screenTop !== undefined ? window.screenTop : screen.top;

  const { clientWidth, clientHeight } = document.documentElement;
  const width = window.innerWidth
    ? window.innerWidth
    : clientWidth || screen.width;
  const height = window.innerHeight
    ? window.innerHeight
    : clientHeight || screen.height;

  const left = width / 2 - w / 2 + dualScreenLeft;
  const top = height / 2 - h / 2 + dualScreenTop;

  /* eslint max-len: 0 */
  const desc = `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, copyhistory=no, width=${w}, height=${h}, top=${top}, left=${left}`;
  const newWindow = window.open(url, title, desc);

  // Puts focus on the newWindow
  if (window.focus) {
    newWindow.focus();
  }
}
