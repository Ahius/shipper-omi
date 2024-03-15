import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';




import { FetchOrderActivity } from '../../redux/reducers/orderActivitySlice';
import { Modal } from 'react-native-paper';

export default function PackageTab() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const { orderId } = route.params;
  const orderActivity = useSelector(state => state.orderActivity.data);
  const [isModalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    dispatch(FetchOrderActivity({ CustomerOrderId: orderId }));
  }, [dispatch, orderId]);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible)
  }

  const handleEdit = () => {
    toggleModal();
  }

  return (
    <View style={{ alignItems: "center", justifyContent: "center", flex: 1, marginTop: 70 }}>
      <TouchableOpacity onPress={handleGoBack}>
        <Icon name="arrow-back" size={18} color="grey" style={{ marginRight: 330 }} />
      </TouchableOpacity>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
        <Text style={{ fontSize: 25, color: '#E84D2C' }}>Quá trình vận chuyển</Text>
      </View>
      <ScrollView>
        {orderActivity ? (orderActivity.map(ac => (
          <TouchableOpacity style={styles.card} key={ac.OrderActivityId}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ textAlign: 'center', fontSize: 19, color: '#526ECD', marginBottom: 5 }}>Mã đơn: {ac.OrderId}</Text>
              <Text style={[styles.status, styles.circle, { backgroundColor: getStatusColor(ac.Status) }]}>
                {ac.Status}
              </Text>
            </View>
            <Text style={styles.text}>Tòa nhà: {ac.BuildingName}</Text>
            <Text style={styles.text}>Khách hàng: {ac.Name}</Text>
            <Text style={styles.text}>Điện thoại: {ac.Phone}</Text>
            <Text style={{ fontSize: 12, color: 'grey' }}>{ac.Date}</Text>
            {ac.Status !== 'Canceled' && ac.Status !== 'Refund' && (
              <TouchableOpacity style={styles.button} onPress={handleEdit}>
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        ))
        ) : (
          <Text>Hiện chưa có quá trình nào</Text>
        )}
      </ScrollView>

      <Modal visible={isModalVisible} onRequestClose={toggleModal}>
        <View style={styles.modalContent}>
          <Text>Eddit Here</Text>
          <TouchableOpacity onPress={toggleModal}>
            <TouchableOpacity><Text>Cập nhật</Text></TouchableOpacity>
            <Text>Hide me!</Text>
          </TouchableOpacity>
        </View>
      </Modal>



    </View>
  )
}


const getStatusColor = (status) => {
  switch (status) {
    case 'Buying':
      return '#E7691D';
    case 'Shipping':
      return '#E5E114';
    case 'Canceled':
      return 'red';
    case 'Refund':
      return '#30BCF1';
    case 'Success':
      return '#17D211';
    default:
      return 'black';
  }
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: 260,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: {
    backgroundColor: '#23BF7A',
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },

  text: {
    marginTop: 3,
    fontSize: 15,
    marginBottom: 2,

  },

  status: {
    marginTop: 3,
    fontSize: 15,
    marginBottom: 2,
  },

  circle: {
    width: 83,
    height: 32,
    borderRadius: 15,
    textAlign: 'center',
    lineHeight: 30,
    color: 'white',
    fontWeight: 'bold',
  },

  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    marginLeft:58,
    height:300,
    width:270,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },


});
