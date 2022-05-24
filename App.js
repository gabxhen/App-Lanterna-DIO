
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Torch from 'react-native-torch';
import RNShake from 'react-native-shake';


const App = () => {
  const [toggle, setToggle] = useState(false);

  const handleChangeToggle = () => {
    console.log("Alteraçao feita.");
    setToggle(oldToggle => !oldToggle);
  };

  useEffect( () => {
    // liga o flash.
    Torch.switchState(toggle);
  }, [toggle]);

  useEffect( () => {
    // Quando for chacoalhado, mudaremos para o toggle.
    const subscription = RNShake.addListener(() => {
      setToggle(oldToggle => !oldToggle)
    });
    return () => subscription.remove();
  },[]);


  return ( 
  <View style={toggle ? styles.containerLight : styles.containerBlack}>

    <TouchableOpacity onPress={handleChangeToggle}>

      <Image style={toggle ? styles.lightOn : styles.lightOff} source={toggle ? require('./assets/icons/eco-light.png') : require('./assets/icons/eco-light-off.png')}/>
      <Image style={styles.logoAva} source={toggle ? require('./assets/icons/avanade.png') : require('./assets/icons/avanade-branca.png')}/>

    </TouchableOpacity>
  </View>

  );

}

export default App;

const styles = StyleSheet.create({
  containerBlack: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },

  containerLight: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },

  lightOn: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 150,
    height: 150,
  },

  lightOff: {
    resizeMode: 'contain',
    alignSelf: 'center',
    tintColor: 'white',
    width: 150,
    height: 150,
  },

  logoAva: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 300,
    height: 300,
  },
});