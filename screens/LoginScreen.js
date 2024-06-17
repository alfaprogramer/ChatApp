import { Keyboard, KeyboardAvoidingView, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const LoginScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ padding:10, alignItems:"center"}}>
        <KeyboardAvoidingView>
          <View style={{marginTop:80, alignItems:"centre", justifyContent:"center"}}>
            <Text style={{fontSize:20, fontWeight:"500"}}>Login to your Account</Text>
          </View>
          <View style={{marginTop:50}}>
            <View>
              <Text>Email:</Text>
              <View>
                <TextInput value={} />
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