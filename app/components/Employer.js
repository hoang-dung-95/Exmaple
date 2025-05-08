import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import FormInput from './FormInput';

const WIDTH = Dimensions.get('window').width;

export default function Employer() {
  const [id, setID] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [saveID, setSaveID] = useState(false);

  const handleSubmit = useCallback(async () => {
    const newErrors = {};
    if (!id) newErrors.id = 'Vui lòng nhập ID';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log('dung log ', id, password);

      const res = await fetch(
        'https://congtynuocngoai.beberia.me/api/v1/employer/auth/login',
        {
          method: 'POST',
          body: JSON.stringify({user_uid: id, password: password}),
        },
      );
      console.log('dung log res', res);
    }
  }, [id, password]);

  const onSave = () => {
    setSaveID(!saveID);
  };
  return (
    <View>
      <View style={styles.textAlign}>
        <Text>Bạn cần tuyển dụng?</Text>
      </View>
      <View style={styles.form}>
        <FormInput
          value={id}
          //   onChangeText={setID}
          onChangeText={text => {
            setID(text);
            if (errors.id && text) {
              setErrors(prev => ({...prev, id: undefined}));
            }
            if (!text) {
              setErrors(prev => ({...prev, id: 'Vui lòng nhập ID'}));
            }
          }}
          error={errors.id}
          placeholder={'ID Nhà tuyển dụng'}
        />
        <FormInput
          value={password}
          //   onChangeText={setPassword}
          onChangeText={text => {
            setPassword(text);
            if (errors.password && text.length >= 6) {
              setErrors(prev => ({...prev, password: undefined}));
            }
          }}
          secureTextEntry={true}
          //   error={errors.password}
          placeholder={'Mật khẩu'}
        />
        <View style={styles.row}>
          <TouchableOpacity
            onPress={onSave}
            style={[styles.checkBox, saveID && {backgroundColor: 'blue'}]}
          />
          <Text>Lưu ID</Text>
        </View>
        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Đăng nhập</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity>
          <Text>Quên ID</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Quên Mật khẩu</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Đăng ký</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {gap: 12, padding: 16},
  button: {
    marginTop: 16,
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {color: '#fff', fontWeight: 'bold'},
  textAlign: {
    marginTop: 32,
    alignSelf: 'center',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 32,
  },
  checkBox: {
    width: 16,
    height: 16,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    marginRight: 8,
  },
  row: {
    flexDirection: 'row',
  },
});
