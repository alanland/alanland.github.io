---
title:  "Spring Security Logout"
date:   2018-06-28 17:23:37
tags:   [electron, oauth]
categories: [Java]
---

增加一个按钮（Login with GitHub），点击按钮打开一个`BrowserWindow`：

```js
// Your GitHub Applications Credentials
var options = {
    client_id: 'your_client_id',
    client_secret: 'your_client_secret',
    scopes: ["user:email", "notifications"] // Scopes limit access for OAuth tokens.
};

// Build the OAuth consent page URL
var authWindow = new BrowserWindow({ width: 800, height: 600, show: false, 'node-integration': false });
var githubUrl = 'https://github.com/login/oauth/authorize?';
var authUrl = githubUrl + 'client_id=' + options.client_id + '&scope=' + options.scopes;
authWindow.loadURL(authUrl);
authWindow.show();

function handleCallback (url) {
  var raw_code = /code=([^&]*)/.exec(url) || null;
  var code = (raw_code && raw_code.length > 1) ? raw_code[1] : null;
  var error = /\?error=(.+)$/.exec(url);

  if (code || error) {
    // Close the browser if code found or error
    authWindow.destroy();
  }

  // If there is a code, proceed to get token from github
  if (code) {
    self.requestGithubToken(options, code);
  } else if (error) {
    alert('Oops! Something went wrong and we couldn\'t' +
      'log you in using Github. Please try again.');
  }
}

// Handle the response from GitHub - See Update from 4/12/2015

authWindow.webContents.on('will-navigate', function (event, url) {
  handleCallback(url);
});

authWindow.webContents.on('did-get-redirect-request', function (event, oldUrl, newUrl) {
  handleCallback(newUrl);
});

// Reset the authWindow on close
authWindow.on('close', function() {
    authWindow = null;
}, false);
```

```js
requestGithubToken: function (options, code) {

  apiRequests
    .post('https://github.com/login/oauth/access_token', {
      client_id: options.client_id,
      client_secret: options.client_secret,
      code: code,
    })
    .end(function (err, response) {
      if (response && response.ok) {
        // Success - Received Token.
        // Store it in localStorage maybe?
        window.localStorage.setItem('githubtoken', response.body.access_token);
      } else {
        // Error - Show messages.
        console.log(err);
      }
    });

}
```

---
- https://www.manos.im/blog/electron-oauth-with-github/