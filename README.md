# Comet - Zero Runtime CSS-in-JS Library

![Comet Logo](https://storage.googleapis.com/stackly-assets/stellaria/comet/comet-banner.png)

**Comet** is a lightweight CSS-in-JS library designed for creating stylish and performant components with zero runtime overhead. It's the secret sauce behind the stunning UI components in Nebula, our UI library. With Comet, you can effortlessly generate and manage dynamic styles while keeping your application fast and efficient.

## Features

- ⚡ **Zero Runtime Overhead:** Comet generates CSS at build time, eliminating any runtime performance impact. Your application remains fast and responsive.
- 💅 **Stylish Components:** Create visually appealing components using Comet's intuitive and expressive styling API.
- 📦 **Lightweight:** Comet is designed to be minimal and focused. It's easy to integrate into your project without unnecessary bloat.
- 🌐 **Universal Compatibility:** Whether you're building for the web, server, or any JavaScript environment, Comet works seamlessly.
- 🎨 **Theme and Variants:** Customize your components with theming and variant support, making it simple to adapt to different styles and use cases.

## Installation

To start using Comet in your project, follow these steps:

1. Install Comet using npm:

   ```bash
   npm install @stellaria/comet
   ```

2. Use with Next js

   Install the Comet Next.js plugin:

   ```bash
   npm install @stellaria/comet-next
   ```

   Add the plugin to your `next.config.js` file:

   ```javascript
   const withComet = require("@stellaria/comet-next");
   module.exports = withComet({});
   ```

3. Start creating stylish components using Comet's styling API.

## Example Usage

Here's a simple example of how to use Comet to style a button component:

```javascript
import React from "react";
import { css } from "@stellaria/comet";

const ButtonCSS = css`
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  :hover {
    background-color: #0056b3;
  }
`;

const MyComponent = () => {
  return (
    <div>
      <button className={ButtonCSS}>Click Me</button>
    </div>
  );
};

export default MyComponent;
```

## Documentation

Explore the [Comet documentation](https://url-to-comet-docs.com) for detailed information on Comet's features, styling API, and customization options.

## Contribution

We welcome contributions to Comet! If you'd like to contribute or report issues, please follow our guidelines in [CONTRIBUTING.md](https://github.com/your-comet-repo/CONTRIBUTING.md).

## License

Comet is distributed under the MIT License. See the [LICENSE](https://github.com/your-comet-repo/LICENSE) file for more information.

---

Comet simplifies the process of creating stylish and performant components in Nebula and beyond. Enjoy building beautiful user interfaces without sacrificing performance.

**The Comet Team**

<a href="https://github.com/WillishakespeareSKR13"><img src="https://avatars.githubusercontent.com/u/95162949?v=3" title="Willishakespeare" width="50" height="50"></a>

Developed with ❤️ by [Stellaria](https://stellaria.app)
