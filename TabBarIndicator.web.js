import * as React from 'react'
import { StyleSheet, View } from 'react-native'

export default class TabBarIndicator extends React.Component {
  render() {
    const { style, isActive } = this.props

    return (
      <View style={[styles.indicator, { opacity: isActive ? 1 : 0 }, style]} />
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
