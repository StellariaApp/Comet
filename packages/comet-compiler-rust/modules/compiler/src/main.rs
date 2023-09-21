use comet_compiler::transform::transform;
use comet_compiler::transform::Config;

static CODE: &str =
    r#"
import { addHookName } from "preact/devtools";
import { useState } from "preact/hooks";
import "./app.css";
import { css } from "@stellaria/comet";
import { jsxDEV as _jsxDEV } from "preact/jsx-dev-runtime";
const styles = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  width: 200px;
  background-color: red;
  color: white;
`;
const styles2 = css`
  background-color: blue;
  color: white;
  width: 200px;
  height: 100px;
  border-radius: 10px;
  border: 1px solid black;
  margin: 10px;
  padding: 10px;
  box-sizing: border-box;
  &:hover {
    background-color: yellow;
  }
`;
const styles3 = css`
  background-color: green;
  color: white;

  &:hover {
    background-color: yellow;
  }
`;
export function App() {
  _s();
  const [count, setCount] = addHookName(useState(0), "count");        
  return _jsxDEV("div", {
    children: [_jsxDEV("button", {
      class: styles,
      onClick: () => setCount(count2 => count2 + 1),
      children: ["count is ", count]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 46,
      columnNumber: 7
    }, this), _jsxDEV("span", {
      children: ["class hash is ", styles]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 49,
      columnNumber: 7
    }, this), _jsxDEV("button", {
      class: styles2,
      onClick: () => setCount(count2 => count2 - 1),
      children: ["count is ", count]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 50,
      columnNumber: 7
    }, this), _jsxDEV("span", {
      children: ["class hash is ", styles2]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 53,
      columnNumber: 7
    }, this), _jsxDEV("button", {
      class: styles3,
      onClick: () => setCount(count2 => count2 - 1),
      children: ["count is ", count]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 54,
      columnNumber: 7
    }, this), _jsxDEV("span", {
      children: ["class hash is ", styles3]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 57,
      columnNumber: 7
    }, this)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 45,
    columnNumber: 5
  }, this);
}
_s(App, "rGEI62VsuwnwPY/75ViYiWAYY24=");
_c = App;
var _c;
$RefreshReg$(_c, "App");

        if (import.meta.hot) {
          self.$RefreshReg$ = prevRefreshReg;
          self.$RefreshSig$ = prevRefreshSig;
          import.meta.hot.accept((m) => {
            try {
              flushUpdates();
            } catch (e) {
              self.location.reload();
            }
          });
        }
"#;

static DEFAULT_FILENAME: &str = "C:/Users/skr13/Documents/github/Comet/apps/vite/src/app.tsx";
static DEFAULT_FILE_ID: &str = "@stellaria/comet-web-vite+src/app.tsx";
static DEFAULT_VARS: &str = "$primary:#ff0000;$secondary:#00ff00;$tertiary:#0000ff;";

fn main() {
    let code = String::from(CODE);
    let config = Config {
        filename: DEFAULT_FILENAME.to_string(),
        file_id: DEFAULT_FILE_ID.to_string().into(),
        helper: DEFAULT_VARS.to_string().into(),
    };
    let output = transform(code, config).unwrap();
}
