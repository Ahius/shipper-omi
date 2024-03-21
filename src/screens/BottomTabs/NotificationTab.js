// NotificationTab.js

import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
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

  // console.log('noti dâdad: ', notifications);


  return (
    <View style={styles.container}>
      <Text style={styles.header}>Danh sách thông báo</Text>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {notifications && notifications.length > 0 ? (
          notifications.map((noti) => (
            <TouchableOpacity key={noti.id} style={styles.notificationContainer}>
              <Text style={styles.notificationTitle}>{noti.message}</Text>
              <Text style={styles.notificationDate}>
                {moment.utc(noti.date).format('DD/MM/YYYY - HH:mm')}
              </Text>
            </TouchableOpacity>
          ))

        ) : (
          <Text>Chưa có thông báo nào dành cho bạn!</Text>
        )}
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  notificationContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  notificationDate: {
    fontSize: 14,
    color: '#999',
  },
  noNotificationsText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});


export default NotificationTab;
