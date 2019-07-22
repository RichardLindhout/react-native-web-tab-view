import * as React from 'react'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'

const DEFAULT_ACTIVE_COLOR = 'rgba(255, 255, 255, 1)'
const DEFAULT_INACTIVE_COLOR = 'rgba(255, 255, 255, 0.7)'

export default class TabBarItem extends React.Component {
  render() {
    const {
      route,
      navigationState,
      renderLabel: renderLabelPassed,
      renderIcon,
      renderBadge,
      getLabelText,
      getTestID,
      getAccessibilityLabel,
      getAccessible,
      activeColor = DEFAULT_ACTIVE_COLOR,
      inactiveColor = DEFAULT_INACTIVE_COLOR,
      pressColor,
      pressOpacity,
      labelStyle,
      style,
      onLayout,
      onPress,
      onLongPress,
      tabIndex,
    } = this.props

    const isFocused = navigationState.index === tabIndex

    const activeOpacity = 1
    const inactiveOpacity = 0

    let icon = null
    let label = null

    if (renderIcon) {
      const activeIcon = renderIcon({
        route,
        focused: true,
        color: activeColor,
      })
      const inactiveIcon = renderIcon({
        route,
        focused: false,
        color: inactiveColor,
      })

      if (inactiveIcon != null && activeIcon != null) {
        icon = (
          <View style={styles.icon}>
            <View style={{ opacity: inactiveOpacity }}>{inactiveIcon}</View>
            <View style={[StyleSheet.absoluteFill, { opacity: activeOpacity }]}>
              {activeIcon}
            </View>
          </View>
        )
      }
    }

    const renderLabel =
      renderLabelPassed !== undefined
        ? renderLabelPassed
        : ({ route, color }) => {
            const labelText = getLabelText({ route })

            if (typeof labelText === 'string') {
              return (
                <Text
                  style={[
                    styles.label,
                    // eslint-disable-next-line react-native/no-inline-styles
                    icon ? { marginTop: 0 } : null,
                    { color },
                    labelStyle,
                  ]}
                >
                  {labelText}
                </Text>
              )
            }

            return labelText
          }

    if (renderLabel) {
      const activeLabel = renderLabel({
        route,
        focused: true,
        color: activeColor,
      })
      const inactiveLabel = renderLabel({
        route,
        focused: false,
        color: inactiveColor,
      })

      label = (
        <View>
          <View style={{ opacity: inactiveOpacity }}>{inactiveLabel}</View>
          <View style={[StyleSheet.absoluteFill, { opacity: activeOpacity }]}>
            {activeLabel}
          </View>
        </View>
      )
    }

    const tabStyle = StyleSheet.flatten(style)
    const isWidthSet = tabStyle && tabStyle.width !== undefined
    const tabContainerStyle = isWidthSet ? null : { flex: 1 }

    const scene = { route }

    let accessibilityLabel = getAccessibilityLabel(scene)

    accessibilityLabel =
      typeof accessibilityLabel !== 'undefined'
        ? accessibilityLabel
        : getLabelText(scene)

    const badge = renderBadge ? renderBadge(scene) : null

    return (
      <View>
        <TouchableOpacity
          borderless
          testID={getTestID(scene)}
          accessible={getAccessible(scene)}
          accessibilityLabel={accessibilityLabel}
          accessibilityTraits={isFocused ? ['button', 'selected'] : 'button'}
          accessibilityComponentType="button"
          accessibilityRole="button"
          accessibilityStates={isFocused ? ['selected'] : []}
          pressColor={pressColor}
          pressOpacity={pressOpacity}
          delayPressIn={0}
          onLayout={onLayout}
          onPress={onPress}
          onLongPress={onLongPress}
          style={tabContainerStyle}
        >
          <View pointerEvents="none" style={[styles.item, tabStyle]}>
            {icon}
            {label}
            {badge != null ? <View style={styles.badge}>{badge}</View> : null}
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  label: {
    margin: 4,
    backgroundColor: 'transparent',
  },
  icon: {
    margin: 2,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    minHeight: 48,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
})
