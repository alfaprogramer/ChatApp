import { Keyboard, KeyboardAvoidingView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const LoginScreen = () => {

  const { email, setEmail } = useState("");
  const { password, setPassword } = useState("");
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ padding: 10, alignItems: "center" }}>
        <KeyboardAvoidingView>
          <View style={{ marginTop: 80, alignItems: "centre", justifyContent: "center" }}>
            <Text style={{ fontSize: 20, fontWeight: "500", color:"black" }}>Login to your Account</Text>
          </View>
          <View style={{ marginTop: 50 }}>
            <View>
              <Text style={{fontSize:18, fontWeight:'600',color:"gray" }}>Email:</Text>
              <View>
                <TextInput value={email} onChangeText={setEmail} placeholderTextColor="#BEBEBE"
                  style={{ width: 320, marginTop: 15,
                     borderBottomColor: "BEBEBE", 
                     borderBottomWidth: 1, 
                     padding: 10, 
                     fontFamily: "GeezaPro-Bold" ,
                     fontSize:email?15:15
                    }}
                    placeholder='Enter you Email'
                />
              </View>

              <View>
                <TextInput value={password} onChangeText={setPassword} placeholderTextColor="#BEBEBE"
                  style={{ width: 320, marginTop: 15,
                     borderBottomColor: "BEBEBE", 
                     borderBottomWidth: 1, 
                     padding: 10, 
                     fontFamily: "GeezaPro-Bold" ,
                     fontSize:email?15:15
                    }}
                    placeholder='Enter you Password'
                />
              </View>
            </View>
          </View>

        </KeyboardAvoidingView>
      </View>

    </SafeAreaView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({})