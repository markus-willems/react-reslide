import React from 'react'

const Fragment = ({ children }) => children

export class Reslide extends React.Component {
  constructor(props) {
    super()
    this.state = {
      activeSlideIndex: 0,
      numberOfSlides: 0,
      preloadContent: props.preloadContent ? true : false
    }
    this.handleOnActivateSlide = this.handleOnActivateSlide.bind(this)
    this.setNumberOfSlides = this.setNumberOfSlides.bind(this)
  }

  handleOnActivateSlide(index) {
    this.setState(() => ({
      activeSlideIndex: index
    }))
  }

  setNumberOfSlides(numberOfSlides) {
    this.setState(() => ({
      numberOfSlides
    }))
  }

  render() {
    const children = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        setNumberOfSlides: this.setNumberOfSlides,
        onActivateSlide: this.handleOnActivateSlide,
        ...this.state
      })
    })
    return (
      <div className={this.props.className ? this.props.className : 'reslide'}>
        {children}
      </div>
    )
  }
}

export const Slide = props => {
  if (props.render && typeof props.render === 'function') {
    return <Fragment>{props.render(props)}</Fragment>
  }
  const { children, isActive, preloadContent } = props
  return preloadContent ? (
    <div
      className={props.className ? props.className : 'reslide__slide'}
      style={{
        display: isActive ? 'block' : 'none'
      }}
    >
      {children}
    </div>
  ) : isActive ? (
    <div>{children}</div>
  ) : null
}

export class Slides extends React.Component {
  componentDidMount() {
    this.props.setNumberOfSlides(React.Children.count(this.props.children))
  }

  render() {
    const { activeSlideIndex, preloadContent } = this.props
    const children = React.Children.map(this.props.children, (child, index) => {
      return React.cloneElement(child, {
        isActive: activeSlideIndex === index,
        preloadContent
      })
    })
    return <Fragment>{children}</Fragment>
  }
}

export const Controls = props => {
  const { onActivateSlide, activeSlideIndex, numberOfSlides } = props
  const children = React.Children.map(props.children, (child, index) => {
    return React.cloneElement(child, {
      prevSlide: () => {
        onActivateSlide(activeSlideIndex - 1)
      },
      nextSlide: () => {
        onActivateSlide(activeSlideIndex + 1)
      },
      isDisbaled:
        child.type === NextButton
          ? activeSlideIndex + 1 >= numberOfSlides
          : activeSlideIndex - 1 < 0,
      numberOfSlides,
      currentSlide: activeSlideIndex
    })
  })
  return (
    <div className={props.className ? props.className : 'reslide__controls'}>
      {children}
    </div>
  )
}

export const PrevButton = props => {
  if (props.render && typeof props.render === 'function') {
    return <Fragment>{props.render(props)}</Fragment>
  }
  const { style, children, currentSlide, prevSlide, isDisbaled } = props
  return (
    <button
      style={style}
      disabled={isDisbaled}
      onClick={!isDisbaled ? () => prevSlide() : null}
    >
      {children ? children : 'Prev'}
    </button>
  )
}

export const NextButton = props => {
  const {
    style,
    children,
    currentSlide,
    numberOfSlides,
    nextSlide,
    isDisbaled
  } = props
  return (
    <button
      style={style}
      disabled={isDisbaled}
      onClick={!isDisbaled ? () => nextSlide() : null}
    >
      {children ? children : 'Prev'}
    </button>
  )
}