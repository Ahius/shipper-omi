import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { FetchshipperOrders } from '../../redux/reducers/shipperHistorySlice';

const HistoryTab = () => {
  const dispatch = useDispatch();
  const shipperOrders = useSelector(state => state.shipperOder.data);
  const shipperId = useSelector(state => state.auth.shipperId);

  useEffect(() => {
    if (shipperId !== null) {
      dispatch(FetchshipperOrders({ ShipperId: shipperId }));
    }
  }, [dispatch, shipperId]);

  console.log('Data his', shipperOrders);

  if (!Array.isArray(shipperOrders)) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lịch sử giao hàng</Text>
      <ScrollView contentContainerStyle={styles.cardsContainer}>
        {shipperOrders.map(order => (
          <TouchableOpacity key={order.CustomerOrderId} style={styles.card}>
            <Image source={{ uri: 'https://static.vecteezy.com/system/resources/previews/004/903/112/non_2x/cartoon-character-of-food-delivery-man-riding-green-motorcycle-vector.jpg' }} style={styles.image} />
            <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 10, color: '#62BEB0' }}>Tòa nhà: {order.BuildingName}</Text>
            <Text style={{ textAlign: 'left', marginBottom: 6 }}>Trạng thái thanh toán: {order.PayingStatus}</Text>
            <Text style={{ textAlign: 'left', marginBottom: 6 }}>Hoa hồng: {order.ShippingPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Text>
            <Text style={styles.statusText}>
              Trạng thái: {' '}
              {order.Status === 'Canceled' && <Text style={styles.canceledStatus}>{order.Status}</Text>}
              {order.Status === 'Success' && <Text style={styles.successStatus}>{order.Status}</Text>}
              {order.Status === 'Pending' && <Text style={styles.pendingStatus}>{order.Status}</Text>}
            </Text>


            <Text style={{ fontSize: 11, color: 'grey', marginTop: 4, textAlign: 'left' }}>Thời gian: {order.OrderDate}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#E84D2C'
  },
  cardsContainer: {
    width: '100%',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: 330,
    padding: 20,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // for Android
  },
  image: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 60,
    height: 60,
    zIndex: 1,
  },
  statusText: {
    textAlign: 'left',
    marginBottom: 6,
  },
  canceledStatus: {
    color: 'red',
  },
  successStatus: {
    color: 'green',
  },
  pendingStatus: {
    color: 'yellow',
  },
});

export default HistoryTab;
