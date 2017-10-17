# react-reslide

A slider component for React. Click [here](https://taboo-trucks.surge.sh/) for a demo.

## Installation

### npm

```sh
npm install react-reslide --save
```

### yarn

```sh
yarn add react-reslide
```

## Usage

### Basic 

```jsx
import React from 'react'
import { render } from 'react-dom'

import {
  Reslide,
  Slides,
  Slide,
  Controls,
  PrevButton,
  NextButton
} from 'react-reslide'

const App = () => {
  return (
    <Reslide>
      <Slides>
        <Slide>
          <img src="https://farm9.staticflickr.com/8666/15944458013_1a100cc8e0_z_d.jpg" />
        </Slide>
        <Slide>
          <img src="https://farm2.staticflickr.com/1069/1243141435_eb6bf658f4_z_d.jpg" />
        </Slide>
        <Slide>
          <img src="https://farm9.staticflickr.com/8068/8243640236_72bf897740_z_d.jpg" />
        </Slide>
      </Slides>
      <Controls>
        <PrevButton />
        <NextButton />
      </Controls>
    </Reslide>
  )
}

render(<App />, document.getElementById('root'))
```

### Render props

```Slide```, ```PrevButton```, and ```NextButton``` accept a [render prop](https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce) which grands access to the component's props. This allows for more control on how ```children``` is rendered.

```jsx
import React from 'react'
import { render } from 'react-dom'

import {
  Reslide,
  Slides,
  Slide,
  Controls,
  PrevButton,
  NextButton
} from 'react-reslide'

const App = () => {
  return (
    <Reslide>
      <Slides>
        <Slide>
          <img src="https://farm9.staticflickr.com/8666/15944458013_1a100cc8e0_z_d.jpg" />
        </Slide>
        <Slide>
          <img src="https://farm2.staticflickr.com/1069/1243141435_eb6bf658f4_z_d.jpg" />
        </Slide>
        <Slide
          render={{ children, preloadContent, isActive } => {
            return preloadContent ? (
              <div
                style={{
                  display: isActive ? 'block' : 'none'
                }}
              >
                {children}
              </div>
            ) : isActive ? (
              <div>{children}</div>
            ) : null
          }}
        >
          <img src="https://farm9.staticflickr.com/8068/8243640236_72bf897740_z_d.jpg" />
        </Slide>
      </Slides>
      <Controls>
        <PrevButton
          render={{ children, slide, isDisabled } => {
            return (
              <button
                disabled={isDisbaled}
                onClick={!isDisbaled ? () => slide() : null}
              >
                {children}
              </button>
            )
          }}
        >
          Prev
        </PrevButton>
        <NextButton>Next</NextButton>
      </Controls>
    </Reslide>
  )
}

render(<App />, document.getElementById('root'))
```

## API

### ```Reslide```

Root component that wraps ```Slides``` and ```Controls```.

Props:

```className``` (*string*): Set ```className``` of underlying div.

```preloadContent``` (*bool*): If ```false```, content of ```Slide``` will load/render when ```isActive``` is ```true```. If true, set ```display``` to either ```none``` (```isActive``` is ```false```) or ```block``` (```isActive``` is ```true```).

---

### ```Slides```

Wraps ```Slide```.

---

### ```Slide```

Wraps ```children``` (e.g. text, images, or other components).

Props:

```className``` (*string*): Set ```className``` of underlying div.

```preloadContent``` (*bool*): Prop passed through from ```Reslide```.

```isActive``` (*bool*): Whether ```Slide``` is active (```true```) or not (```false```).

```render``` (*func*): Render prop.

---

### ```Controls```

Wraps ```PrevButton``` and ```NextButton```.

Props:

```className``` (*string*): Set ```className``` of underlying div.

---

### ```PrevButton```

Shows previous ```Slide``` (if available) when clicked.

Props:

```slide``` (*func*): Shows previous ```Slide``` when called.

```isDisabled``` (*bool*): Is ```true``` when there is no previous ```Slide```.

```render``` (*func*): Render prop.

---

### ```NextButton```

Shows next ```Slide``` (if available) when clicked.

Props:

```slide``` (*func*): Shows next ```Slide``` when called.

```isDisabled``` (*bool*): Is ```true``` when there is no next ```Slide```.

```render``` (*func*): Render prop.
