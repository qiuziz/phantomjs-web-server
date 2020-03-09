/*
 * @Author: qiuz
 * @Github: <https://github.com/qiuziz>
 * @Date: 2020-03-09 09:28:24
 * @Last Modified by: qiuz
 * @Last Modified time: 2020-03-09 10:11:56
 */

// 名侦探柯南
// https://www.iqiyi.com/lib/m_204938014.html?src=search

const fs = require('fs');
const puppeteer = require('puppeteer');
(async() => {
  let browser = await puppeteer.launch({
	});
	let page = await browser.newPage();
  await page.goto('https://www.iqiyi.com/lib/m_204938014.html?src=search');
	const links = await page.evaluate(() => {
		const urls = [];
		const links = document.querySelectorAll('#block-D .site-piclist_info_title > a');
		links.forEach(item => {
			urls.push(item.href);
		});
		return urls;
	});
	fs.writeFileSync('kenan_url.txt', links.join('\n'));
	browser.close();
})();