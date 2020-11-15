import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

class Przycisk extends Component {
  render() {
    const {text, style, klik, isVisible} = this.props;
    return (
      <TouchableOpacity
        style={[style, isVisible && styles.hidden]}
        onPress={klik}>
        <Text style={styles.centeredText}>{text}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  centeredText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 30,
  },
  hidden: {
    display: 'none',
  },
});

export default Przycisk;
