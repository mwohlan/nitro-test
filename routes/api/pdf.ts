

import puppeteer from 'puppeteer';

let browser;

export default defineEventHandler(async (event) => {


    console.time('pdf');

    if (!browser) {


         browser = await puppeteer.launch({

             headless: true,
             args: ['--no-sandbox', '--disable-setuid-sandbox']
            

        });
    }


    const page = await browser.newPage();

    await page.goto('https://prismatic-cendol-6d0805.netlify.app/print/113', { waitUntil: 'load' })

    const pdf = await page.pdf({
        format: 'a4',
        printBackground: true,
        margin: {
            top: '1cm',
            right: '1cm',
            bottom: '1cm',
            left: '1cm'
        },
    })

    await page.close()
 


    const data = pdf.toString('base64')
  
   console.timeEnd('pdf')

    return data

})
