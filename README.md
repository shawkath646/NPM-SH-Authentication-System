
  

# SH Authentication System App Controller
This npm module is the nextjs app controller, designed for managing applications and retrieving data registered on the official website. The module supports fetching application data from the official website, as well as remotely activating, deactivating, and displaying alert toast messages without the need for rebuilding or modifying the source code.

## Installation

```

npm i --save-dev shas-app-controller

```

## Usage

### 1. Register application to SH Authentication System [application page](https://sh-authentication-system.vercel.app/auth/profile/applications).
Copy the **app id** and **app secret** that is provided into application details page.

 
### 1. Creating a Configuration File

Create a **shas.config.ts** file in the root directory:
```

import SHAS from "sh-authentication-system";

// provide app id and secret provided from our website

const { ContentWrapper, appData, brandData } = await SHAS({

appId: process.env.SHAS_APP_ID as string,
appSecret: process.env.SHAS_APP_SECRET as string,

// Optional
// If you want to modify node fetch caching props
// Default value is "default"

cache: "no-cache" // Suggested for quick update data from shas server.

});

export { ContentWrapper, appData, brandData };

```
**Note: If you have saved environment variables in this format you don't need to manually pass it.**

```

SHAS_APP_ID=
SHAS_APP_SECRET=

```


### 2. Using the ContentWrapper in Layout

In your **layout.tsx**, wrap the children with **ContentWrapper**:

```

"use server";
//...other imports
import { ContentWrapper } from "@/shas.config";

...

export  default  async  function  RootLayout({ children }:  Readonly<{ children:  React.ReactNode; }>) {
	return (
		<html  lang="en">
			<body>
				<ContentWrapper>
					{children}
				</ContentWrapper>
			</body>
		</html>
	);
};

```

### 3. Accessing appData and brandData

You can now access **appData** and **brandData** in any of your project files:

```

import { appData, brandData } from "@/shas.config";

  
// Do something with the data

console.log(appData);

```

## Features
* Remotely activate and deactivate your application with an eye-catching status page
* Remotely show alert toasts with actions in your application
* If you want to use **CloudBurst Lab** id as a OAuth 2.0 provider into your application. Use [next-auth-provider-cloudburst-lab](https://www.npmjs.com/search?q=next-auth-provider-cloudburst-lab)

## Requirements
* Minimum version of Nextjs 13 to use server actions.

## Author
**[Shawkat Hossain Maruf](https://sh-portfolio-maker.vercel.app/p/shawkath646)**
<br />
Contact: shawkath646@gmail.com

## Version
Current version: 1.0.0
##### Please use latest version to prevent bugs and errors!

<img  src="https://storage.googleapis.com/sh-cloudburst-labs.appspot.com/cloudburst_lab_logo_transparent.png?GoogleAccessId=firebase-adminsdk-lf84z%40sh-cloudburst-labs.iam.gserviceaccount.com&Expires=4863727974&Signature=B1G9adLuRnjVIxGHoh3dyMVtGsR00KdmatEJRzKpMHPDjgsUX%2Bi9VftAz71puzbFmFsC5xP%2FHZFcBKQ7NBfJbkQzhiuywJMBmOSJlsn7mNfLgZlEsU5ReaNaMXDF6y3W65YeR76u2XBiQjAvVNl%2FEIvMvgbanNJWoDULrxF1OgeF1q8O270oT05ZfzIytLpi7c%2BbBIv6OtmzeUHNa0KJaTX0QPcdesQKFL0pQpaQPncdk6iQtOCOUafgKfQregHwn9iOo1iW1SM4sLw92uJURvLWimyq8JUWjc8J8AXyActsuwQs9IRQz5%2BUjc4k5zVwIS4fQDODvN8t97FDR2Sg7g%3D%3D"  alt="CloudBurst Logo"  height="150"  width="150">

*A product of [CloudBurst Lab](https://cloudburstlab.vercel.app)*