import { StyleSheet, Text, View, SafeAreaView, FlatList } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext';
import User from '../components/User';
import { useNavigation } from '@react-navigation/native';

const PeopleScreen = () => {
  const [users, setUsers] = useState([]);
  const { token, userId } = useContext(AuthContext);

  const fetchUsers = async () => {
    try {
      const url = `http://192.168.18.3:8000/users/${userId}`;
      console.log('Fetching URL:', url);

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('Response Status:', response.status);
      console.log('Response Headers:', response.headers);

      const contentType = response.headers.get('content-type');
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.log('Response Text:', text);
        throw new Error(`Expected JSON, got ${text}`);
      }

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.log('Fetch users error:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [userId]);

  console.log("users", users);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>People using Chatapp</Text>
      </View>
      <FlatList
        data={users}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <User item={item} />
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No users found.</Text>}
      />
    </SafeAreaView>
  );
};

export default PeopleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 12,
  },
  title: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '500',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'gray',
  }
});