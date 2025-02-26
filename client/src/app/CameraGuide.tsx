import React from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const CameraGuide = () => {
  return (
    <View style={styles.container}>
      {/* Semi-transparent overlay */}
      <View style={styles.overlay}>
        <View style={styles.guideBox}>
          <Text style={styles.guideText}>Align your plant here</Text>
        </View>
      </View>
    </View>
  );
};

export default CameraGuide;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay for visibility
    justifyContent: 'center',
    alignItems: 'center',
  },
  guideBox: {
    width: width * 0.8,
    height: height * 0.5,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Slightly visible center box
  },
  guideText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
