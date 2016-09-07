module.exports = {
  'Subscribe news letter': function(browser) {
    const page = browser.page.hackernewsletter();
    const email = browser.globals.email;

    console.info(page.assert);

    page.navigate()
      .createEmailRoute(email)
      .waitForElementVisible('@form')
      .assert.urlContains('.html?utm_expid=')
      .clearValue('@email')
      .setValue('@email', email)
      .click('@submit')
      .waitForElementNotPresent('@form')
      .assert.urlEquals(page.url + 'almostfinished.html')
      .assert.receivedEmailSubjectEquals(email, 'Hacker Newsletter: Please Confirm Subscription')
      .assert.receivedEmailHTMLBodyContains(email, '<a class="button" href="https://hackernewsletter.us1.list-manage.com/subscribe/confirm?u=')
      .checkEmails(email, function (emails) {
        const text = emails[0].text;
        const pattern = /(https:\/\/hackernewsletter\.us1\.list-manage\.com\/subscribe\/confirm\?u=(?:[^\)]+))/;
        const confirmURL = (text.match(pattern) || [])[1];
        const unsubscribeURL = confirmURL.replace('/subscribe/confirm', '/unsubscribe')
        browser.url(confirmURL)
        browser.assert.urlEquals(page.url + 'thankyou.html')
        browser.url(unsubscribeURL)
      })
      .waitForElementVisible('@unsubscribeForm')
      .assert.value('@unsubscribeEmail', email)
      .click('@unsubscribeSubmit')
      .waitForElementNotPresent('@unsubscribeForm')
      .assert.urlEquals('https://hackernewsletter.us1.list-manage.com/unsubscribe/post')
      .assert.containsText('@unsubscribeSuccessHeading', 'Unsubscribe Successful')
      ;

    browser.end();
  }
}
