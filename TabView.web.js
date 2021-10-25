import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import Swiper from './Swiper'
import TabBar from './TabBar'

const convertToSwiperParams = (
  {
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
  },
  slideChange
) => {
  return {
    noSwiping: !swipeEnabled,
    // rebuildOnUpdate: true,
    // shouldSwiperUpdate: true,
    grabCursor: false,
    // wrapperClass: 'swiper-wrapper',
    // slidesPerView: 'auto',
    preventClicksPropagation: false,
    preventClicks: false,
    touchStartPreventDefault: false,

    // scrollContainer: true,
    // scrollbar: { el: '.swiper-scrollbar' },
    slidesPerView: 1,
    // width: state.width,
    // height: state.height,
    // slidesPerColumnFill: 'column',

    // touchAngle: swipeVelocityImpact,freeModeMinimumVelocity??
    on: {
      slideChangeTransitionStart: function() {
        onSwipeStart && onSwipeStart()
      },
      slideChangeTransitionEnd: function() {
        onSwipeEnd && onSwipeEnd()
      },
      slideChange: function(e) {
        console.log(e)
        slideChange && slideChange()
      },
    },
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
    swipeEnabled: true,
  }

  _jumpToIndex = index => {
    if (index !== this.props.navigationState.index) {
      // console.log(' DO THE INDEX CHANGE BABY', index)
      this.props.onIndexChange(index)
    }
  }
  _jumpToKey = key => {
    const { navigationState } = this.props

    const index = navigationState.routes.findIndex(route => route.key === key)

    // console.log(this.swiper)
    this.swiper.slideTo(index, 0, false)
    this._jumpToIndex(index)
  }
  _slideChange = () => {
    // console.log('SLIDE CHANGED')
    // console.log(this.swiper)
    this._jumpToIndex(this.swiper.activeIndex)
  }

  _onRef = node => {
    if (node) {
      this.swiper = node.swiper
    }
  }
  render() {
    const {
      navigationState,
      tabBarPosition,
      renderTabBar,
      renderScene,
      style,
      swipeEnabled,
    } = this.props

    const tabBarProps = {
      jumpTo: this._jumpToKey,
      navigationState,
      tabViewRef: this.swiper,
    }
    return swipeEnabled ? (
      <View style={[styles.pager, style]}>
        {tabBarPosition === 'top' && renderTabBar(tabBarProps)}

        <Swiper
          params={convertToSwiperParams(this.props, this._slideChange)}
          ref={this._onRef}
        >
          {navigationState.routes.map((route, i) => (
            <div key={route.key} className="swiper-slide">
              {renderScene({
                jumpTo: this._jumpToKey,
                route,
              })}
            </div>
          ))}
        </Swiper>
        {tabBarPosition === 'bottom' && renderTabBar(tabBarProps)}
      </View>
    ) : (
      <View style={[styles.pager, style]}>
        {tabBarPosition === 'top' && renderTabBar(tabBarProps)}
          {navigationState.routes.map((route, i) => (
            <div key={route.key} className="swiper-slide">
              {renderScene({
                jumpTo: this._jumpToKey,
                route,
              })}
            </div>
          ))}
        {tabBarPosition === 'bottom' && renderTabBar(tabBarProps)}
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
