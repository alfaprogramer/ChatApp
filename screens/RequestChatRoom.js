import { StyleSheet, Text, View, KeyboardAvoidingView, ScrollView, TextInput, Pressable } from 'react-native'
import React, { useContext, useLayoutEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { AuthContext } from '../AuthContext';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import Feather from 'react-native-vector-icons/Feather'

const RequestChatRoom = () => {
    const navigation = useNavigation();
    const [message, setMessage] = useState("");
    const { token, userId, setToken, setuserId } = useContext(AuthContext);
    const route = useRoute();
    useLayoutEffect(() => {
        return navigation.setOptions({
            headerTitle: "",
            headerLeft: () => (
                <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                    <View>
                        <Text>{route?.params?.name}</Text>
                    </View>
                </View>
            ),

        });
    }, []);
    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "white" }}>

            <ScrollView></ScrollView>

            <View
                style={{
                    backgroundColor: 'white',
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    borderTopWidth: 1,
                    borderTopColor: '#dddddd',
                    marginBottom: 20,
                }}>
                <Entypo name="emoji-happy" size={24} color="gray" />

                <TextInput
                    placeholder='type your message...'
                    value={message}
                    onChangeText={setMessage}
                    style={{
                        flex: 1,
                        height: 40,
                        borderWidth: 1,
                        borderColor: '#ddddd',
                        borderRadius: 20,
                        paddingHorizontal: 10,
                        marginLeft: 10
                    }}
                />

                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 8,
                        marginHorizontal: 8,
                    }}>
                    <Entypo name="camera" size={24} color="gray" />

                    <Feather name="mic" size={24} color="gray" />
                </View>

                <Pressable
                    onPress={sendMessage}
                    style={{
                        backgroundColor: '#0066b2',
                        paddingHorizontal: 12,
                        paddingVertical: 8,
                        borderRadius: 20,
                    }}>
                    <Text style={{ textAlign: 'center', color: 'white' }}>Send</Text>
                </Pressable>
            </View>


        </KeyboardAvoidingView>
    )
}

export default RequestChatRoom

const styles = StyleSheet.create({})