import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const User = ({ item }) => {
    const navigation = useNavigation();
    const imageUrl = item?.image || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'; // Fallback to a default image URL

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Pressable>
                    <Image
                        source={{ uri: imageUrl }}
                        style={styles.image}
                        onError={(e) => console.log('Image load error:', e.nativeEvent.error)}
                    />
                </Pressable>
                <View style={styles.infoContainer}>
                    <Text style={styles.name}>{item?.name}</Text>
                    <Text style={styles.email}>{item?.email}</Text>
                </View>
                {item.requestStatus === 'accepted' ? (
                    <Pressable style={[styles.chatButton, styles.disabledButtonA]} disabled>
                        <Text style={styles.chatButtonText}>Accepted</Text>
                    </Pressable>
                ) : item.requestStatus === 'rejected' ? (
                    <Pressable style={[styles.chatButton, styles.disabledButtonR]} disabled>
                        <Text style={styles.chatButtonText}>Sent</Text>
                    </Pressable>
                ) : (
                    <Pressable
                        onPress={() => navigation.navigate("Request", {
                            name: item?.name,
                            receiverId: item?._id,
                        })}
                        style={styles.chatButton}>
                        <Text style={styles.chatButtonText}>Chat</Text>
                    </Pressable>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        marginTop: 10,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    image: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    infoContainer: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    email: {
        fontSize: 14,
        color: 'gray',
    },
    chatButton: {
        padding: 10,
        width: 80,
        backgroundColor: "#005187",
        borderRadius: 4,
    },
    chatButtonText: {
        textAlign: "center",
        color: "white",
    },
    disabledButton: {
        backgroundColor: 'gray',
    },
    disabledButtonA: {
        backgroundColor: 'green',
    },
    disabledButtonR: {
        backgroundColor: 'red',
    },
});

export default User;
