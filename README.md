A cross-platform Tab View component for React Native (web). It's a really simple on the web which has not al features yet.
Please do a pull request for missing features.

## Install


## react-native-tab-view

Follow instructions for a working native variant at: https://github.com/react-native-community/react-native-tab-view

## react-native-web-tab-view

yarn add https://github.com/RichardLindhout/react-native-web-tab-view


Example code

```
import React, { Component } from 'react'
import { TabView, TabBar } from 'react-native-web-tab-view'
import widthAndHeightHOC from '../WidthAndHeight/widthAndHeightHOC'

import c from '../constants'

class Example extends Component {
  state = {
    index: 0,
    routes,
  }

  _renderScene = ({ route }) => {
    return (
      <route.component key={route.key} componentId={this.props.componentId} />
    )
  }

  _renderTabBar = props => {
    return (
      <TabBar
        {...props}
        scrollEnabled
        labelStyle={{ color: '#FFF' }}
        indicatorStyle={{ backgroundColor: '#FFF' }}
        style={{ backgroundColor: c.greenColor }}
        tabStyle={{ width: 'auto' }}
        renderLabel={({ route, focused, color }) => (
          <Text style={{ color, margin: 8 }}>
            {(route.title || '').toUpperCase()}
          </Text>
        )}
      />
    )
  }

  _changeIndex = index => this.setState({ index })

  render() {
    const { width, height } = this.props
    return [
      <TabView
        key="tabview"
        renderTabBar={this._renderTabBar}
        navigationState={this.state}
        onIndexChange={this._changeIndex}
        renderScene={this._renderScene}
        initialLayout={{ width, height }}
      />,
    ]
  }
}

const routes = [
  {
    key: 'common',
    title: 'Common',
    accessibilityLabel: 'Common',
    component: FirstScreen,
  },
  {
    key: 'second',
    title: 'Second',
    accessibilityLabel: 'Second',
    component: SecondScreen,
  },
]

export default widthAndHeightHOC(Example)

```


