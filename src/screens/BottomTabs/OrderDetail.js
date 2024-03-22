import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';


import { FetchOrderDetail } from '../../redux/reducers/orderSlice';

const OrderDetail = () => {
  const dispatch = useDispatch();

  const route = useRoute();
  const { orderId } = route.params;
  const orderDetail = useSelector(state => state.orderDetail.data);
  const navigation = useNavigation();
  const [isRefreshing, setIsRefreshing] = useState(false);


  useEffect(() => {
    dispatch(FetchOrderDetail({ CustomerOrderId: orderId }));
  }, [dispatch, orderId]);


  const onRefresh = () => {
    setIsRefreshing(true);
    dispatch(FetchOrderDetail({ CustomerOrderId: orderId })).then(() => {
      setIsRefreshing(false);
    });
  };
  const handleGoBack = () => {
    navigation.goBack();
  };

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

  // console.log('data order: ', orderDetail);



  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.goBackButton}>
          <Icon name="arrow-back" size={18} color="grey" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Chi tiết đơn hàng</Text>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
          />
        }
        style={styles.content}>
        {orderDetail.data?.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
          >
            <View style={styles.cardContent}>
              <Image
                style={styles.image}
                source={{ uri: item.Image }}
              />
              <View style={styles.details}>
                <Text style={styles.text}>Tên sản phẩm: {item.Product_Name}</Text>
                <Text style={styles.text}>Số lượng: {item.ProductQuantity}</Text>
                <Text style={styles.text}>Giá tiền: {formatPrice(item.Price)}</Text>
                <Text style={styles.text}>Giảm giá: {item.Discount}%</Text>
                <Text style={styles.text}>Thành tiền: {formatPrice(item.Total)}</Text>
              </View>
            </View>
            <View style={{ marginTop: 20 }}>
              <Text style={styles.info}>Tên khách hàng: {item.Customer_Name}</Text>
              <Text style={styles.info}>Số điện thoại: {item.Phone}</Text>
            </View>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          onPress={() => navigation.navigate('Package', { orderId: orderId })}
          style={styles.button}
        ><Text style={styles.buttonText}>Vận chuyển</Text></TouchableOpacity>
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: 'gray',
  },
  goBackButton: {
    marginRight: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#E84D2C',
  },
  content: {
    flex: 1,
    marginTop: 47,
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    height: 240,
    width: 350,
    marginBottom: 10,
    shadowColor: 'grey',
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
  },
  button: {
    backgroundColor: '#41A293',
    padding: 10,
    width: 180,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 16,
    marginLeft: 90,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OrderDetail;
