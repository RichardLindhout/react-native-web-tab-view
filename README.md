A cross-platform Tab View component for React Native (web). It's a really nice abstraction on the web and uses https://idangero.us/swiper/ so even switching betweens screens work with touch!


Please do a pull request for missing features.

## Install


## react-native-tab-view

Follow instructions for a working native variant at: https://github.com/react-native-community/react-native-tab-view

## react-native-web-tab-view
`yarn add react-id-swiper@latest swiper@latest`
`yarn add https://github.com/RichardLindhout/react-native-web-tab-view`

Add this to your public/index.html
```<link rel="stylesheet" href="%PUBLIC_URL%/swiper.min.css">```

And download https://github.com/nolimits4web/swiper/blob/Swiper3/dist/css/swiper.min.css to your public map



Example code

```jsx
import React, { Component } from 'react'
import { TabView, TabBar } from 'react-native-web-tab-view'
import widthAndHeightHOC from '../WidthAndHeight/widthAndHeightHOC'

import c from '../constants'

class Example extends Component {
  state = {
    index: 0,
    routes,
  }

  _renderScene = ({ route, jumpTo }) => {
    return (
      <route.component
        key={route.key}
        componentId={this.props.componentId}
        jumpTo={jumpTo}
      />
    )
  }

  _renderTabBar = props => {
    return (
      <TabBar
        {...props}
        scrollEnabled
        labelStyle={{ color: '#FFF' }}
        indicatorStyle={{ backgroundColor: '#FFF' }}
        style={{ backgroundColor: 'blue' }}
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


