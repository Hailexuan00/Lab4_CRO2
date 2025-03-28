import React, { useState } from 'react';
import { View, Image, Button, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const App = () => {
  const [photo, setPhoto] = useState(null);

  const pickImage = async () => {
    // Yêu cầu quyền truy cập thư viện ảnh
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Quyền truy cập bị từ chối', 'Bạn cần cấp quyền để chọn ảnh từ thư viện.');
      return;
    }

    // Mở thư viện ảnh
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto({ uri: result.assets[0].uri });
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={photo ? { uri: photo.uri } : require('../../assets/images/icon.png')}
        style={styles.image}
      />
      <Button title="Chọn ảnh từ thư viện" onPress={pickImage} />
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
