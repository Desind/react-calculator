import React from 'react';
import Przycisk from './Przycisk';
import SplashScreen from 'react-native-splash-screen';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';
import set from '@babel/runtime/helpers/esm/set';

const App: () => React$Node = () => {
  console.disableYellowBox = true;
  useEffect(() => {
    SplashScreen.hide();
  },[]);

  Dimensions.addEventListener("change", () => {
    const { width, height } = Dimensions.get("window");
    let orientation = (width > height) ? "landscape" : "portrait";
    if(orientation == "portrait"){
      setVisible(false);
    }else{
      setVisible(true);
    }
  });


  const [visible,setVisible] = useState(false);

  const [wynik, setWynik] = useState("0");
  const [buffer, setBuffer] = useState("0");
  const [bufferSign, setBufferSign] = useState(null);
  const [usedDot, setUsedDot] = useState(false);
  const [firstInput,setFirstInput] = useState(true);

  const AC = () => {
    setFirstInput(true);
    setBuffer("0");
    setBufferSign(null);
    setWynik("0");
    setUsedDot(false);
  }
  const numberInput = (number) => {
    if(firstInput){
      setFirstInput(false);
      if(number == "0"){
        setWynik("0.");
      }else{
        setWynik(number);
      }
    }else{
      setWynik(wynik+number);
    }
  }
  const dotInput = () => {
    if(firstInput){
      setFirstInput(false);
      setWynik("0.");
      setUsedDot(true);
    }else{
      if(usedDot == false){
        setUsedDot(true);
        setWynik(wynik+".");
      }
    }
  }
  const switchSign = () => {
    let tmp = parseFloat(wynik)*(-1);
    setWynik(tmp.toString());
  }
  const unaryOperator = (operator) => {
    switch(operator){
      case "%": {
        setWynik((parseFloat(wynik)/100).toString());
        break;
      }
    }
  }
  const binaryOperator = (operator) => {
    if(bufferSign==null){
      setBufferSign(operator);
      setBuffer(wynik);
      setWynik("0");
      setUsedDot(false);
      setFirstInput(true);
    }else{
      switch(bufferSign){
        case "+":{
          setBuffer((parseFloat(wynik)+parseFloat(buffer)).toString());
          break;
        }
        case "-": {
          setBuffer((parseFloat(buffer)-parseFloat(wynik)).toString());
          break;
        }
        case "*": {
          setBuffer((parseFloat(buffer)*parseFloat(wynik)).toString());
          break;
        }
        case "/": {
          setBuffer((parseFloat(buffer)/parseFloat(wynik)).toString());
          break;
        }
      }
      setWynik("0");
      setUsedDot(false);
      setFirstInput(true);
      setBufferSign(operator);
    }
  }
  const factorial = () => {
    let value = parseInt(wynik);
    for(let i = 1; i<wynik; i++){
      value = value * i;
    }
    setWynik(value);
  }
  const ln = () => {
    setWynik(Math.log(parseFloat(wynik)));
  }
  const power10 = () => {
    setWynik(Math.pow(10,parseFloat(wynik)));
  }
  const power2 = () => {
    setWynik(Math.pow(parseFloat(wynik),2));
  }
  const power3 = () => {
    setWynik(Math.pow(parseFloat(wynik),3));
  }
  const finishCalc = () => {
    switch(bufferSign){
      case "+":{
        setWynik((parseFloat(wynik)+parseFloat(buffer)).toString());
        break;
      }
      case "-": {
        setWynik((parseFloat(buffer)-parseFloat(wynik)).toString());
        break;
      }
      case "*": {
        setWynik((parseFloat(buffer)*parseFloat(wynik)).toString());
        break;
      }
      case "/": {
        setWynik((parseFloat(buffer)/parseFloat(wynik)).toString());
        break;
      }
    }
    setBuffer("0");
    setBufferSign(null);
  }


  const buttArray1 = [
    {name:'x!', operation:() => factorial(), style:styles.darkButton, vis:!visible},
    {name:'AC', operation:() => AC(), style:styles.darkButton, vis: false},
    {name:'+/-', operation:() => switchSign(), style:styles.darkButton, vis: false},
    {name:'%', operation:() => unaryOperator("%"), style:styles.darkButton, vis: false},
    {name:'÷', operation:() => binaryOperator("/"), style:styles.orangeButton, vis: false},
  ]
  const buttArray2 = [
    {name:'10^x', operation:() => power10(), style:styles.darkButton, vis:!visible},
    {name:'7', operation:() => numberInput("7"), style:styles.button, vis: false},
    {name:'8', operation:() => numberInput("8"), style:styles.button, vis: false},
    {name:'9', operation:() => numberInput("9"), style:styles.button, vis: false},
    {name:'×', operation:() => binaryOperator("*"), style:styles.orangeButton, vis: false},
  ]
  const buttArray3 = [
    {name:'ln', operation:() => ln(), style:styles.darkButton, vis:!visible},
    {name:'4', operation:() => numberInput("4"), style:styles.button, vis: false},
    {name:'5', operation:() => numberInput("5"), style:styles.button, vis: false},
    {name:'6', operation:() => numberInput("6"), style:styles.button, vis: false},
    {name:'-', operation:() => binaryOperator("-"), style:styles.orangeButton, vis: false},
  ]
  const buttArray4 = [
    {name:'x^2', operation:() => power2(), style:styles.darkButton, vis:!visible},
    {name:'1', operation:() => numberInput("1"), style:styles.button, vis: false},
    {name:'2', operation:() => numberInput("2"), style:styles.button, vis: false},
    {name:'3', operation:() => numberInput("3"), style:styles.button, vis: false},
    {name:'+', operation:() => binaryOperator("+"), style:styles.orangeButton, vis: false},
  ]
  const buttArray5 = [
    {name:'x^3', operation:() => power3(), style:styles.darkButton, vis:!visible},
    {name:'0', operation:() => numberInput("0"), style:styles.buttonZero, vis: false},
    {name:',', operation:() => dotInput(), style:styles.button, vis: false},
    {name:'=', operation:() => finishCalc(), style:styles.orangeButton, vis: false},
  ]

  const buttArray = [
    buttArray1,
    buttArray2,
    buttArray3,
    buttArray4,
    buttArray5,
  ]

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.mainContainer}>

        <View style={styles.screenGroup}>
          <View style={styles.bufferScreen}>
            <Text style={styles.bufferText}>{buffer}</Text>
          </View>
          <View style={styles.calcScreen}>
            <Text style={styles.screenText}>{wynik}</Text>
          </View>
        </View>

        {buttArray.map((row, number) =>
            <View style={styles.horizontalGroup}>
              {row.map((item,number) =>
                  <Przycisk text={item.name} style={item.style} klik={item.operation} isVisible={item.vis}/>
              )}
            </View>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  calcScreen: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#333',
  },
  bufferScreen: {
    flex: 0.5,
    justifyContent: 'center',
    paddingTop: 10,
    backgroundColor: '#333',
  },
  horizontalGroup: {
    flex: 1,
    backgroundColor: '#555',
    flexDirection: 'row',
  },
  screenGroup: {
    flex: 1.2,
    backgroundColor: '#555',
    flexDirection: 'column',
  },
  button: {
    flex: 1,
    backgroundColor: '#777',
    justifyContent: 'center',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#444',
  },
  buttonZero: {
    flex: 2,
    backgroundColor: '#777',
    justifyContent: 'center',
    textAlign: 'center',
    borderTopWidth:1,
    borderWidth: 0,
    marginEnd:2,
    marginStart:2,
    borderColor: '#444',
  },
  centeredText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 30,
  },
  screenText: {
    padding: 20,
    color: 'white',
    fontSize: 45,
    textAlign: 'right',
  },
  bufferText: {
    padding: 20,
    color: '#AAA',
    fontSize: 20,
    textAlign: 'right',
  },
  orangeButton:{
    flex: 1,
    backgroundColor: '#DD8C11',
    justifyContent: 'center',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#444',
  },
  darkButton:{
    flex: 1,
    backgroundColor: '#555',
    justifyContent: 'center',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#444',
  }
});

export default App;
