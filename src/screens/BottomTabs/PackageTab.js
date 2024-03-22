import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Button, TextInput, RefreshControl } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';




import { FetchOrderActivity, createOrderActivity } from '../../redux/reducers/orderActivitySlice';
import { Modal } from 'react-native-paper';
import moment from 'moment';


export default function PackageTab() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const { orderId } = route.params;
  const orderActivity = useSelector(state => state.orderActivity.data);
  const [isModalVisible, setModalVisible] = useState(false);
  const shipperId = useSelector(state => state.auth.shipperId);
  const [status, setStatus] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [createData, setCreateData] = useState({
    shipperId: '',
    // Status: orderActivity.length > 0 ? orderActivity[orderActivity.length - 1].Status : '',
    Status: '',
    Image: ''
  });


  useEffect(() => {
    if (orderActivity && orderActivity.length > 0) {
      const latestStatus = orderActivity[orderActivity.length - 1].Status;
      setCreateData(prevData => ({
        ...prevData,
        Status: latestStatus
      }));
    }
  }, [orderActivity]);
console.log('cData: ', createData);


  useEffect(() => {
    setCreateData(prevData => ({
      ...prevData,
      shipperId: shipperId
    }));
  }, [shipperId]);



  // const handleCheckBoxPress = (value) => {
  //   setStatus(value);
  // };



  const handleCheckBoxPress = (value) => {
    if (createData.Status === 'Success' || (createData.Status === 'Buying' && value === 'Success')) {
      // Nếu Status là 'Success' hoặc Status là 'Buying' và value là 'Success', không làm gì cả
      return;
    }
  
    if (createData.Status === 'Shipping' && value !== 'Success') {
      // Nếu Status là 'Shipping' nhưng value không phải 'Success', không làm gì cả
      return;
    }
  
    if (createData.Status === 'Buying' && value !== 'Shipping') {
      // Nếu Status là 'Buying' nhưng value không phải 'Shipping', không làm gì cả
      return;
    }

  
    setStatus(value);
  };
  




  useEffect(() => {
    dispatch(FetchOrderActivity({ CustomerOrderId: orderId }));
  }, [dispatch, orderId]);


  const onRefresh = () => {
    setIsRefreshing(true);
    dispatch(FetchOrderActivity({ CustomerOrderId: orderId })).then(() => {
      setIsRefreshing(false);
    });
  };

  // console.log('log lai: ', orderActivity);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible)
  }

  const handleEdit = () => {
    toggleModal();
  }

  useEffect(() => {
    getCreateData('Status', status);
  }, [status]);

  const getCreateData = (key, value) => {
    setCreateData(prevData => ({
      ...prevData,
      [key]: value
    }));
  }


  const handleSubmit = () => {

    const transformedData = {
      ShipperId: createData.shipperId,
      Status: createData.Status,
      Image: createData.Image
    };

    dispatch(createOrderActivity({ CustomerOrderId: orderId, requestData: transformedData }))
      .then((response) => {
        console.log('Order activity has been created:', response.payload);
        console.log('requestData:', transformedData);
        dispatch(FetchOrderActivity({ CustomerOrderId: orderId }))
          .then(() => {
            console.log('Order activity data has been updated', response.payload);
          })
          .catch((error) => {
            console.error('Error fetching updated order activity data:', error);
          });
      })
      .catch((error) => {
        console.error('Error creating Order activity:', error);
      });
  };






  // console.log('dataaaaaa:', orderActivity);


  return (
    <View style={{ alignItems: "center", justifyContent: "center", flex: 1, marginTop: 70 }}>
      {/* <TouchableOpacity onPress={handleGoBack}>
        <Icon name="arrow-back" size={18} color="grey" style={{ marginRight: 330 }} />
      </TouchableOpacity>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
        <Text style={{ fontSize: 25, color: '#E84D2C' }}>Quá trình vận chuyển</Text>
      </View> */}


      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.goBackButton}>
          <Icon name="arrow-back" size={18} color="grey" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Quá trình vận chuyển</Text>
      </View>


      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
          />
        }
      >
        {orderActivity ? (
          orderActivity.map((ac, index) => (
            <TouchableOpacity key={ac.OrderActivityId}>
              <View >
                {index === 0 && (
                  <TouchableOpacity style={styles.boxInfo}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                      <Text style={styles.text}>Tòa nhà: {ac.BuildingName}</Text>
                      <Text style={{ textAlign: 'right', fontSize: 16, color: '#526ECD', marginRight: 8, padding: 7, borderRadius: 16, borderWidth: 1, borderColor: '#526ECD', backgroundColor: '#526ECD', color: 'white' }}>Mã đơn: {ac.OrderId}</Text>
                    </View>
                    <Text style={styles.text}>Khách hàng: {ac.Customer_Name}</Text>
                    <Text style={styles.text}>Điện thoại: {ac.Customer_Phone}</Text>
                  </TouchableOpacity>

                )}
              </View>
              <View style={{ flexDirection: 'row', height: 80 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', padding: 10, width: 380 }}>
                  <View style={{ flexDirection: 'column', alignItems: 'flex-start', marginLeft: 15 }}>
                    <Text style={{ fontSize: 12, color: 'grey', marginBottom: 19, marginRight: 5 }}>Thời gian</Text>
                    <View style={{ flexDirection: 'column-reverse', flex: 1 }}>
                      <Text style={{ fontSize: 12, color: 'grey', marginBottom: 5 }}>
                        {moment.utc(ac.Date).format('DD/MM/YYYY - HH:mm')}
                      </Text>
                    </View>

                  </View>
                  <View style={{ width: 1, backgroundColor: 'grey', height: '100%', marginHorizontal: 10, marginLeft: 51 }}></View>
                  <View style={{ flexDirection: 'column', alignItems: 'flex-end', marginLeft: 30 }}>
                    <Text style={{ fontSize: 12, color: 'grey', marginBottom: 5, marginRight: 2 }}>Trạng thái</Text>
                    <Text style={[styles.status, styles.circle, { backgroundColor: getStatusColor(ac.Status) }]}>
                      {/* {ac.Status} */}
                      {/* Trạng thái: {' '} */}
                      {ac.Status === 'Buying' && <Text style={styles.canceledStatus}>Đang mua hàng</Text>}
                      {ac.Status === 'Shipping' && <Text style={styles.canceledStatus}>Đang giao hàng</Text>}
                      {ac.Status === 'Success' && <Text style={styles.successStatus}>Đã giao hàng</Text>}
                    </Text>
                  </View>
                </View>
              </View>



            </TouchableOpacity>

          ))
        ) : (
          <Text>Hiện chưa có quá trình nào</Text>
        )}
        <TouchableOpacity style={styles.button} onPress={handleEdit}>
          <Text style={styles.buttonText}>Cập nhật</Text>
        </TouchableOpacity>
      </ScrollView>


      <Modal visible={isModalVisible} onRequestClose={toggleModal}>
        <View style={styles.modalContent}>
          <View style={styles.container}>
            <TouchableOpacity
              style={[styles.checkBox, status === 'Buying' && styles.checked]}
              onPress={() => handleCheckBoxPress('Buying')}
            >
              <Text style={[styles.checkBoxText, status === 'Buying' && styles.checkedText]}>Mua hàng</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.checkBox, status === 'Shipping' && styles.checked]}
              onPress={() => handleCheckBoxPress('Shipping')}
            >
              <Text style={[styles.checkBoxText, status === 'Shipping' && styles.checkedText]}>Vận chuyển</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.checkBox, status === 'Success' && styles.checked]}
              onPress={() => handleCheckBoxPress('Success')}
            >
              <Text style={[styles.checkBoxText, status === 'Success' && styles.checkedText]}>Thành công</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            placeholder="Nội dung"
            onChangeText={(value) => {
              getCreateData('Image', value);
            }}
            value={createData.Image}
            style={styles.input}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.updateButton} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Cập nhật</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.hideButton} onPress={toggleModal}>
              <Text style={styles.buttonText}>Hủy</Text>
            </TouchableOpacity>
          </View>
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
    marginTop: 40
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },

  text: {
    marginTop: 3,
    marginLeft: 8,
    fontSize: 13,
    marginBottom: 2,
    textAlign: 'left'

  },

  status: {
    marginTop: 3,
    fontSize: 15,
    marginBottom: 2,
  },

  circle: {
    width: 130,
    height: 32,
    textAlign: 'center',
    lineHeight: 30,
    color: 'white',
    borderRadius: 10,
  },

  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    marginLeft: 58,
    height: 300,
    width: 270,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    bottom: 50,

  },
  checkBox: {
    backgroundColor: '#44C8D2',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 7,
    marginHorizontal: 5,
  },
  checked: {
    backgroundColor: 'lightblue',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 25,
    marginRight: 180,
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
    color: '#E84D2C'
  },

  boxInfo: {
    backgroundColor: '#fff',
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    padding: 10,
    height: 140,
    width: 380,
  },

  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  checkBox: {
    width: 100,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    backgroundColor: '#1E90AC',
  },
  checkBoxText: {
    color: '#000000',
  },
  checkedText: {
    color: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  updateButton: {
    backgroundColor: '#1E90AC',
    padding: 10,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  hideButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },


});
