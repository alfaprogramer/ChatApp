import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../AuthContext';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import 'core-js/stable/atob';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';  // Ensure correct import
import axios from 'axios';
import Chat from '../components/Chat';

const ChatsScreen = () => {
  const [options, setOptions] = useState(['Chats']);
  const [chats, setChats] = useState([]);
  const [requests, setRequests] = useState([]);
  const { token, setToken, setUserId, userId } = useContext(AuthContext);

  const chooseOption = (option) => {
    if (options.includes(option)) {
      setOptions(options.filter(c => c !== option));
    } else {
      setOptions([...options, option]);
    }
  };

  const navigation = useNavigation();

  const logout = () => {
    clearAuthToken();
  };

  const clearAuthToken = async () => {
    try {
      await AsyncStorage.removeItem('authToken');
      setToken('');
      navigation.replace('Login');
    } catch (error) {
      console.log('Error', error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem('authToken');
      const decodedToken = jwtDecode(token);
      setToken(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (userId) {
      getRequests();
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      getUser();
    }
  }, [userId]);

  const getRequests = async () => {
    try {
      const response = await axios.get(
        `http://192.168.18.3:8000/getrequests/${userId}`
      );
      setRequests(response.data);
    } catch (error) {
      console.log('Error fetching requests', error);
    }
  };

  const acceptRequest = async (requestId) => {
    try {
      const response = await axios.post(
        'http://192.168.18.3:8000/acceptrequest',
        {
          userId: userId,
          requestId: requestId,
        }
      );

      if (response.status === 200) {
        await getRequests();
      }
    } catch (error) {
      console.log('Error accepting request', error);
    }
  };

  const getUser = async () => {
    try {
      const response = await axios.get(
        `http://192.168.18.3:8000/user/${userId}`
      );
      setChats(response.data);
    } catch (error) {
      console.log('Error fetching user', error);
      throw error;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View
        style={{
          padding: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Pressable onPress={logout}>
        <MaterialIcons
           
            name="arrow-back"
            size={26}
            color="black"
          />
        </Pressable>

        <Text style={{ fontSize: 15, fontWeight: '500' }}>Chats</Text>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <AntDesign name="camerao" size={26} color="black" />
          <MaterialIcons
            onPress={() => navigation.navigate('People')}
            name="person-outline"
            size={26}
            color="black"
          />
        </View>
      </View>

      <View style={{ padding: 10 }}>
        <Pressable
          onPress={() => chooseOption('Chats')}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <View>
            <Text>Chats</Text>
          </View>
          <Entypo name="chevron-small-down" size={26} color="black" />
        </Pressable>

        <View>
          {options.includes('Chats') &&
            (chats.length > 0 ? (
              <View>
                {chats.map((item) => (
                  <Chat item={item} key={item._id} />
                ))}
              </View>
            ) : (
              <View
                style={{
                  height: 300,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={{ textAlign: 'center', color: 'gray' }}>
                  No Chats yet
                </Text>
                <Text style={{ marginTop: 4, color: 'gray' }}>
                  Get started by messaging a friend
                </Text>
              </View>
            ))}
        </View>

        <Pressable
          onPress={() => chooseOption('Requests')}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <View>
            <Text>Requests</Text>
          </View>
          <Entypo name="chevron-small-down" size={26} color="black" />
        </Pressable>

        <View style={{ marginVertical: 12 }}>
          {options.includes('Requests') && (
            <View>
              <Text style={{ fontSize: 15, fontWeight: '500' }}>
                Check out all the requests
              </Text>

              {requests.map((item) => (
                <Pressable style={{ marginVertical: 12 }} key={item.from._id}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 10,
                    }}
                  >
                    <Pressable>
                      <Image
                        source={{ uri: item.from.image }}
                        style={{ width: 40, height: 40, borderRadius: 20 }}
                      />
                    </Pressable>

                    <View style={{ flex: 1 }}>
                      <Text style={{ fontSize: 15, fontWeight: '500' }}>
                        {item.from.name}
                      </Text>
                      <Text style={{ marginTop: 4, color: 'gray' }}>
                        {item.message}
                      </Text>
                    </View>

                    <Pressable
                      onPress={() => acceptRequest(item.from._id)}
                      style={{
                        padding: 8,
                        backgroundColor: '#005187',
                        width: 75,
                        borderRadius: 5,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 13,
                          textAlign: 'center',
                          color: 'white',
                        }}
                      >
                        Accept
                      </Text>
                    </Pressable>

                    <AntDesign name="delete" size={26} color="red" />
                  </View>
                </Pressable>
              ))}
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChatsScreen;

const styles = StyleSheet.create({});
