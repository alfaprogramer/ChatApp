import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const User = ({ item }) => {
    return (
        <View style={{ padding:10, marginTop:10}}>
            <View style={{flexDirection:"row", alignItems:"center", gap:10}}>
                <Pressable>
                    <Image source={{ uri: item?.Image }} style={{ width: 40, height: 40, borderRadius: 20 }} />
                </Pressable>
                <View style={{flex:1}}>
                    <Text>{item?.name}</Text>
                    <Text>{item?.email}</Text>
                </View>

                <Pressable style={{ padding: 10, width: 80, backgroundColor: "#005187", borderRadius: 4 }}>
                    <Text style={{ textAlign: "center", color: "white" }}>Chat</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default User

const styles = StyleSheet.create({});