import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';

interface Creator {
  description: string;
}

interface Images {
  web: {
    url: string;
  }
}

interface Artwork { 
  creators: Creator[];
  images: Images;
  title: string;
}

interface APIResponse {
  data: Artwork[];
}

const App = () => {
const [data, setData] = useState<Artwork[]>([])
const [loading, setLoading] = useState(true)


const allArtists = data.map((artist, index) => {
  return (
      <View style={styles.artworkContainer} key={index}>
        <Text style={styles.text}>Creator: {artist.creators[0]?.description}</Text>
        {artist.images && artist.images.web && artist.images.web.url && 
          <Image source={{uri: artist.images.web.url}} style={styles.image}/>
        }
        <Text>{artist.title}</Text>
        <StatusBar style="auto" />
      </View>
  )
})

useEffect(() => {
 fetch('http://localhost:3001/api')
    .then(res => res.json() as Promise<APIResponse>)
    .then(data => setData(data.data))
    .catch(error => console.error(error))
    .finally(() => setLoading(false))
}, [])

// console.log("museumData: ", data)
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text>Welcome To Reid's First Mobile app!</Text>
      {loading ? (
        <Text>Loading...</Text>
        ) : (
         allArtists 
      )}
    </ScrollView>
    
  );
}


const logo = {
  uri: 'https://cdn.sanity.io/images/cctd4ker/production/73a42b4ea1644b2085acaad2896bfa4699687664-2320x920.jpg?rect=405,0,1490,920&w=3840&q=75&fit=clip&auto=format',
  width: 400,
  height: 400,
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    alignItems: 'center'
  },
  artworkContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    margin: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 30,
  },
  text: {
    marginTop: 30
  }
});

export default App
