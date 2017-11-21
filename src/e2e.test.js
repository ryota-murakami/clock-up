import puppeteer from 'puppeteer'
const sel = id => `[data-test="${id}"]`
const googleId = process.env.TEST_GOOGLE_ACCOUNT
const googlePassword = process.env.TEST_GOOGLE_ACCOUNT_PASSWORD

describe('新規ユーザー', () => {
  it('GoogleIDでユーザー登録 -> メイン画面の遷移まで行えること', () => {
    puppeteer.launch({ headless: false, timeout: 0 }).then(async browser => {
      const page = await browser.newPage()

      // トップページを表示
      await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' })

      // ログインボタンをクリック
      await page.click(sel('sign-in-btn'))

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

      await page.waitFor(10000)
      // メイン画面への遷移が成功し、ログアウトボタンとクロックインボタンが表示されること
      const logoutBtn = await page.$(sel('logout-btn'))
      console.log(logoutBtn)
      expect(logoutBtn !== null).toEqual(true)
      const clockInBtn = await page.$(sel('clock-in-btn'))
      expect(clockInBtn !== null).toEqual(true)

      // await page.waitForFunction(() => {
      //   setTimeout(() => {
      //     console.log('wait')
      //   }, 1000000000000000) // 無限待機(デバッグ用)
      // })

      await browser.close()
    })
  })
})
