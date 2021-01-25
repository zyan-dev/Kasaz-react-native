import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Modal,
  Animated,
  ActivityIndicator,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import ImageViewer from 'react-native-image-zoom-viewer';
import DrawerHeader from '../../components/DrawerHeader';
import SearchInput from '../../components/SearchInput';
import {fetchApartmentsWithFilter} from '../../redux/home/actions';
import {AppState} from '../../redux/rootReducer';
import {dySize} from '../../utils/responsive';
import {Apartment} from '../../redux/types/Apartment';
import ApartmentItemView from './components/ApartmentItemView';
import ApartmentFilterView from './components/ApartmentFilter';

const FILTER_VIEW_HEIGHT = dySize(450);

const HomeScreen = (props: any) => {
  const [filterOpended, showFilter] = useState(false);
  const [filterParams, setFilterParams] = useState({});
  const [searchText, setSearchText] = useState('');
  const [previewItem, setPreviewItem] = useState<Apartment | null>(null);
  const filterViewHeight = new Animated.Value(0);

  const dispatch = useDispatch();
  const {loading, apartments} = useSelector((state: AppState) => state.home);

  useEffect(() => {
    dispatch(
      fetchApartmentsWithFilter(
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      ),
    );
  }, []);

  useEffect(() => {
    if (filterOpended) {
      Animated.timing(filterViewHeight, {
        toValue: FILTER_VIEW_HEIGHT,
        duration: 200,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(filterViewHeight, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  }, [filterOpended]);

  const onChangeSearchText = (text: string) => {
    setSearchText(text);
  };

  const onPressFilter = () => {
    showFilter(!filterOpended);
  };

  const onPressZoom = (item: Apartment) => {
    setPreviewItem(item);
  };

  const onSubmitFilter = (
    minPrice: number,
    maxPrice: number,
    minSquare: number,
    maxSquare: number,
    bedrooms: number,
  ) => {
    setFilterParams({minPrice, maxPrice, minSquare, maxSquare, bedrooms});
    dispatch(
      fetchApartmentsWithFilter(
        minPrice,
        maxPrice,
        minSquare,
        maxSquare,
        bedrooms,
      ),
    );
    showFilter(false);
  };

  const renderApartmentItem = ({item}: {item: Apartment}) => {
    return (
      <ApartmentItemView
        data={item}
        key={item.id}
        onPressZoom={() => onPressZoom(item)}
      />
    );
  };

  return (
    <View style={{flex: 1}}>
      <DrawerHeader onPressHambuger={() => props.navigation.openDrawer()} />
      <View style={styles.searchView}>
        <SearchInput
          width={dySize(250)}
          onChange={onChangeSearchText}
          placeholder="Search By Name"
        />
        <TouchableOpacity onPress={onPressFilter}>
          <View style={styles.filterButton}>
            <Text style={styles.filterText}>Filters</Text>
            {filterOpended && (
              <Icon
                name="chevron-up-outline"
                size={30}
                style={styles.arrowIcon}
              />
            )}
            {!filterOpended && (
              <Icon
                name="chevron-down-outline"
                size={30}
                style={styles.arrowIcon}
              />
            )}
          </View>
        </TouchableOpacity>
        <Animated.View style={[styles.filterView, {height: filterViewHeight}]}>
          <ApartmentFilterView
            params={filterParams}
            visible={filterOpended}
            onSubmit={onSubmitFilter}
          />
        </Animated.View>
      </View>
      <FlatList
        data={apartments.filter((i: Apartment) =>
          i.title.toLowerCase().includes(searchText.toLowerCase()),
        )}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderApartmentItem}
        contentContainerStyle={{
          paddingBottom: dySize(100),
        }}
        style={{backgroundColor: 'lightgray'}}
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>No results</Text>
        )}
        ListFooterComponent={() => {
          return loading ? (
            <ActivityIndicator
              size="small"
              color="#00ff00"
              style={{marginTop: 20}}
            />
          ) : null;
        }}
      />
      {previewItem && (
        <Modal visible transparent animationType="slide">
          <View style={styles.modalContainer}>
            <ImageViewer
              imageUrls={previewItem.images.map((i: string) => ({url: i}))}
              onCancel={() => setPreviewItem(null)}
              enablePreload
              loadingRender={() => (
                <Text style={{color: 'white'}}>Loading...</Text>
              )}
            />
            <View style={styles.closeView}>
              <TouchableOpacity onPress={() => setPreviewItem(null)}>
                <Icon name="close-outline" size={50} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: dySize(70),
    padding: dySize(15),
    backgroundColor: 'purple',
    zIndex: 9,
    position: 'relative',
  },
  filterButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: dySize(20),
  },
  filterText: {
    fontSize: 16,
    color: 'white',
  },
  arrowIcon: {
    color: 'green',
  },
  modalContainer: {
    flex: 1,
    position: 'relative',
  },
  closeView: {
    position: 'absolute',
    top: 40,
    right: 20,
    padding: 10,
  },
  filterView: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: dySize(70),
    backgroundColor: 'white',
    zIndex: -1,
  },
  emptyText: {
    color: 'gray',
    fontSize: dySize(16),
    marginTop: dySize(40),
    textAlign: 'center',
  },
});

export default HomeScreen;
