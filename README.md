# cf-alert

An alert dialog implementation made with campfire.js.

## Usage

Import it from [esm.sh](https://esm.sh/cf-alert):

```ts
import { confirm, input, message } from "https://esm.sh/cf-alert";
```

Then perform your method call.

```ts
await message("Hello!");
```

Note that this alert comes without any styling by default - you can copy it from
[style.css](style.css) or write your own!

## API

```ts
function message(
  text: string,
  title?: string,
  customLabel?: string,
): Promise<void>;
```

An alert dialog box.

- **text** The message that will be displayed.
- **customLabel** Custom label for the "OK" button.
- **title** The title that will be displayed for the box. Defaults to "Info".

This method returns a Promise that resolves when the user clicks the "OK"
button.

```ts
declare function input(
  type: string,
  text: string,
  title?: string,
): Promise<unknown>;
```

An input dialog box.

- **type** The HTML type of the input element, for example `text`, `password`,
  or `number`.
- **text** The text message to display in the input box.
- **title** The title that will be displayed for the box. Defaults to "Input".

This method returns a Promise that resolves to the user's input. No validation
is performed, and the promise rejects if the user clicks the cancel button.

```ts
interface CustomLabels {
  yes?: string;
  no?: string;
}

function confirm(
  text: string,
  customLabels: CustomLabels,
  title?: string,
): Promise<boolean>;
```

A confirm dialog box.

- **text** The message for the confirm box.
- **customLabels** Custom labels for the yes and no buttons.
- **title** The title that will be displayed for the box. Defaults to "Are you
  sure?".

This method returns a Promise that resolves to either true or false depending on
the user's selection.
