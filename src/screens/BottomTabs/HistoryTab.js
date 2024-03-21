import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';




import { FetchshipperOrders } from '../../redux/reducers/shipperHistorySlice';
import { ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HistoryTab = () => {
  const dispatch = useDispatch();
  const [selectedStatus, setSelectedStatus] = useState('Success');
  const shipperOrders = useSelector(state => state.shipperOder.data);
  const shipperId = useSelector(state => state.auth.shipperId);

  useEffect(() => {
    console.log(selectedStatus);
    if (shipperId !== null) {
      dispatch(FetchshipperOrders({ ShipperId: shipperId, status: selectedStatus }));

    }
  }, [dispatch, shipperId, selectedStatus]);

  const refetchData = () => {
    if (shipperId !== null) {
      dispatch(FetchshipperOrders({ ShipperId: shipperId, status: selectedStatus }));
    }
  };
  // console.log('data his', shipperOrders);
  const handleStatusChange = (status) => {
    setSelectedStatus(status);
  };

  const navigation = useNavigation();

  const handleOrderPress = (orderId) => {
    navigation.navigate('OrderDetail', { orderId });
  };

  if (!Array.isArray(shipperOrders)) {
    return <ActivityIndicator size="large" color="#0000ff" style={{flex: 1, justifyContent: "center", alignItems: "center" }}/>;
  }

// =======
//     return (
//       <SafeAreaView
//         style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
//       >
//         <StatusBar style="auto" />
//         <Text>Loading...</Text>
//       </SafeAreaView>
//     );
//   }

//   if (shipperOrders.length === 0) {
//     return (
//       <SafeAreaView
//         style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
//       >
//         <StatusBar style="auto" />
//         <Text>No orders to display</Text>
//       </SafeAreaView>
//     );
//   }
// >>>>>>> e5461d6655a574e0abda073bcaabd4e8afa12c98

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tổng đơn hàng</Text>
      <View style={styles.statusButtons}>
        <TouchableOpacity onPress={() => handleStatusChange('Success')} style={[styles.statusButton, selectedStatus === 'Success' && styles.selectedButton]}>
          <Text style={[styles.buttonText, selectedStatus === 'Success' && styles.selectedButtonText]}>Success</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleStatusChange('Paid')} style={[styles.statusButton, selectedStatus === 'Paid' && styles.selectedButton]}>
          <Text style={[styles.buttonText, selectedStatus === 'Paid' && styles.selectedButtonText]}>Paid</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={() => handleStatusChange('Pending')} style={[styles.statusButton, selectedStatus === 'Pending' && styles.selectedButton]}>
          <Text style={[styles.buttonText, selectedStatus === 'Pending' && styles.selectedButtonText]}>Pending</Text>
        </TouchableOpacity> */}
        

      </View>
      <ScrollView contentContainerStyle={styles.cardsContainer}>
        {shipperOrders.length > 0 ? (shipperOrders.map(order => (
          // <TouchableOpacity key={order.CustomerOrderId} style={styles.card}>
          <TouchableOpacity key={order.CustomerOrderId} style={styles.card} onPress={() => handleOrderPress(order.CustomerOrderId)}>
            <Image source={require('../../../assets/images/image-history-orders.jpg')} style={styles.image} />

            <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 10, color: '#62BEB0' }}>Tòa nhà: {order.BuildingName}</Text>
            <Text style={{ textAlign: 'left', marginBottom: 6 }}>Trạng thái thanh toán: {order.PayingStatus}</Text>
            <Text style={{ textAlign: 'left', marginBottom: 6 }}>Hoa hồng: {order.ShippingPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Text>
            <Text style={styles.statusText}>
              Trạng thái: {' '}
              {order.Status === 'Paid' && <Text style={styles.canceledStatus}>{order.Status}</Text>}
              {order.Status === 'Success' && <Text style={styles.successStatus}>{order.Status}</Text>}
              {/* {order.Status === 'Pending' && <Text style={styles.pendingStatus}>{order.Status}</Text>} */}
            </Text>


            <Text style={{ fontSize: 11, color: 'grey', marginTop: 4, textAlign: 'left' }}>Thời gian: {order.OrderDate}</Text>
          </TouchableOpacity>
        ))
        ) : (
          <Text style={styles.noOrderText}>Hiện chưa có đơn hàng nào</Text>
        )
        }
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
    elevation: 5,
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
    color: '#26BCC7',
  },
  successStatus: {
    color: 'green',
  },
  pendingStatus: {
    color: 'yellow',
  },

  statusButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  statusButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#62BEB0',
    marginLeft: 10,
  },
  selectedButton: {
    backgroundColor: '#62BEB0',
  },
  buttonText: {
    fontSize: 16,
    color: '#62BEB0',
  },
  selectedButtonText: {
    color: '#FFFFFF',
  },

  noOrderText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    color: 'grey',
  }



});

export default HistoryTab;
