import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { FetchOrderDetail } from '../../redux/reducers/orderSlice';

const OrderDetail = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  const { orderId } = route.params;
  const orderDetail = useSelector(state => state.orderDetail.data);
  const navigation = useNavigation();
  useEffect(() => {
    dispatch(FetchOrderDetail({ CustomerOrderId: orderId }));
  }, [dispatch, orderId]);

  const formatPrice = (price) => {
    return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  };

  // console.log('orderDetail:', orderDetail.data[0].CustomerOrderId);

  if (!orderDetail || !Array.isArray(orderDetail.data) || orderDetail.data.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Không có chi tiết đơn hàng.</Text>
      </View>
    );
  }



  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Chi tiết đơn hàng</Text>
      </View>
      <ScrollView style={styles.content}>
        {/* <TouchableOpacity style={styles.card}> */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('Package', { orderId: orderDetail.data[0]?.CustomerOrderId })}
        >
          <View style={styles.cardContent}>
            <Image
              style={styles.image}
              source={{ uri: orderDetail.data[0]?.Image }}
            />
            <View style={styles.details}>
              <Text style={styles.text}>Tên sản phẩm: {orderDetail.data[0]?.Product_Name}</Text>
              <Text style={styles.text}>Số lượng: {orderDetail.data[0]?.ProductQuantity}</Text>
              <Text style={styles.text}>Giá tiền: {formatPrice(orderDetail.data[0]?.Price)}</Text>
              <Text style={styles.text}>Giảm giá: {orderDetail.data[0]?.Discount}%</Text>
              <Text style={styles.text}>Thành tiền: {formatPrice(orderDetail.data[0]?.Total)}</Text>
            </View>
          </View>
          <View style={{ marginTop: 20 }}>
            <Text style={styles.info}>Tên khách hàng: {orderDetail.data[0]?.Customer_Name}</Text>
            <Text style={styles.info}>Số điện thoại: {orderDetail.data[0]?.Phone}</Text>
          </View>
        </TouchableOpacity>
        <Image
          style={styles.additionalImage}
          source={require('../../../assets/images/img-shipper-odetail.jpeg')}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#ffffff',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    padding: 10,
    zIndex: 999,
  },
  headerText: {
    marginTop: 60,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E06418'
  },
  content: {
    flex: 1,
    marginTop: 70,
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    height: 240,
    width: 350,
    marginBottom: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    borderWidth: 0.3,
    borderColor: '#000',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 20,
    borderRadius: 10,
  },
  details: {
    flex: 1,
  },
  text: {
    marginBottom: 5,
    fontSize: 16,
    color: 'black'
  },
  info: {
    fontSize: 15,
    textAlign: 'center',
    color: '#41A293'
  },
  additionalImage: {
    width: '100%',
    height: 50,
    marginTop: 10,
    resizeMode: 'cover',
  },
  errorText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    color: 'red',
  },

  additionalImage: {
    marginTop: 30,
    width: 354,
    height: 300,
    borderRadius: 10,
  }
});

export default OrderDetail;
