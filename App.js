/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
} from 'react-native';
import styles from './components/stylesheet';
import Greeting from './components/greeting';
import Lobby from './components/lobby';
import ParticipatingSpirit from './components/participating-spirit';
import AnsweringSpirit from './components/answering-spirit';
import QuestionAsker from './components/question-asker';
import ErrorBoundary from './components/error-boundary';

const App: () => React$Node = () => {
  const [userAuth, setUserAuth] = useState(null);
  const [currentScreen, setCurrentScreen] = useState('greeting');
  const [gameData, setGameData] = useState({});
  const [gameID, setGameID] = useState();
  const [initializing, setInitializing] = useState(true);
  const [error, setError] = useState('');

  var subscriber = null;

  //change the current screen to a new screen
  const changeScreen = newScreen => {
    setCurrentScreen(newScreen);
  };

  //update the stored game data when the db game data changes
  const updateGameData = newGameData => {
    setGameData(newGameData);
  };

  //create the joinGame function here

  //create the updatePlayers function here

  //create the getPlayers function here

  //create the getAvatar function here

  const onAuthStateChanged = user => {
    setUserAuth(user);
    if (initializing) {
      setInitializing(false);
    }
  }

  //write your useEffect code here

  //while we wait for the authentication process to complete, show a blank screen
  if (initializing) {
    return null;
  };


  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ErrorBoundary style={styles}>
          {(() => {
            if ((gameData !== undefined) && (gameData.status === "playing") && (gameData.questionAsker.uid === auth().currentUser.uid)) {
              return <QuestionAsker styles={styles} GameData={gameData} GameID={gameID} auth={auth().currentUser} />
            }

            if ((gameData !== undefined) && (gameData.status === "playing") && (gameData.answeringSpirit.uid === auth().currentUser.uid)) {
              return <AnsweringSpirit styles={styles} GameData={gameData} GameID={gameID} />
            }

            if ((gameData !== undefined) && (gameData.status === "playing")) {
              return <ParticipatingSpirit styles={styles} GameData={gameData} GameID={gameID} />
            }

            if ((currentScreen === 'greeting') && (auth)) {
              return <Greeting styles={styles} CurrentScreen={currentScreen} changeScreen={changeScreen} joinGame={joinGame} />
            }

            if ((currentScreen === 'lobby') && (auth)) {
              return <Lobby styles={styles} auth={auth().currentUser} GameData={gameData} GameID={gameID} changeScreen={changeScreen} />
            }
          })()}
        </ErrorBoundary>
      </SafeAreaView>
    </>
  );
};

export default App;
