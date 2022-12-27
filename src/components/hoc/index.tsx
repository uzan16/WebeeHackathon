import React, { ReactNode } from 'react';
import {
  StatusBar,
  SafeAreaView,
  StyleSheet,
  Platform
} from 'react-native';

interface Props {
  children: ReactNode;
}

const Hoc = ({children}: Props) => {
  return (
    <>
      <SafeAreaView style={styles.container}>
        {children}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8FE'
  }
});

export default Hoc;
