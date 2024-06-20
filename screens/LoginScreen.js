import { Keyboard, KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, View, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../AuthContext';

const LoginScreen = () => {

  const [email, setEmail ] = useState("");
  const [password, setPassword ] = useState("");
  const navigation = useNavigation();
  const {token, setToken} = useContext(AuthContext);
  useEffect(() => {
    if (token) {
      navigation.replace("MainStack", { screen: "Main" });
    }
  }, [token, navigation]);


  const handleLogin = () => {
    const user = {
      email: email,
      password: password,
    };


    axios.post("http://192.168.18.3:8000/login", user).then(response => {
      const token = response.data.token;
      AsyncStorage.setItem("authToken", token);
      setToken(token);
    });


  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ padding: 10, alignItems: "center" }}>
        <KeyboardAvoidingView>
          <View style={{ marginTop: 80, alignItems: "centre", justifyContent: "center" }}>
            <Text style={{ fontSize: 20, fontWeight: "500", color: "black" }}>Login to your Account</Text>
          </View>
          <View style={{ marginTop: 50 }}>
            <View>
              <Text style={{ fontSize: 18, fontWeight: '600', color: "gray" }}>Email:</Text>
              <View>
                <TextInput value={email} onChangeText={setEmail} placeholderTextColor="#BEBEBE"
                  style={{
                    width: 340, marginTop: 15,
                    borderBottomColor: "BEBEBE",
                    borderBottomWidth: 1,
                    padding: 10,
                    fontFamily: "GeezaPro-Bold",
                    fontSize: email ? 15 : 15
                  }}
                  placeholder='Enter you Email'
                />
              </View>


              <Text style={{ fontSize: 18, fontWeight: '600', color: "gray", marginTop: 25 }}>Password:</Text>
              <View>
                <TextInput secureTextEntry={true} value={password} onChangeText={setPassword} placeholderTextColor="#BEBEBE"
                  style={{
                    width: 340, marginTop: 15,
                    borderBottomColor: "BEBEBE",
                    borderBottomWidth: 1,
                    padding: 10,
                    fontFamily: "GeezaPro-Bold",
                    fontSize: email ? 15 : 15
                  }}
                  placeholder='Enter you Password'
                />
              </View>
            </View>

            <Pressable
              onPress={handleLogin}

              style={{
                width: 200, backgroundColor: "#4A55A2", padding: 15, marginTop: 50, marginLeft: "auto",
                marginRight: "auto", borderRadius: 6
              }}>
              <Text style={{ color: "white", fontSize: 16, fontWeight: "bold", textAlign: "center" }}>Login</Text>
            </Pressable>


            <Pressable onPress={() => navigation.navigate("Register")}>
              <Text style={{ textAlign: "center", color: "gray", fontSize: 16, margin: 12 }}>Don't have an Account? Sign Up</Text>
            </Pressable>
          </View>
          <View>
            <Image 
            source={{
              uri: 'https://signal.org/assets/images/features/Media.png',
            }}
            style={{ marginTop: 50, justifyContent: "centre", alignItems: "center" }}
            />


          </View>

        </KeyboardAvoidingView>
      </View>

    </SafeAreaView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({})