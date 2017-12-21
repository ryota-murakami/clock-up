import puppeteer from 'puppeteer'
import { sel } from './src/common/testUtil'
const googleId = process.env.TEST_GOOGLE_ACCOUNT
const googlePassword = process.env.TEST_GOOGLE_ACCOUNT_PASSWORD
jest.setTimeout(100000)
let page
let browser

beforeAll(async () => {
  browser = await puppeteer.launch({ headless: false, timeout: 0 })
  page = await browser.newPage()
})

afterAll(() => {
  browser.close()
})

/**
 * TODO テストユーザーの、UserテーブルがisDuringClockIn = false状態であることに依存しているのでテスト開始時と終了時にリセットgraphqlを投げたい
 */
describe('E2E', () => {
  it('GoogleIDログイン -> メイン画面へ遷移 -> クロックイン -> クロックアウト -> ログアウト', async () => {
    // トップページを表示
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' })

    // ログインボタンをクリック
    await page.waitForSelector(sel('login-btn'))
    await page.click(sel('login-btn'))

    // Auth0のダイアログでGoogleログインを選択
    const googleSignInBtn =
      '#auth0-lock-container-1 > div > div.auth0-lock-center > form > div > div > div:nth-child(3) > span > div > div > div > div > div > div > div > div > div > div.auth0-lock-social-buttons-container > button'
    await page.waitFor(2000)
    await page.waitForSelector(googleSignInBtn)
    await page.click(googleSignInBtn)

    // GoogleIDを入力
    const mailInput = '#identifierId'
    await page.waitForSelector(mailInput)
    await page.type(mailInput, googleId)

    // nextボタンをクリック
    await page.click('#identifierNext')

    // パスワードを入力
    const passwordInput = '#password input[type="password"]'
    await page.waitFor(1000)
    await page.waitForSelector(passwordInput)
    await page.type(passwordInput, googlePassword)

    // next ボタンをクリック
    await page.click('#passwordNext')
    await page.waitForNavigation()

    // メイン画面への遷移が成功し、ログアウトボタンとクロックインボタンが表示されること
    await page.waitFor(2000)
    const logoutBtn = await page.$(sel('logout-btn'))
    expect(logoutBtn !== null).toEqual(true)
    expect(logoutBtn.constructor.name).toEqual('ElementHandle')
    let clockInBtn = await page.$(sel('clock-in-btn'))
    expect(clockInBtn !== null).toEqual(true)
    expect(clockInBtn.constructor.name).toEqual('ElementHandle')

    // クロックインボタンクリック
    await page.click(sel('clock-in-btn'))

    // クロックインが完了し、クロックアウトボタンが表示されていること
    await page.waitForSelector(sel('clock-out-btn'))

    let clockOutBtn = await page.$(sel('clock-out-btn'))
    expect(clockOutBtn !== null).toEqual(true)
    expect(clockOutBtn.constructor.name).toEqual('ElementHandle')

    // クロックアウトボタンをクリック
    await page.click(sel('clock-out-btn'))

    // クロックアウトが完了し、クロックインボタンが表示されていること
    await page.waitForSelector(sel('clock-in-btn'))

    clockInBtn = await page.$(sel('clock-in-btn'))
    expect(clockInBtn !== null).toEqual(true)
    expect(clockInBtn.constructor.name).toEqual('ElementHandle')

    // ログアウトボタンをクロック
    await page.click(sel('logout-btn'))

    // ログアウトが完了し、ログインボタンが完了していること
    await page.waitForSelector(sel('login-btn'))

    let logInBtn = await page.$(sel('login-btn'))
    expect(logInBtn !== null).toEqual(true)
    expect(logInBtn.constructor.name).toEqual('ElementHandle')
  })
})
