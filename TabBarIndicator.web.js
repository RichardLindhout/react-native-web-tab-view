import * as React from 'react'
import { StyleSheet, View } from 'react-native'

export default class TabBarIndicator extends React.Component {
  //   componentDidMount() {
  //     this.fadeInIndicator()
  //   }

  //   componentDidUpdate() {
  //     this.fadeInIndicator()
  //   }

  render() {
    const { style } = this.props

    return (
      <View
        style={[
          styles.indicator,
          // If layout is not available, use `left` property for positioning the indicator
          // This avoids rendering delay until we are able to calculate translateX
          //   { width: indicatorWidth },
          //   layout.width
          //     ? { transform: [{ translateX }] }
          //     : { left: `${(100 / routes.length) * navigationState.index}%` },
          //   width === 'auto' ? { opacity: this.opacity } : null,
          style,
        ]}
      />
    )
  }
}

const styles = StyleSheet.create({
  indicator: {
    backgroundColor: '#ffeb3b',
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    height: 2,
  },
})
