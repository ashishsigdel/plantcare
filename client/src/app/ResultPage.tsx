import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Result from '../components/result/Result';
import {StatusBar} from 'react-native';

const ResultPage = () => {
  return (
    <>
      <Result />
      <StatusBar barStyle={'dark-content'} />
    </>
  );
};

export default ResultPage;

const styles = StyleSheet.create({});
