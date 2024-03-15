import React from 'react';
import { View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';

const OrderDetail = () => {
  const route = useRoute();
  const { orderId } = route.params;



  return (
    <View>
      <Text>Chi tiết đơn hàng {orderId}</Text>
    </View>
  );
};

export default OrderDetail;
