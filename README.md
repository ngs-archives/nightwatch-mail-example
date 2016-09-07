Nightwatch Email Testing Example
================================

[![CircleCI](https://circleci.com/gh/ngs/nightwatch-mail-example.svg?style=svg)](https://circleci.com/gh/ngs/nightwatch-mail-example)

A example project for testing email delivery using [Nightwatch], [Mandrill] and [RequestBin].

Getting Started
---------------

1. Set up [Mandrill Inbound Domain]
2. Create Mandrill API Key in [settings screen]
3. Export your credential

    ```sh
    echo "export MANDRILL_API_KEY=${YOUR_API_KEY_HERE}" >> .envrc
    echo "export MAIL_DOMAIN=${YOUR_MAIL_DOMAIN_HERE}" >> .envrc
    direnv allow
    ```

4. Run the test

    ```sh
    npm install && npm test
    ```

Author
------

[Atushi Nagase]

[Atushi Nagase]: http://ngs.io/
[Nightwatch]: http://nightwatchjs.org/
[Mandrill]: https://mandrillapp.com/
[RequestBin]: http://requestb.in/
[Mandrill Inbound Domain]: https://mandrill.zendesk.com/hc/en-us/articles/205583197-Inbound-Email-Processing-Overview#set-up-an-inbound-domain
[settings screen]: https://mandrillapp.com/settings/index