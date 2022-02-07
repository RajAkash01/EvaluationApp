import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  ActivityIndicator,
} from 'react-native';
function SecondScreen({ route }) {
  const image = route.params.image;
  console.log('from seconscreen' + image);
  const [loading, setloading] = useState(true);
  return (
    <View style={styles.container}>
      <Text>SecondScreen</Text>

      <View style={{ alignItems: 'center', top: 100 }}>
        {loading == true ? (
          <ActivityIndicator size="large" color="red" />
        ) : null}
        <Image
          source={{ uri: image }}
          style={{
            width: 160,
            height: 160,
          }}
          onLoadEnd={() => setloading(false)}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default SecondScreen;
