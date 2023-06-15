const puppeteer = require('puppeteer');
const axios = require('axios')
const cheerio = require('cheerio');
const car = require('./repo/index');



const get_data_from_arabamcom = async (brand) => {
    let links = [];
    let pageNum = 1;

    const browser = await puppeteer.launch({
        executablePath: '/usr/bin/google-chrome-stable',
        args: ['--no-sandbox']
    });
    while (true) {
    const page = await browser.newPage();

        await page.goto(`https://www.arabam.com/ikinci-el/otomobil/${brand}?page=${pageNum}`);

        await page.waitForSelector('td.listing-modelname');

        // Extract all href values of links under the td element
        const hrefs = await page.$$eval('td.listing-modelname > a', links => links.map(link => link.href));


        links = links.concat(hrefs);

        pageNum++;
        console.log(`Links found on page ${pageNum - 1}: ${hrefs.length}`);

        if (hrefs.length < 20 || pageNum == 50) {
            console.log(`No more links in next page , breaking loop.`);
            break;
        }
        await page.close();
    }

    console.log(`Total links found: ${links.length}`);
    const Infos = [];

    for (let i = 0; i < links.length; i++) {
        const response = await axios.get(links[i]);
        const $ = cheerio.load(response.data);

        const carInfo = {
            ilan_no: $('.bcd-list-item > .bold:contains("İlan No:")').next().text().trim(),
            fiyat: parseInt($('.color-red4.font-default-plusmore.bold.fl').text().trim().replace(".", "").replace(",", ".")) * 1000,
            ilan_tarihi: $('.bcd-list-item > .bold:contains("İlan Tarihi:")').next().text().trim(),
            marka: $('.bcd-list-item > .bold:contains("Marka:")').next().text().trim(),
            seri: $('.bcd-list-item > .bold:contains("Seri:")').next().text().trim(),
            model: $('.bcd-list-item > .bold:contains("Model:")').next().text().trim(),
            yil: $('.bcd-list-item > .bold:contains("Yıl:")').next().text().trim(),
            kilometre: parseInt($('.bcd-list-item > .bold:contains("Kilometre:")').next().text().trim().replace(".", "")),
            vites_tipi: $('.bcd-list-item > .bold:contains("Vites Tipi:")').next().text().trim(),
            yakit_tipi: $('.bcd-list-item > .bold:contains("Yakıt Tipi:")').next().text().trim(),
            kasa_tipi: $('.bcd-list-item > .bold:contains("Kasa Tipi:")').next().text().trim(),
            motor_hacmi: parseInt($('.bcd-list-item > .bold:contains("Motor Hacmi:")').next().text().trim().replace(" cc", "")) ,
            motor_gucu: parseInt($('.bcd-list-item > .bold:contains("Motor Gücü:")').next().text().trim().replace(" hp", "")) ,
            cekis: $('.bcd-list-item > .bold:contains("Çekiş:")').next().text().trim(),
            yakit_tuketimi: $('.bcd-list-item > .bold:contains("Ort. Yakıt Tüketimi:")').next().text().trim().replace(" lt", "") ,
            yakit_deposu: parseInt($('.bcd-list-item > .bold:contains("Yakıt Deposu:")').next().text().trim().replace(" lt", "") ),
            boya_degisen: $('.bcd-list-item > .bold:contains("Boya-değişen:")').next().text().trim(),
            takasa_uygun: $('.bcd-list-item > .bold:contains("Takasa Uygun:")').next().text().trim(),
            kimden: $('.bcd-list-item > .bold:contains("Kimden:")').next().text().trim(),
        };

        await car.insertCarDetails(carInfo);
        console.log(`car added on db with ${carInfo.ilan_no}`)
    }

    await browser.close();
}

get_data_from_arabamcom('chery')













