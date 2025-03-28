import React, { useState } from 'react';
import { View, Image, Button, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const App = () => {
  const [photo, setPhoto] = useState(null);

  const takePhoto = async () => {
    // Yêu cầu quyền truy cập camera
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Quyền truy cập bị từ chối', 'Bạn cần cấp quyền để sử dụng camera.');
      return;
    }

    // Mở camera
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
    });

    if (!result.canceled) {
      setPhoto({ uri: result.assets[0].uri });
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={photo ? photo : require('../../assets/images/icon.png')}
        style={styles.image}
      />
      <Button title="Chụp ảnh" onPress={takePhoto} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
});

export default App;
