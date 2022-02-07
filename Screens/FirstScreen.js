import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Text,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import { create } from 'apisauce';
import SecondScreen from './SecondScreen';

function FirstScreen({ navigation }) {
  const [image, setimage] = useState();
  const [visible, setvisible] = useState(false);
  useEffect(() => {
    fetchdata();
    setTimeout(() => {
      setvisible(true);
    }, 200);
  }, []);

  const fetchdata = async () => {
    const api = create({
      baseURL: 'https://dog.ceo',
      headers: { 'Content-Type': 'application/json' },
    });
    const endpoint = '/api/breeds/image/random';
    await api
      .get(endpoint)
      .then((item) => {
        if (item.ok) {
          setimage(item.data.message);
        }
      })
      .then(console.log(image))
      .catch((error) =>
        ToastAndroid.showWithGravity(
          error,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        )
      );

    if (image != undefined) {
      navigation.navigate('Second', { image });
    } else {
      () => fetchdata();
      //   setTimeout(() => {
      //     navigation.navigate('Second', { image });
      //   }, 1000);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={{}}>FirstScreen</Text>
      {visible ? (
        <View style={{ top: 300, alignItems: 'center' }}>
          <TouchableOpacity
            style={{
              width: 80,
              height: 50,
              borderWidth: 1,
              borderColor: 'grey',
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => fetchdata()}
          >
            <Text>Fetch</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});
export default FirstScreen;
