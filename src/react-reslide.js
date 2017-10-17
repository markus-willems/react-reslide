import React from 'react'
import PropTypes from 'prop-types'

const Fragment = ({ children }) => children

Fragment.propTypes = {
  children: PropTypes.node
}

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
    return <div className={this.props.className}>{children}</div>
  }
}

Reslide.propTypes = {
  children: PropTypes.node.isRequired,
  preloadContent: PropTypes.bool
}

Reslide.defaultProps = {
  className: 'reslide'
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

Slides.propTypes = {
  children: PropTypes.node.isRequired,
  preloadContent: PropTypes.bool,
  activeSlideIndex: PropTypes.number
}

export const Slide = props => {
  console.log('slide', props)
  if (props.render && typeof props.render === 'function') {
    return <Fragment>{props.render(props)}</Fragment>
  }
  const { children, isActive, preloadContent } = props
  return preloadContent ? (
    <div
      className={props.className}
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

Slide.propTypes = {
  children: PropTypes.node.isRequired,
  isActive: PropTypes.bool,
  preloadContent: PropTypes.bool,
  render: PropTypes.func
}

Slide.defaultProps = {
  className: 'reslide__slide'
}

export const Controls = props => {
  const { onActivateSlide, activeSlideIndex, numberOfSlides } = props
  const children = React.Children.map(props.children, (child, index) => {
    return React.cloneElement(child, {
      slide: () => {
        if (child.type === PrevButton) {
          onActivateSlide(activeSlideIndex - 1)
        }
        if (child.type === NextButton) {
          onActivateSlide(activeSlideIndex + 1)
        }
      },
      isDisbaled:
        child.type === NextButton
          ? activeSlideIndex + 1 >= numberOfSlides
          : activeSlideIndex - 1 < 0
    })
  })
  return <div className={props.className}>{children}</div>
}

Controls.propTypes = {
  children: PropTypes.node.isRequired,
  activeSlideIndex: PropTypes.number,
  numberOfSlides: PropTypes.number,
  onActivateSlide: PropTypes.func
}

Controls.defaultProps = {
  className: 'reslide__controls'
}

export const PrevButton = props => {
  if (props.render && typeof props.render === 'function') {
    return <Fragment>{props.render(props)}</Fragment>
  }
  const { children, slide, isDisbaled } = props
  return <span onClick={!isDisbaled ? () => slide() : null}>{children}</span>
}

PrevButton.propTypes = {
  children: PropTypes.node,
  isDisbaled: PropTypes.bool,
  slide: PropTypes.func,
  render: PropTypes.func
}

PrevButton.defaultProps = {
  children: 'Prev'
}

export const NextButton = props => {
  console.log('next', props)
  const { children, slide, isDisbaled } = props
  return <span onClick={!isDisbaled ? () => slide() : null}>{children}</span>
}

NextButton.propTypes = {
  children: PropTypes.node,
  isDisbaled: PropTypes.bool,
  slide: PropTypes.func,
  render: PropTypes.func
}

NextButton.defaultProps = {
  children: 'Next'
}
