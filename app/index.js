import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import Employer from './components/Employer';

const WIDTH = Dimensions.get('window').width;
const Main = () => {
  const [tabSelect, setTabSelect] = useState(0);

  const onSelect = value => {
    setTabSelect(value);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tabs}>
        <TouchableOpacity
          onPress={() => onSelect(0)}
          style={[styles.tab, tabSelect === 0 && styles.line]}>
          <Text>Ứng Viên</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onSelect(1)}
          style={[styles.tab, tabSelect === 1 && styles.line]}>
          <Text>Nhà tuyển dụng</Text>
        </TouchableOpacity>
      </View>
      {tabSelect === 0 ? <View /> : <Employer />}
    </SafeAreaView>
  );
};
export default Main;

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20},
  tabs: {
    flexDirection: 'row',
    marginTop: 32,
  },
  tab: {
    width: WIDTH / 2,
    padding: 8,
    alignItems: 'center',
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: 'blue',
  },
});
