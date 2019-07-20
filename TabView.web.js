import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import Swiper from 'react-id-swiper'
import './enhance-swiper.css'
// import Animated from 'react-native-reanimated'
import TabBar from './TabBar'
// import SceneView from './SceneView'

const convertToSwiperParams = ({
  onSwipeStart, // TODO mySwiper.on('slideChangeTransitionStart', function () {
  onSwipeEnd, // TODO mySwiper.on('slideChangeTransitionEnd', function () {
  removeClippedSubviews, // TODO
  // keyboardDismissMode,// TODO not needed
  swipeEnabled, // TODO
  swipeVelocityImpact, // TODO
  timingConfig, // TODO
  springConfig, // TODO
  gestureHandlerProps, // TODO,

  springVelocityScale, // TODO
}) => {
  return {
    noSwiping: !swipeEnabled,
    // rebuildOnUpdate: true,
    grabCursor: false,
    wrapperClass: 'swiper-wrapper',
    slidesPerView: 'auto',
    preventClicksPropagation: false,
    preventClicks: false,
    touchStartPreventDefault: false,
    // scrollContainer: true,

    // slidesPerView: 1,
    // width: state.width,
    // height: state.height,
    // slidesPerColumnFill: 'column',

    // touchAngle: swipeVelocityImpact,freeModeMinimumVelocity??
  }
}

class TabView extends React.Component {
  static defaultProps = {
    tabBarPosition: 'top',
    renderTabBar: props => <TabBar {...props} />,
    renderLazyPlaceholder: () => null,
    keyboardDismissMode: 'auto',
    swipeEnabled: true,
    lazy: false,
    lazyPreloadDistance: 0,
    removeClippedSubviews: false,
    springConfig: {},
    timingConfig: {},
    gestureHandlerProps: {},
  }

  componentDidMount() {
    // fix for first view not working well + second slides doing strange effects
    setTimeout(() => {
      if (this.swiper) {
        this.swiper.update()
      }
    }, 2000)
  }
  jumpToIndex = index => {
    console.log('JUMPTO', index)
    if (index !== this.props.navigationState.index) {
      this.props.onIndexChange(index)
    }
  }
  jumpToKey = key => {
    const { navigationState } = this.props

    const index = navigationState.routes.findIndex(route => route.key === key)
    console.log('Based on key INDEX: ', index)
    this.swiper.slideTo(index, 0, false)
    this.jumpToIndex(index)
  }
  _getSwiper = swiper => {
    if (swiper) {
      // if (!this.updated) {
      this.swiper = swiper

      // this.updated = true
      // }
    }
  }
  render() {
    const {
      navigationState,
      tabBarPosition,
      renderTabBar,
      renderScene,
      style,
    } = this.props
    return (
      <View style={[styles.pager, style]}>
        {tabBarPosition === 'top' &&
          renderTabBar({
            jumpTo: this.jumpToKey,
            navigationState,
          })}
        <Swiper
          {...convertToSwiperParams(this.props)}
          getSwiper={this._getSwiper}
        >
          {navigationState.routes.map((route, i) => (
            <div key={route.key} className="swiper-slide">
              {renderScene({
                jumpTo: this.jumpToKey,
                route,
              })}
            </div>
          ))}
        </Swiper>
        {tabBarPosition === 'bottom' &&
          renderTabBar({
            navigationState,
          })}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  pager: {
    flex: 1,
    overflow: 'hidden',
  },
})

export default TabView
