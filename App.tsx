import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const App = () => {
const [data, setData] = useState('')
const [loading, setLoading] = useState(true)

useEffect(() => {
 fetch('http://localhost:3001/api')
    .then(res => res.json())
    .then(data => setData(data))
    .catch(error => console.error(error))
    .finally(() => setLoading(false))
}, [])

console.log(data)
  return (
    <View style={styles.container}>
      <Text>Welcome To Reid's First Mobile app!</Text>
      <Image source={logo} style={styles.image}/>
      <StatusBar style="auto" />
    </View>
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
