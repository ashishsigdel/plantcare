import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const screenWidth = Dimensions.get('window').width;

interface ImageSliderProps {
  images: string[];
}

const Images: React.FC<ImageSliderProps> = ({images}) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < images.length - 1) {
      const nextIndex = currentIndex + 1;
      scrollViewRef.current?.scrollTo({
        x: nextIndex * screenWidth,
        animated: true,
      });
      setCurrentIndex(nextIndex);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      scrollViewRef.current?.scrollTo({
        x: prevIndex * screenWidth,
        animated: true,
      });
      setCurrentIndex(prevIndex);
    }
  };

  const handleScroll = (event: any) => {
    const newIndex = Math.round(
      event.nativeEvent.contentOffset.x / screenWidth,
    );
    setCurrentIndex(newIndex);
  };

  return (
    <View style={styles.imageSwiper}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}>
        {images.map((image, index) => (
          <Image key={index} source={{uri: image}} style={styles.swipeImage} />
        ))}
      </ScrollView>

      {/* Navigation Buttons */}
      {currentIndex > 0 && (
        <TouchableOpacity style={styles.prevButton} onPress={handlePrev}>
          <Icon name="chevron-back" size={30} color="white" />
        </TouchableOpacity>
      )}
      {currentIndex < images.length - 1 && (
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Icon name="chevron-forward" size={30} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Images;

const styles = StyleSheet.create({
  imageSwiper: {
    height: 300,
    position: 'relative',
  },
  swipeImage: {
    width: screenWidth,
    height: '100%',
    resizeMode: 'cover',
  },
  prevButton: {
    position: 'absolute',
    top: '50%',
    left: 10,
    transform: [{translateY: -15}],
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: 10,
  },
  nextButton: {
    position: 'absolute',
    top: '50%',
    right: 10,
    transform: [{translateY: -15}],
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: 10,
  },
});
