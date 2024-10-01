import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const MenuBar = ({ setActiveTab }) => {
  return (
    <View style={styles.menuBar}>
      <View style={styles.leftContainer}>
        <TouchableOpacity onPress={() => setActiveTab('home')}>
          <Image source={require('../MELODIA/LOGO-MELODIA-14.png')} style={styles.logo} />
        </TouchableOpacity>
      </View>
      <View style={styles.rightContainer}>
        <TouchableOpacity style={styles.iconContainer}>
          <Icon name="bell-o" size={27} color="#33044a" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconContainer}>
          <Image
            source={require('../MELODIA/AvatarImg.jpg')}
            style={styles.profilePic}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconContainer}>
          <Icon name="bars" size={27} color="#33044a" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  menuBar: {
    position: 'absolute',
    top: 0,
    height: 90,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    elevation: 10, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 6 }, 
    shadowOpacity: 0.3, 
    shadowRadius: 8, 
    zIndex: 1,
    paddingTop: 40,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  profilePic: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#6a0dad',
    overflow: 'hidden',
    marginHorizontal: 10,
    resizeMode: 'cover',
  },
  iconContainer: {
    padding: 10,  
    justifyContent: 'center',
    alignItems: 'center', 
  },
});

export default MenuBar;
