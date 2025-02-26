import {useState} from 'react';
import Sound from 'react-native-sound';

Sound.setCategory('Playback');

const useAudioPlayer = () => {
  const [sound, setSound] = useState<Sound | null>(null);

  const playAudio = (url: string) => {
    if (!url) return;
    console.log(url);

    if (sound) {
      sound.stop(() => {
        sound.release();
      });
    }

    const newSound = new Sound(url, '', error => {
      if (error) {
        console.log('Error loading sound:', error);
        return;
      }

      newSound.play(success => {
        if (success) {
          console.log('Audio finished playing');
        } else {
          console.log('Playback failed');
        }
        newSound.release();
      });
    });

    setSound(newSound);
  };

  return {playAudio};
};

export default useAudioPlayer;
