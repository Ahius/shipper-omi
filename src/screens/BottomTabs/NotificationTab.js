
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { FetchNotification } from '../../redux/reducers/notificationSlice';
import moment from 'moment';


const NotificationTab = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(state => state.noti.data);
  const shipperId = useSelector(state => state.auth.shipperId);
  const [isRefreshing, setIsRefreshing] = useState(false);
  useEffect(() => {
    dispatch(FetchNotification({ ShipperId: shipperId }));
  }, [dispatch, shipperId]);



  const onRefresh = () => {
    setIsRefreshing(true);
    dispatch(FetchNotification({ ShipperId: shipperId })).then(() => {
      setIsRefreshing(false);
    });
  };
  // console.log('noti dâdad: ', notifications);


  return (
    <View style={styles.container}>
    <Text style={styles.header}>Danh sách thông báo</Text>
    <Image
      source={require('../../../assets/images/image-noti.png')}
      style={styles.shipperImage}
      resizeMode="cover" 
    />
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={onRefresh}
        />
      }
      contentContainerStyle={styles.scrollViewContent}>
      {notifications && notifications.length > 0 ? (
        notifications.map((noti) => (
          <TouchableOpacity key={noti.id} style={styles.card}>
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

  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: 330,
    padding: 20,
    marginBottom: 10,
    marginTop:4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 56,
    color: '#E84D2C',
    textAlign: 'center', 
  },
  shipperImage: {
    width: '90%', 
    height: 160, 
    marginBottom: 30, 
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
    fontSize: 15,
    fontWeight: '400',
    marginBottom: 2,
  },
  notificationDate: {
    fontSize: 12,
    color: '#999',
  },
  noNotificationsText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
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
