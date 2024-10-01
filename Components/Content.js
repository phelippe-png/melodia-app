// Content.js
import React, { memo, useEffect, useRef, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, Image, ScrollView, TouchableOpacity } from 'react-native';
import MiniPlayer from './MiniPlayer'; // Importa o MiniPlayer
import HTTP from '../API/HTTP';
import SearchMusics from '../API/SearchMusics';

const { width } = Dimensions.get('window');

const Content = ({ activeTab, playMusic, musicInformations }) => {
  const [ultimasTocadas, setUltimasTocadas] = useState([])
  const [artistas, setArtistas] = useState([])
  const [musicas, setMusicas] = useState([])
  const [playlists, setPlaylists] = useState([])

  useEffect(() => {
    SearchMusics('http://191.252.194.153:8080', 'ultimas', (response) => {
      let data = JSON.stringify(response).replaceAll('tituloMusica', 'titulo').replaceAll('nomeArtista', 'artista')
      data = JSON.parse(data)
      setUltimasTocadas(data)
    })
  }, [])

  // useEffect(() => {
  //   SearchMusics('http://191.252.194.153:8080', 'artistas', (response) => {
  //     let data = JSON.stringify(response).replaceAll('artistaId', 'id')
  //     data = JSON.parse(data)
  //     setArtistas(data)
  //   })
  // }, [])

  useEffect(() => {
    SearchMusics('http://191.252.194.153:8080', 'musicas', setMusicas)
  }, [])

  useEffect(() => {
    SearchMusics('http://191.252.194.153:8080', 'playlists', (response) => {
      let data = JSON.stringify(response).replaceAll('nome', 'titulo').replaceAll('descricao', 'artista').replaceAll('descricao', 'capaUrl')
      data = JSON.parse(data)
      setPlaylists(data)
    })
  }, [])

  const onPlayMusic = (music) => {
    musicInformations.current = {
      songName: music.titulo,
      artistName: music.artista,
      songImage: music.capaUrl
    }

    playMusic(music.audioUrl)
  }

  const ItemCircular = ({ item }) => (
    <View>
      <View style={styles.itemCircular}>
        <Image source={{ uri: item.artistaFotoUrl }} style={styles.imageCircular} />
      </View>
      <Text style={styles.artistTitleText}>{item.nomeArtista}</Text>
    </View>
  );

  const ItemSquare = ({ item }) => (
    <TouchableOpacity onPress={() => onPlayMusic(item)}>
      <View style={styles.itemSquare}>
        <Image source={{ uri: item.capaUrl }} style={styles.imageSquare} />
      </View>
      <Text numberOfLines={2} style={styles.titleText}>{item.titulo}</Text>
      <Text numberOfLines={2} style={styles.subTitleText}>{item.artista}</Text>
    </TouchableOpacity>
  );

  const SliderCircular = ({ data }) => (
    <FlatList
      data={data}
      renderItem={({ item }) => <ItemCircular item={item} />}
      keyExtractor={item => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.slider}
    />
  );

  const SliderSquare = ({ data }) => (
    <FlatList
      data={data}
      renderItem={({ item }) => <ItemSquare item={item} />}
      keyExtractor={item => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.slider}
    />
  );

  // const shouldShowMiniPlayer = !['settings', 'profile'].includes(activeTab);

  switch (activeTab) {
    case 'favorites':
      return <Text style={styles.text}>Favorites Screen</Text>;
    case 'music':
      return <Text style={styles.text}>Music Screen</Text>;
    case 'settings':
      return <Text style={styles.text}>Settings Screen</Text>;
    case 'home':
    default:
      return (
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          style={styles.scrollView}
        >
          <View style={styles.container}>
            <Text style={styles.header}>Tocadas recentemente</Text>
            <SliderSquare data={ultimasTocadas?.content} />
            <Text style={styles.subHeader}>Seus artistas favoritos</Text>
            <SliderCircular data={artistas?.content} />
            <Text style={styles.subHeader}>Musicas</Text>
            <SliderSquare data={musicas?.content} />
            <Text style={styles.subHeader}>Suas playlists</Text>
            <SliderSquare data={playlists?.content} />
          </View>

          {/* {shouldShowMiniPlayer && (
            <MiniPlayer
              songName={musicInformations.current.songName}
              artistName={musicInformations.current.artistName}
              songImage={musicInformations.current.songImage}
              pauseSong={pauseMusic}
              continueSong={continueMusic}
              statusSong={musicStatus}
            />
          )} */}
        </ScrollView>
      );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 3,
    paddingTop: 20,
    paddingBottom: 140, 
  },
  header: {
    fontSize: 24,
    marginBottom: 10,
    marginLeft: 10,
    color: '#fff',
    fontFamily: 'Lato_900Black'
  },
  subHeader: {
    fontSize: 18,
    marginTop: 15,
    marginLeft: 10,
    color: '#fff',
    fontFamily: 'Lato_900Black'
  },
  scrollContainer: {
    flexGrow: 1,
  },
  scrollView: {
    flex: 1,
    paddingBottom: 80, 
  },
  slider: {
    paddingVertical: 10,
  },
  itemRectangular: {
    backgroundColor: '#f9c2ff',
    borderRadius: 10,
    height: 150,
    width: 150,
    marginHorizontal: 10,
    marginBottom: 4,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    elevation: 5, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 4, 
  },
  itemCircular: {
    backgroundColor: '#f9c2ff',
    borderRadius: 75,
    height: 120,
    width: 120,
    marginHorizontal: 10,
    marginBottom: 4,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    elevation: 5, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.1,
    shadowRadius: 4, 
  },
  itemSquare: {
    backgroundColor: '#f9c2ff',
    borderRadius: 7,
    height: width/3,
    width: width/3,
    marginHorizontal: 10,
    marginBottom: 3,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    elevation: 5, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 4, 
  },
  imageRectangular: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageCircular: {
    width: '100%',
    height: '100%',
    borderRadius: 75,
    resizeMode: 'cover',
  },
  imageSquare: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  text: {
    fontSize: 18,
    color: '#555',
  },
  titleText: {
    width: width/3,
    marginLeft: 10,
    color: 'white',
    fontSize: 14,
    fontFamily: 'Lato_900Black',
    flexWrap: 'wrap'
  },
  subTitleText: {
    marginLeft: 10,
    color: '#d3d2d2',
    fontSize: 13,
    fontFamily: 'Lato_400Regular',
    flexWrap: 'wrap'
  },
  artistTitleText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 14,
    flexWrap: 'wrap',
    fontFamily: 'Lato_900Black'
  }
});

export default Content;
