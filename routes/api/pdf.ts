import { defineEventHandler } from 'h3'

import chromium from 'chrome-aws-lambda';

import puppeteer from 'puppeteer-core';


export default defineEventHandler(async (event) => {

    const browser = await puppeteer.launch({
        args: chromium.args,
        executablePath: process.env.CHROME_EXECUTABLE_PATH || await chromium.executablePath,
        headless: true,

    });

    const page = await browser.newPage();

    await page.goto('https://timelino.vercel.app/', { waitUntil: 'load' })

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
  


    return data

})
