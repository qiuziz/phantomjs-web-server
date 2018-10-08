/*
 * @Author: qiuz
 * @Github: <https://github.com/qiuziz>
 * @Date: 2018-09-07 19:19:13
 * @Last Modified by: qiuz
 * @Last Modified time: 2018-10-08 10:48:45
 */
var util = {
  random:  function (m, n) {
    // A random number between m and n
    var i = n - m;
    return Math.floor(Math.random() * i + m);
  }
}

module.exports = util;
