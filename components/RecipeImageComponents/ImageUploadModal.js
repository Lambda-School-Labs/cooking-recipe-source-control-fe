import React from 'react';
import { View, TouchableOpacity, Alert, Image, Text } from 'react-native';
import Modal from 'react-native-modal';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import styles from '../../styles/recipeImageStyles';
import { useDispatch } from 'react-redux';
import { editImage } from '../../store/singleRecipe/singleRecipeActions';
import {
  generateIngredients,
  generateInstructions,
  fetchTitleFromImage,
} from '../../store/generate/generateRecipeAction';
import camera from '../../assets/camera_red.png';
import gallery from '../../assets/image_red.png';

function ImageUploadModal({
  visible,
  setVisible,
  setRecipe,
  setIngredients,
  setInstructions,
  setTitle,
  parent,
}) {
  const dispatch = useDispatch();
  const take = 'take';
  const choose = 'choose'; // Pass take or choose as argument to getImage()

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(
      Permissions.CAMERA,
      Permissions.CAMERA_ROLL
    );
    if (result.status !== 'granted') {
      Alert.alert(
        'Insufficient Permissions',
        'You must grant permissions to upload a photo.',
        [{ text: 'Okay' }]
      );
      return false;
    } else {
      return true;
    }
  };
  // @param {string} method
  //(value of "take" will launch camera, "choose" will open image gallery)
  const getImage = async (method) => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) return;

    let imgConfig = {};

    parent === 'generateIngredients' ||
    parent === 'generateInstructions' ||
    parent === 'generateTitle'
      ? (imgConfig = {
          base64: true,
          quality: 0.5,
          allowsEditng: true,
        })
      : (imgConfig = {
          allowsEditing: true,
          aspect: [16, 9],
          quality: 0.5,
        });

    let img = '';

    const calculateImageSize = (base64String) => {
      let padding, inBytes, base64StringLength;
      if (base64String.endsWith('==')) padding = 2;
      else if (base64String.endsWith('=')) padding = 1;
      else padding = 0;
      base64StringLength = base64String.length;
      console.log(base64StringLength);
      inBytes = (base64StringLength / 4) * 3 - padding;
      console.log(inBytes);
      this.kbytes = inBytes / 1000;
      return this.kbytes;
    };

    if (method === take) {
      img = await ImagePicker.launchCameraAsync(imgConfig);
    } else if (method === choose) {
      img = await ImagePicker.launchImageLibraryAsync(imgConfig);
    }

    if (img && !img.cancelled) {
      if (parent === 'create') {
        setRecipe((oldRecipe) => ({
          ...oldRecipe,
          img: img.uri,
        }));
      } else if (parent === 'editRecipe') {
        dispatch(editImage(img.uri));
      } else if (parent === 'generateIngredients') {
        dispatch(generateIngredients(img.base64));
        setIngredients(false);
      } else if (parent === 'generateInstructions') {
        dispatch(generateInstructions(img.base64));
        setInstructions(false);
      } else if (parent === 'generateTitle') {
        dispatch(fetchTitleFromImage(img.uri));
        setTitle(false);
      }
    }
    setVisible(false);
  };

  return (
    <Modal
      animationIn="fadeIn"
      animationOut="fadeOut"
      animationInTiming={400}
      animationOutTiming={400}
      hideModalContentWhileAnimating={true}
      isVisible={visible}
      backdropOpacity={0.4}
      onBackdropPress={() => setVisible(false)}
    >
      <View style={styles.uploadModal}>
        <View style={styles.iconsContainer}>
          <TouchableOpacity
            style={styles.singleIconContainer}
            testID="cameraIcon"
            onPress={() => getImage(take)}
          >
            <Image
              style={{
                ...styles.iconLarge,
                ...styles.iconLargeCamera,
              }}
              source={camera}
            />
            <Text style={styles.text}>Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity
            testID="imageIcon"
            style={styles.singleIconContainer}
            onPress={() => getImage(choose)}
          >
            <Image style={styles.iconLarge} source={gallery} />
            <Text style={styles.text}>Gallery</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

export default ImageUploadModal;
