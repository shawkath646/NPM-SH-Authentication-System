
# sh-authentication-system
This npm module is the SH Authentication System, designed for managing applications and retrieving data registered on the official website. The module supports fetching application data from the official website, as well as remotely activating, deactivating, and displaying alert toast messages without the need for rebuilding or modifying the source code.

## Installation 
```
npm i --save-dev sh-authentication-system
```

Usage

1. Creating a Configuration File

Create a shas.config.ts file in the root directory:
##### Note: If you have saved environment variables in this format you don't need to manually pass it.
```
STOCK_APP_ID=
STOCK_APP_SECRET=
```

```

import SHAS from "sh-authentication-system";

  
// provide app id and secret provided from our website

const { ContentWrapper, appData, brandData, CloudBurstLab } = await SHAS({

appId: process.env.STOCK_APP_ID as string,
appSecret: process.env.STOCK_APP_SECRET as string
});


export { ContentWrapper, appData, brandData, CloudBurstLab };

```

2. Using the ContentWrapper in Layout

In your layout.tsx, wrap the children with ContentWrapper:

  

```

import { ContentWrapper } from "@/shas.config";

//...other imports

  
...
<ContentWrapper>
{children}
</ContentWrapper>
...
```

  

3. Accessing appData and brandData

You can now access appData and brandData in any of your project files:

  

```

import { appData, brandData } from "@/shas.config";

  

// Do something with the data

console.log(appData);

```

  

4. Using CloudBurst Lab OAuth 2.0 Provider

In auth.config.ts, import and use CloudBurstLab:



```
import { CloudBurstLab } from "@/shas.config";

export const authConfig = {
providers: [CloudBurstLab],
//... other configurations
};

```

  

## Features

* Remotely activate and deactivate your application with an eye-catching status page

* Remotely show alert toasts with actions in your application

* Use the CloudBurst Lab OAuth 2.0 provider

## Author

[Shawkat Hossain Maruf](https://sh-portfolio-maker.vercel.app/p/shawkath646)
Contact: shawkath646@gmail.com

  

## Version
Current version: 2.0.0