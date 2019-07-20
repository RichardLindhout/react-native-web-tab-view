import * as React from 'react'
import {
  StyleSheet,
  View,
  ScrollView,
  // StyleProp,
  // ViewStyle,
  // TextStyle,
  // LayoutChangeEvent,
  // I18nManager,
  // Platform,
} from 'react-native'
import TabBarItem from './TabBarItem.web'
import TabBarIndicator from './TabBarIndicator.web'

export default class TabBar extends React.Component {
  static defaultProps = {
    getLabelText: ({ route }) =>
      typeof route.title === 'string' ? route.title.toUpperCase() : route.title,
    getAccessible: ({ route }) =>
      typeof route.accessible !== 'undefined' ? route.accessible : true,
    getAccessibilityLabel: ({ route }) =>
      typeof route.accessibilityLabel === 'string'
        ? route.accessibilityLabel
        : typeof route.title === 'string'
        ? route.title
        : undefined,
    getTestID: ({ route }) => route.testID,
    renderIndicator: props => <TabBarIndicator {...props} />,
  }

  render() {
    const {
      position,
      navigationState,
      scrollEnabled,
      bounces,
      getAccessibilityLabel,
      getAccessible,
      getLabelText,
      getTestID,
      renderBadge,
      renderIcon,
      renderLabel,
      activeColor,
      inactiveColor,
      pressColor,
      pressOpacity,
      onTabPress,
      onTabLongPress,
      tabStyle,
      labelStyle,
      indicatorStyle,
      contentContainerStyle,
      style,
    } = this.props
    const { routes } = navigationState

    return (
      <View style={[styles.tabBar, style]}>
        <ScrollView
          horizontal
          keyboardShouldPersistTaps="handled"
          scrollEnabled={scrollEnabled}
          bounces={bounces}
          alwaysBounceHorizontal={false}
          scrollsToTop={false}
          showsHorizontalScrollIndicator={false}
          automaticallyAdjustContentInsets={false}
          overScrollMode="never"
          contentContainerStyle={[
            styles.tabContent,
            // scrollEnabled
            //   ? { width: tabBarWidth || tabBarWidthPercent }
            //   : styles.container,
            contentContainerStyle,
          ]}
          scrollEventThrottle={16}
          // onScroll={Animated.event([
          //   {
          //     nativeEvent: {
          //       contentOffset: { x: this.scrollAmount },
          //     },
          //   },
          // ])}
          ref={el => {
            // @ts-ignore
            this.scrollView = el
          }}
        >
          {routes.map(route => (
            <TabBarItem
              key={route.key}
              position={position}
              route={route}
              navigationState={navigationState}
              getAccessibilityLabel={getAccessibilityLabel}
              getAccessible={getAccessible}
              getLabelText={getLabelText}
              getTestID={getTestID}
              renderBadge={renderBadge}
              renderIcon={renderIcon}
              renderLabel={renderLabel}
              activeColor={activeColor}
              inactiveColor={inactiveColor}
              pressColor={pressColor}
              pressOpacity={pressOpacity}
              onPress={() => {
                onTabPress && onTabPress({ route })
                this.props.jumpTo(route.key)
              }}
              onLongPress={() => onTabLongPress && onTabLongPress({ route })}
              labelStyle={labelStyle}
              style={tabStyle}
              bottom={this.props.renderIndicator({
                style: indicatorStyle,
              })}
            />
          ))}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    backgroundColor: '#2196f3',
    elevation: 4,
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowRadius: StyleSheet.hairlineWidth,
    shadowOffset: {
      height: StyleSheet.hairlineWidth,
      width: 0,
    },
    zIndex: 1,
  },
  tabContent: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  indicatorContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
})
