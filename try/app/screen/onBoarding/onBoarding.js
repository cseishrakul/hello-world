import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  Animated,
  Image,
  TouchableOpacity
} from 'react-native';
import Constants from 'expo-constants';
import {images, theme} from '../../constants';

// theme
const {COLORS, FONTS, SIZES} = theme;

// images
const {onboarding1, onboarding2, onboarding3} = images;

// dummy data
const onBoardings = [
  {
    title: "Let's Travelling",
    description: "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.  And more recently with desktop publishing software",
    img: onboarding1
  }, {
    title: "Navigation",
    description: "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.  And more recently with desktop publishing software",
    img: onboarding2
  }, {
    title: "Destination",
    description: "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.  And more recently with desktop publishing softwar",
    img: onboarding3
  }
]

const onBoarding = () => {

  const [completed, setCompleted] = React.useState(false);
  const scrollx = new Animated.Value(0);
  React.useEffect(()=>{
    scrollx.addListener(({value}) => {
      if(Math.floor(value/SIZES.width) === onBoardings.length -1){
        setCompleted(true);
      }
    })
    return () => scrollx.removeListener();
  },[])

  // renderContent
  function renderContent() {
    return (
      <Animated.ScrollView
        horizontal
        pagingEnabled
        scrollEnabled
        snapToAlignment="center"
        showHorizontalScrollIndicator={false}
        declerationRate={0}
        scrollEventThrottle={16}
        onScroll = {Animated.event([
          {nativeEvent: {contentOffset: {x:scrollx}}}
        ],{useNativeDriver: false})}
      >
      {
        onBoardings.map((item, index) => (<View key={index} style={{
            width: SIZES.width
          }}>
          <View style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image source={item.img} resizeMode="cover" style={{
                width: "100%",
                height: "60%",
                bottom:'10%',
              }}/>
          </View>
          <View style={{
              position:'absolute',
              bottom:"10%",
            }}>
            <Text
              style={{
                ...FONTS.h1,
                color: COLORS.gray,
                textAlign: 'center',
              }}
            >
              {item.title}
            </Text>
            <Text
              style={{
                ...FONTS.body3,
                textAlign:'center',
                marginTop: SIZES.base,
                color:COLORS.gray,
                bottom:"5%",
              }}
           >
              {item.description}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              position:'absolute',
              bottom:'1%',
              right:0,
              width:150,
              height:60,
              paddingLeft:20,
              justifyContent:'center',
              borderTopLeftRadius:30,
              borderBottomRightRadius:30,
              backgroundColor:COLORS.blue,
            }}
            onPress={()=> console.log("Button on Pressed!") }
          >
            <Text
              style={{
                ... FONTS.h2,
                color:COLORS.white,
              }}
            >
              {completed ? "Let's Go" : "Skip"}
            </Text>
          </TouchableOpacity>
        </View>))
      }
    </Animated.ScrollView>)
  }

  function renderDots(){
    const dotPosition = Animated.divide(scrollx, SIZES.width)
    return(
      <View style={styles.dotContainer}>
        {
            onBoardings.map((item, index) => {

              const opacity = dotPosition.interpolate({
                inputRange:[index:-1,index,index+1],
                outputRange:[0.3,1,0.3],
                extrapolate:"clamp"
              })

              const dotSize = dotPosition.interpolate({
                inputRange:[index:-1,index,index+1],
                outputRange:[SIZES.base,17,SIZES.base],
                extrapolate:"clamp"
              })


            return(
              <Animated.View
                key={`dot-${index}`}
                opacity={opacity}
                style={[styles.dot,{width:dotSize,height:dotSize}]}
              >

            </Animated.View>
            )
          })
        }
      </View>
    )
  }

  return (
      <SafeAreaView style={styles.container}>
        <View style={styles.view}>
          {renderContent()}
        </View>
        <View style={styles.dotsRootContainer}>
          {renderDots()}
        </View>
      </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  view: {
    paddingTop: Constants.statusBarHeight
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white
  },
  dot:{
    borderRadius:SIZES.radius,
    backgroundColor:COLORS.blue,
    marginHorizontal: SIZES.radius/2
  },
  dotContainer:{
    flexDirection:'row',
    height:SIZES.padding,
    alignItems:'center',
    justifyContent:'center',
  },
  dotsRootContainer:{
    position:'absolute',
    bottom:SIZES.height > 700 ? '50%' : '30%'
  },
})

export default onBoarding;
