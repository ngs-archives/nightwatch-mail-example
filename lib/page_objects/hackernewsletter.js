module.exports = {
  url: 'http://www.hackernewsletter.com/',
  elements: {
    form: {
      selector: '#mc_embed_signup'
    },
    email: {
      selector: '#mce-EMAIL'
    },
    submit: {
      selector: '#mc-embedded-subscribe'
    },
    unsubscribeForm: {
      selector: '#mc-unsubscribe-form'
    },
    unsubscribeEmail: {
      selector: '#mc-unsubscribe-form #email-address'
    },
    unsubscribeSubmit: {
      selector: '#mc-unsubscribe-form input[type=submit]'
    },
    unsubscribeSuccessHeading: {
      selector: '#templateBody h2'
    }
  }
}
