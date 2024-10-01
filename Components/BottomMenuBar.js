import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const BottomMenuBar = ({ setActiveTab }) => {
  return (
    <View style={styles.bottomMenuBar}>
      <TouchableOpacity
        style={styles.bottomIconContainer}
        onPress={() => setActiveTab('home')}
      >
        <Image
          source={require('../MELODIA/LOGO-MELODIA-17.png')}
          style={styles.bottomLogo}
        />
        <Text style={styles.bottomIconText}>Início</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.bottomIconContainer}
        onPress={() => {}}
      >
        <Icon name="search" size={27} color="#33044a" />
        <Text style={styles.bottomIconText}>Buscar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.bottomIconContainer}
        onPress={() => setActiveTab('music')}
      >
        <MaterialIcon name="library-music" size={27} color="#33044a" />
        <Text style={styles.bottomIconText}>Biblioteca</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomMenuBar: {
    position: 'absolute',
    bottom: 0,
    height: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    elevation: 10, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 }, 
    shadowOpacity: 0.3, 
    shadowRadius: 8,
  },
  bottomIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 60, 
    width: 90,
  },
  bottomLogo: {
    width: 90,
    height: 27,
    resizeMode: 'contain',
  },
  bottomIconText: {
    fontFamily: 'Lato_700Bold',
    color: '#33044a'
  }
});

export default BottomMenuBar;
