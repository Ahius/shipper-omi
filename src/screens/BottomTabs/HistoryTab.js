import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { FetchshipperOrders } from '../../redux/reducers/shipperHistorySlice';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';


const HistoryTab = () => {
  const dispatch = useDispatch();
  const shipperOrders = useSelector(state => state.shipperOder.data);
  const shipperId = useSelector(state => state.auth.shipperId);

  console.log('shipper id his: ', shipperId);

  useEffect(() => {
    if (shipperId) {
      dispatch(FetchshipperOrders({ ShipperId: shipperId }));
    }
  }, [dispatch, shipperId]);


  console.log('shipper his', shipperOrders);

  if (!Array.isArray(shipperOrders)) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <StatusBar style="auto" />
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  if (shipperOrders.length === 0) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <StatusBar style="auto" />
        <Text>No orders to display</Text>
      </SafeAreaView>
    );
  }

  return (
    <View style={{marginTop:200}}>
      <Text>History Orders</Text>
      <View>
        {shipperOrders.map(order => (
          <View key={order.CustomerOrderId}>
            <Text>{order.Status}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default HistoryTab;
