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

    await page.goto('https://www.madewithsupabase.com/', { waitUntil: 'load' })

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
    console.timeEnd('pdf-service');



    console.time("stringify")

    const data = pdf.toString('base64')
    const body = JSON.stringify({
        status: 'Ok',
        data
    })

    console.timeEnd("stringify")


    return pdf

})
