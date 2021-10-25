import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import TabBarItem from './TabBarItem.web'
import TabBarIndicator from './TabBarIndicator.web'
import Swiper from './Swiper'

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

  _onRef = node => {
    if (node) {
      this.swiper = node.swiper
    }
  }
  componentDidUpdate() {
    if (this.swiper && this.props.tabViewRef) {
      this.props.tabViewRef.controller.control = this.swiper
      this.swiper.controller.control = this.props.tabViewRef
    }
  }

  render() {
    const {
      position,
      navigationState,
      scrollEnabled,
      // bounces,
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
      // indicatorStyle,
      style,
      swipeEnabled = true,
    } = this.props
    const { routes } = navigationState

    const swiperParams = {
      slidesPerView: scrollEnabled ? 'auto' : routes.length,
      // paginationClickable: true,
      spaceBetween: 0,
      // freeMode: true,
      // loop: false,
      preventClicksPropagation: false,
      preventClicks: false,
      touchStartPreventDefault: false,
      // grabCursor: true,
      watchSlidesProgress: true,
      slideClass: 'swiper-tab-item',
      // renderProgressbar: function(progressbarFillClass) {
      //   return this.props.renderIndicator({
      //     style: indicatorStyle,
      //   })
      // },
      // on: {
      //   progress: function(progress, second) {
      //     // var swiper = this
      //     // console.log(progress, second)
      //     // var slideProgress = swiper.progress
      //     // console.log(slideProgress)
      //     // console.log(activeSlide)
      //     // console.log('ACTIVE SLIDE', activeSlide.offsetLeft)
      //     // for (var i = 0; i < swiper.slides.length; i++) {
      //     //   console.log(swiper.slides[i])
      //     //   const offset =
      //     //     window.innerWidth -
      //     //     (swiper.slides[i].getBoundingClientRect().left +
      //     //       swiper.slides[i].offsetWidth)
      //     //   console.log(swiper.width, 'swiper width')
      //     //   console.log(offset)
      //     //   // var slideProgress = swiper.slides[i].progress
      //     //   // var innerOffset = swiper.width * 1.9
      //     //   // var innerTranslate = slideProgress * innerOffset
      //     //   // console.log(slideProgress)
      //     //   // console.log('inner translate', innerTranslate)
      //     //   // swiper.slides[i].querySelector('.slide-inner').style.transform =
      //     //   //   'translate3d(' + innerTranslate + 'px, 0, 0)'
      //     // }
      //   },
      // },

      // onTab: function(swiper) {
      //   // var n = swiper1.clickedIndex;
      //   alert(1)
      // },
    }

    // console.log('NAVIGATIONSTATE',navigationState.index)
    return swipeEnabled ? (
      <View style={[styles.tabBar, style]}>
        <Swiper params={swiperParams} ref={this._onRef}>
          {routes.map((route, tabIndex) => (
            <div key={route.key} className="swiper-tab-item">
              <TabBarItem
                tabIndex={tabIndex}
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
              />
            </div>
          ))}
        </Swiper>
      </View>
    ) : (
      <View style={[styles.tabBar, style]}>
          {routes.map((route, tabIndex) => (
            <div key={route.key} className="swiper-tab-item">
              <TabBarItem
                tabIndex={tabIndex}
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
              />
            </div>
          ))}
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
