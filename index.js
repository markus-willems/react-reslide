import React from 'react'
import { render } from 'react-dom'

import {
  Reslide,
  Slides,
  Slide,
  Controls,
  PrevButton,
  NextButton
} from './src/react-reslide'

const App = () => {
  return (
    <Reslide className="reslide" preloadContent>
      <Slides>
        <Slide>
          <img src="https://farm9.staticflickr.com/8666/15944458013_1a100cc8e0_z_d.jpg" />
        </Slide>
        <Slide>
          <img src="https://farm2.staticflickr.com/1069/1243141435_eb6bf658f4_z_d.jpg" />
        </Slide>
        <Slide
          render={props => {
            return props.preloadContent ? (
              <div
                style={{
                  display: props.isActive ? 'block' : 'none'
                }}
              >
                {props.children}
              </div>
            ) : props.isActive ? (
              <div>{props.children}</div>
            ) : null
          }}
        >
          <img src="https://farm9.staticflickr.com/8068/8243640236_72bf897740_z_d.jpg" />
        </Slide>
      </Slides>
      <Controls>
        <PrevButton
          render={props => {
            return (
              <button
                disabled={props.isDisbaled}
                onClick={!props.isDisbaled ? () => props.prevSlide() : null}
              >
                {props.children}
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
