import { Keyboard, KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, View ,Image} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = () => {

  const { email, setEmail } = useState("");
  const { password, setPassword } = useState("");
  const { image, setImage } = useState('');
  const { name, setName } = useState('');
  return (

    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ padding: 10, alignItems: "center" }}>
        <KeyboardAvoidingView>
          <View style={{ marginTop: 80, alignItems: "centre", justifyContent: "center" }}>
            <Text style={{ fontSize: 20, fontWeight: "500", color: "black" }}>Create Up your Profile</Text>
            <Text style={{ marginTop: 10, color: "black", textAlign: "center", marginHorizontal: 12 }} >
              Profiles are visible to your friends and connections and groups
            </Text>

            <Pressable style={{ marginTop: 20 }}>
              <Image style={{ width: 50, height: 50, borderRadius: 25 }}></Image>
              <Text style={{ textAlign: "center", marginTop: 4, color: "gray", fontSize: 12 }}>Add</Text>
            </Pressable>
          </View>


          <View style={{ marginTop: 30 }}>
            <View>
              <Text style={{ fontSize: 18, fontWeight: '600', color: "gray" }}>Name:</Text>
              <View>
                <TextInput value={name} onChangeText={setName} placeholderTextColor="#BEBEBE"
                  style={{
                    width: 340, marginTop: 15,
                    borderBottomColor: "BEBEBE",
                    borderBottomWidth: 1,
                    padding: 10,
                    fontFamily: "GeezaPro-Bold",
                    fontSize: name ? 15 : 15
                  }}
                  placeholder='Enter you Name'
                />
              </View>


              <Text style={{ fontSize: 18, fontWeight: '600', color: "gray", marginTop: 25 }}>Email:</Text>
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




              <Text style={{ fontSize: 18, fontWeight: '600', color: "gray", marginTop: 25 }}>Image:</Text>
              <View>
                <TextInput value={image} onChangeText={setImage} placeholderTextColor="#BEBEBE"
                  style={{
                    width: 340, marginTop: 15,
                    borderBottomColor: "BEBEBE",
                    borderBottomWidth: 1,
                    padding: 10,
                    fontFamily: "GeezaPro-Bold",
                    fontSize: email ? 15 : 15
                  }}
                  placeholder='Enter you Image url'
                />
              </View>
            </View>

            <Pressable style={{
              width: 200, backgroundColor: "#4A55A2", padding: 15, marginTop: 50, marginLeft: "auto",
              marginRight: "auto", borderRadius: 6
            }}>
              <Text style={{ color: "white", fontSize: 16, fontWeight: "bold", textAlign: "center" }}>Register</Text>
            </Pressable>


            <Pressable onPress={() => navigation.navigate("Login")}>
              <Text style={{ textAlign: "center", color: "gray", fontSize: 16, margin: 12 }}>Already have a Account? Log in </Text>
            </Pressable>
          </View>


        </KeyboardAvoidingView>
      </View>

    </SafeAreaView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({})