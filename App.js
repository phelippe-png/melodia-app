import React, { useState, useRef, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Animated } from 'react-native';
import AnimatedLinearGradient from './Components/AnimatedLinearGradient';
import MenuBar from './Components/MenuBar';
import BottomMenuBar from './Components/BottomMenuBar';
import Content from './Components/Content'; 
import MiniPlayer from './Components/MiniPlayer'; 
import { Audio } from 'expo-av';
import { useFonts, Lato_300Light, Lato_400Regular, Lato_700Bold, Lato_900Black } from "@expo-google-fonts/lato";

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const gradientAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const music = useRef()
  const musicStatus = useRef(false)
  const showMiniPlayer = useRef(false)
  const musicInformations = useRef({songName: '', artistName: ''})
  const getUseState = useRef()

  let [fontsLoaded] = useFonts({
    Lato_300Light, 
    Lato_400Regular, 
    Lato_700Bold, 
    Lato_900Black
  })

  const startGradientAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(gradientAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: false,
        }),
        Animated.timing(gradientAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: false,
        }),
      ])
    ).start();
  };

  const animateTabChange = () => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const playMusic = async (link) => {
    const { sound } = await Audio.Sound.createAsync(
      {uri: link},
      {shouldPlay: true}
    )
    musicStatus.current = true
    showMiniPlayer.current = true
    music.current && unloadAsyncMusic()
    music.current = sound

    getUseState.current?.setState(!getUseState.current?.state)

    await sound.playAsync();
  }

  const pauseMusic = async () => {
    await music.current.pauseAsync()
  }

  const continueMusic = async () => {
    await music.current.playAsync()
  }

  const unloadAsyncMusic = async () => {
    await music.current.unloadAsync()
  }

  useEffect(() => {
    startGradientAnimation();
    animateTabChange();
  }, [activeTab]);
  
  showMiniPlayer.current = !['settings', 'profile'].includes(activeTab) && music.current != undefined;

  if (!fontsLoaded) 
    <View style={styles.container}>
      <AnimatedLinearGradient
        gradientAnim={gradientAnim}
        style={styles.gradient}
      ></AnimatedLinearGradient>
      <StatusBar style="auto" />
    </View>
  else
  return (
    <View style={styles.container}>
      <View style={[styles.gradient, StyleSheet.absoluteFillObject, { backgroundColor: '#33044a' }]}>
        <MenuBar setActiveTab={setActiveTab} />
        <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
          <Content activeTab={activeTab} playMusic={playMusic} musicInformations={musicInformations} />
        </Animated.View>
        <BottomMenuBar setActiveTab={setActiveTab} />
      </View>
      <MiniPlayer
        songInformations={musicInformations}
        pauseSong={pauseMusic}
        continueSong={continueMusic}
        statusSong={musicStatus}
        getStateScreen={getUseState}
        showMiniPlayer={showMiniPlayer}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingTop: 90,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    fontFamily: 'Lato_400Regular'
  },
});
