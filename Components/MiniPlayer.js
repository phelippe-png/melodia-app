import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const MiniPlayer = ({ songInformations, pauseSong, continueSong, statusSong, getStateScreen, showMiniPlayer }) => {
  const [forceUpdate, setForceUpdate] = useState(false);
  getStateScreen.current = {state: forceUpdate, setState: setForceUpdate}

  const handlePlayPause = () => {
    statusSong.current ? pauseSong() : continueSong()
    statusSong.current = !statusSong.current
    setForceUpdate(!forceUpdate)
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgb(145,15,219)', 'rgb(73,8,111)']}
        style={[styles.miniPlayer, !showMiniPlayer.current && {display: 'none'}]}
        start={[0, 0]}
        end={[1, 1]}
      >
        <Image style={styles.songImage} source={{uri: songInformations.current?.songImage}}></Image>
        <View style={styles.songInfo}>
          <Text numberOfLines={2} style={styles.songName}>{songInformations.current?.songName}</Text>
          <Text style={styles.artistName}>{songInformations.current?.artistName}</Text>
        </View>
        <TouchableOpacity style={styles.playPauseButton}>
          <MaterialIcons name={'add-circle'} size={32} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.playPauseButton} onPress={handlePlayPause}>
          <Icon name={statusSong.current ? 'pause' : 'play'} size={35} color="#fff" />
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute', 
    width: '100%', 
    bottom: 57, 
    alignItems: 'center'
  },
  miniPlayer: {
    width: '85%',
    borderRadius: 9,
    padding: 6,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5
  },
  playPauseButton: {
    borderRadius: 50,
    padding: 3,
  },
  songInfo: {
    flex: 1,
  },
  songName: {
    color: '#fff',
    fontFamily: 'Lato_900Black',
    marginLeft: 9
  },
  artistName: {
    color: '#ccc',
    fontFamily:'Lato_400Regular',
    marginLeft: 9
  },
  shareButton: {
    marginLeft: 10,
  },
  songImage: {
    width: 60,
    height: 60,
    borderRadius: 7,
    resizeMode: 'cover'
  }
});

export default MiniPlayer;
