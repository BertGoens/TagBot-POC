# TagBot-POC

Proof of concept chatbot with the goal to have no untagged SharePoint documents.

**Core phase:**

* [x] Connected with SharePoint (through backend)
* [x] Good conversational navigation
* [x] Dialog based on generic content type
* [x] Can promp user with suggested tags

Nice to have phase:

* Suggested tags make sense (Machine Learning?)
* Ability to use speech

Technologies used:

* Azure
* Microsoft LUIS, Text Analytics, Bot Framework, SharePoint
* NodeJS, Typescript, Backpack
* Bot Framework Emulator

## Develop

Install through [VSCode](vscode://vscode.git/clone?url=git%40github.com%3ABertGoens%2FDLWR.TagBot.Dialogs.git) / [VSCode Insiders](vscode-insiders://vscode.git/clone?url=git%40github.com%3ABertGoens%2FDLWR.TagBot.Dialogs.git). Alternatively download the [zip](https://github.com/BertGoens/DLWR.TagBot.Dialogs/archive/master.zip).

### Hot Code Reloading

1.  Enter `yarn dev` in the integrated console
2.  Edit the source files found in the /src folder
3.  Open the Bot Framework Emulator and insert
    * the app id
    * the app secret
    * address to listen on (127.0.0.1:3950/api/messages)

### Debugging

1.  Execute the Hot Code Reloading steps
2.  Insert breakpoint(s) in your code
3.  Select Debug (Attach to Process)
4.  Select your process

You can find more information on the [debugging documentation page](https://code.visualstudio.com/docs/nodejs/nodejs-debugging#_attaching-to-nodejs).

## Deploy To Azure using Visual Studio Code

1.  Compile the code for production
    * `yarn run build`
2.  Open Visual Studio Code
3.  Install the "[Azure App Service](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azureappservice)" extension
4.  Open the "AZURE APP SERVICE" explorer window
5.  Log in with the command `>Azure: Sign In`
6.  Your subscriptions should appear in the explorer window
7.  Click the arrow-up: "Deploy to Web App"
8.  Permanently set the following environment variables (Right-mouse click: "Add new setting")
    * `PORT=`
    * `NODE_ENV=production`
    * `X_STORE = (point to production store api)`
    * Any variable you deem neccasary in .env
