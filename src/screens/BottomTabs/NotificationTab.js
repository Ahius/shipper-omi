// NotificationTab.js

import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { FetchNotification } from '../../redux/reducers/notificationSlice';
import moment from 'moment';


const NotificationTab = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(state => state.noti.data);
  const shipperId = useSelector(state => state.auth.shipperId);
  useEffect(() => {
    dispatch(FetchNotification({ ShipperId: shipperId }));
  }, [dispatch, shipperId]);


  return (
    <View style={styles.container}>
      <Text style={styles.header}>Danh sách thông báo</Text>
      <ScrollView>
        {notifications.length > 0 ? (
          notifications.map((noti) => (
            <TouchableOpacity key={noti.id} style={styles.notificationContainer}>
              <Text style={styles.notificationTitle}>{noti.message}</Text>
              <Text style={styles.notificationDate}>
                {moment.utc(noti.Date).format('DD/MM/YYYY - HH:mm')}
              </Text>
            </TouchableOpacity>
          ))

        ) : (
          <Text style={styles.noNotificationsText}>Chưa có thông báo nào dành cho bạn!</Text>
        )}
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 18,
    top: 100,
  },
  header: {
    fontSize: 23,
    color:'#E84D2C',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  notificationContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff', 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // elevation: 5,
  },
  notificationTitle: {
    fontSize: 17,
    marginBottom: 5,
    color: '#333', 
  },
  notificationDate: {
    fontSize: 12,
    marginBottom: 5,
    color: '#666', 
  },
  markAsReadButton: {
    color: 'blue',
    textDecorationLine: 'underline',
    marginTop: 5,
  },
});


export default NotificationTab;
