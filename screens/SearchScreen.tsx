import { useState } from 'react';
import { Button, SafeAreaView, TextInput, ImageBackground, StyleSheet, Text, View, Image } from 'react-native';
import CheckBox from 'expo-checkbox';

const {uri} = Image.resolveAssetSource(require('../assets/background_image.jpg'))

function SearchScreen() {

  const[result, setResult] = useState();

  const[text, onChangeText] = useState('');
  const[wheatStatus, setWheatStatus] = useState(false);
  const[dairyStatus, setDairyStatus] = useState(false);
  const[eggStatus, setEggStatus] = useState(false);
  const[soyStatus, setSoyStatus] = useState(false);
  const[fishStatus, setFishStatus] = useState(false);
  const[shellfishStatus, setShellfishStatus] = useState(false);
  const[treenutStatus, setTreenutStatus] = useState(false);
  const[peanutStatus, setPeanutStatus] = useState(false);

  const allergenHash: object = {
    'dairy': dairyStatus,
    'soy': soyStatus,
    'wheat': wheatStatus,
    'egg': eggStatus,
    'fish': fishStatus,
    'shellfish': shellfishStatus,
    'treenut': treenutStatus,
    'peanut': peanutStatus,
  }

  const allergenArray = () => {
    let arr: string[] = []
    for (const key in allergenHash) {
      if (allergenHash[key as keyof typeof allergenHash] == true) {
        arr.push(key)
      }
    }

    return arr;
  }

  const getUpcInfo = (value: string) => {
    let stringAllergens = allergenArray().join(",")
    fetch(`https://can-lily-eat-it.onrender.com/api/v1/upc_items?upc=${value}&allergens=${stringAllergens}`, {
      headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      if (response.status == 204) {
        return "No Data."
      }
      else {
        return response.json()
      }
    })
    .then((data) => setResult(data.data.attributes.name))
  };

  const handleSubmit = () => {
    getUpcInfo(text);
  };

  return (
    <ImageBackground source={{uri}} resizeMode='cover' style={styles.image}>
      <SafeAreaView>
          <View>
            <Text style={styles.searchHeading}>Enter a UPC Code Below</Text>
            <TextInput style={styles.input} onChangeText={onChangeText} value={text} placeholder='Enter UPC Code here...' />
            <View style={styles.checkBoxContainer}>
              <View style={styles.checkBoxLine}>
                <CheckBox style={styles.checkbox} value={dairyStatus} onValueChange={(value) => setDairyStatus(value)}/>
                <Text style={styles.checkBoxLabel}>Dairy</Text>
              </View>
              <View style={styles.checkBoxLine}>
                <CheckBox style={styles.checkbox} value={soyStatus} onValueChange={(value) => setSoyStatus(value)}/>
                <Text style={styles.checkBoxLabel}>Soy</Text>
              </View>
              <View style={styles.checkBoxLine}>
                <CheckBox style={styles.checkbox} value={wheatStatus} onValueChange={(value) => setWheatStatus(value)}/>
                <Text style={styles.checkBoxLabel}>Wheat</Text>
              </View>
              <View style={styles.checkBoxLine}>
                <CheckBox style={styles.checkbox} value={eggStatus} onValueChange={(value) => setEggStatus(value)}/>
                <Text style={styles.checkBoxLabel}>Egg</Text>
              </View>
              <View style={styles.checkBoxLine}>
                <CheckBox style={styles.checkbox} value={fishStatus} onValueChange={(value) => setFishStatus(value)}/>
                <Text style={styles.checkBoxLabel}>Fish</Text>
              </View>
              <View style={styles.checkBoxLine}>
                <CheckBox style={styles.checkbox} value={shellfishStatus} onValueChange={(value) => setShellfishStatus(value)}/>
                <Text style={styles.checkBoxLabel}>Shellfish</Text>
              </View>
              <View style={styles.checkBoxLine}>
                <CheckBox style={styles.checkbox} value={peanutStatus} onValueChange={(value) => setPeanutStatus(value)}/>
                <Text style={styles.checkBoxLabel}>Peanut</Text>
              </View>
              <View style={styles.checkBoxLine}>
                <CheckBox style={styles.checkbox} value={treenutStatus} onValueChange={(value) => setTreenutStatus(value)}/>
                <Text style={styles.checkBoxLabel}>Treenut</Text>
              </View>
            </View>
            <Button title="Submit Me" onPress={handleSubmit}/>
            <View>
              <Text>{result}</Text>
            </View>
          </View>
      </SafeAreaView>
    </ImageBackground>
  )
}

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    height: '100%',
    width: '100%'
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  searchHeading: {
    fontSize: 32,
    textAlign: 'center'
  },
  checkBoxLine: {
    display: 'flex',
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center'
  },
  checkbox: {
    display: 'flex',
    width: 35,
    height: 35
  },
  checkBoxContainer: {
    display: 'flex',
    margin: 'auto',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '25%'
  },
  checkBoxLabel: {
    paddingLeft: 10,
    fontSize: 20,
  }
});