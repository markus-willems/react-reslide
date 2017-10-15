# react-reslide

A slider component for React. Click [here](https://taboo-trucks.surge.sh/) for a demo.

## Installation

### npm

```
npm install react-reslide --save
```

### yarn

```
yarn add react-reslide
```
## Usage

```js
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