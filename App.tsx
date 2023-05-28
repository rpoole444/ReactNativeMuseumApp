import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

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

const App = () => {
const [data, setData] = useState<Artwork | null>(null)
const [loading, setLoading] = useState(true)



useEffect(() => {
 fetch('http://localhost:3001/api')
    .then(res => res.json())
    .then(data => setData(data.data[0]))
    .catch(error => console.error(error))
    .finally(() => setLoading(false))
}, [])

console.log("museumData: ", data)
  return (
    <>
    <View style={styles.container}>
      <Text>Welcome To Reid's First Mobile app!</Text>
      {loading ? (
        <Text>Loading...</Text>
        ) : (
          <View>
          <Text> Artist's Paintings </Text>
          <Text>{data?.creators[0].description}</Text> 
          <Image source={{uri: data?.images.web.url}} style={styles.image}/>
          <Text>{data?.title}</Text>
          <StatusBar style="auto" />
        </View>
      )}
    <View>
    </View>
    </View>
    </>
  );
}


const logo = {
  uri: 'https://cdn.sanity.io/images/cctd4ker/production/73a42b4ea1644b2085acaad2896bfa4699687664-2320x920.jpg?rect=405,0,1490,920&w=3840&q=75&fit=clip&auto=format',
  width: 400,
  height: 200,
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: logo.width,
    height: logo.height,
    marginTop: 30,
  }
});

export default App
