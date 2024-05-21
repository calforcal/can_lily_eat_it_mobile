import { StyleSheet, Text, View, Button, ImageBackground, Image } from 'react-native';

export default function HomeScreen({ navigation }: any) {
  
  const {uri} = Image.resolveAssetSource(require('../assets/background_image.jpg'))

  return (
    <ImageBackground source={{uri}} resizeMode='cover' style={styles.image} >
      <View>
        <Text>Home Buddy</Text>
        <Button title="Go To Search" onPress={() => navigation.navigate("Search")}/>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    height: '100%',
    width: '100%'
  }
});