import {useState} from 'react';
import Sound from 'react-native-sound';

const useAudioPlayer = () => {
  const [sound, setSound] = useState<Sound | null>(null);

  const playAudio = (audioUrl: string) => {
    // Stop and release any currently playing audio
    if (sound) {
      sound.stop(() => {
        sound.release();
      });
    }

    // Load and play new audio
    const newSound = new Sound(audioUrl, error => {
      if (error) {
        console.log('Failed to load sound', error);
        return;
      }
      newSound.play(success => {
        if (success) {
          console.log('Finished playing');
        } else {
          console.log('Playback failed');
        }
        newSound.release();
        setSound(null);
      });
      setSound(newSound);
    });
  };

  return {playAudio};
};

export default useAudioPlayer;
