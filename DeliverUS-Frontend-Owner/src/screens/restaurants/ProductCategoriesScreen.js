import { useEffect, useState } from 'react'
import { StyleSheet, View, FlatList, Pressable } from 'react-native'
import { showMessage } from 'react-native-flash-message'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { getDetail } from '../../api/RestaurantEndpoints'
import { getByRestaurant, remove } from '../../api/ProductCategoryEndpoint'
import TextRegular from '../../components/TextRegular'
import TextSemiBold from '../../components/TextSemiBold'
import * as GlobalStyles from '../../styles/GlobalStyles'
import DeleteModal from '../../components/DeleteModal'

export default function ProductCategoriesScreen({ navigation, route }) {
  const [restaurant, setRestaurant] = useState({})
  const [categoryToBeDeleted, setCategoryToBeDeleted] = useState(null)
  const [categories, setCategories] = useState([])

  useEffect(() => {
    fetchRestaurantDetail()
    fetchCategories()
  }, [route])

  const renderHeader = () => {
    return (
      <View>
        <View style={styles.restaurantHeaderContainer}>
          <TextSemiBold textStyle={styles.textTitle}>
            {restaurant.name}
          </TextSemiBold>
          <TextRegular textStyle={styles.description}>
            {restaurant.description}
          </TextRegular>
        </View>
        <Pressable
          onPress={() =>
            navigation.navigate('CreateProductCategoryScreen', {
              id: restaurant.id
            })
          }
          style={({ pressed }) => [
            {
              backgroundColor: pressed
                ? GlobalStyles.brandSecondaryTap
                : GlobalStyles.brandSecondary
            },
            styles.button
          ]}
        >
          <View
            style={[
              { flex: 1, flexDirection: 'row', justifyContent: 'center' }
            ]}
          >
            <MaterialCommunityIcons
              name="circle-edit-outline"
              color={'white'}
              size={20}
            />
            <TextRegular textStyle={styles.text}>
              Create new category
            </TextRegular>
          </View>
        </Pressable>
      </View>
    )
  }

  const renderCategory = ({ item }) => {
    return (
      <Pressable
        onPress={() => {
          setCategoryToBeDeleted(item)
        }}
        style={({ pressed }) => [
          {
            backgroundColor: pressed
              ? GlobalStyles.brandPrimaryTap
              : GlobalStyles.brandPrimary
          },
          styles.actionButton
        ]}
      >
        <View
          style={[{ flex: 1, flexDirection: 'row', justifyContent: 'center' }]}
        >
          <MaterialCommunityIcons name="delete" color={'white'} size={20} />
          <TextRegular textStyle={styles.text}>{item.name}</TextRegular>
        </View>
      </Pressable>
    )
  }

  const renderEmptyCategoriesList = () => {
    return (
      <TextRegular textStyle={styles.emptyList}>
        This restaurant has no categories yet.
      </TextRegular>
    )
  }

  const fetchRestaurantDetail = async () => {
    try {
      const fetchedRestaurant = await getDetail(route.params.id)
      setRestaurant(fetchedRestaurant)
    } catch (error) {
      showMessage({
        message: `There was an error while retrieving restaurant details (id ${route.params.id}). ${error}`,
        type: 'error',
        style: GlobalStyles.flashStyle,
        titleStyle: GlobalStyles.flashTextStyle
      })
    }
  }

  const fetchCategories = async () => {
    try {
      const fetchedCategories = await getByRestaurant(route.params.id)
      setCategories(fetchedCategories)
    } catch (error) {
      showMessage({
        message: `There was an error while retrieving categories for restaurant ${route.params.id}. ${error}`,
        type: 'error',
        style: GlobalStyles.flashStyle,
        titleStyle: GlobalStyles.flashTextStyle
      })
    }
  }

  const removeCategory = async category => {
    try {
      await remove(category.restaurantId, category.id)
      await fetchCategories()
      setCategoryToBeDeleted(null)
      showMessage({
        message: `Category ${category.name} succesfully removed`,
        type: 'success',
        style: GlobalStyles.flashStyle,
        titleStyle: GlobalStyles.flashTextStyle
      })
    } catch (error) {
      console.log(error)
      setCategoryToBeDeleted(null)
      showMessage({
        message: `Category ${category.name} could not be removed.`,
        type: 'error',
        style: GlobalStyles.flashStyle,
        titleStyle: GlobalStyles.flashTextStyle
      })
    }
  }

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyCategoriesList}
        style={styles.container}
        data={categories}
        renderItem={renderCategory}
        keyExtractor={item => item.id.toString()}
      />
      <DeleteModal
        isVisible={categoryToBeDeleted !== null}
        onCancel={() => setCategoryToBeDeleted(null)}
        onConfirm={() => removeCategory(categoryToBeDeleted)}
      >
        <TextRegular>
          If the category is used by some product, it cannot be deleted.
        </TextRegular>
      </DeleteModal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  row: {
    padding: 15,
    marginBottom: 5,
    backgroundColor: GlobalStyles.brandSecondary
  },
  restaurantHeaderContainer: {
    height: 250,
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    flexDirection: 'column',
    alignItems: 'center'
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center'
  },
  image: {
    height: 100,
    width: 100,
    margin: 10
  },
  description: {
    color: 'white'
  },
  textTitle: {
    fontSize: 20,
    color: 'white'
  },
  emptyList: {
    textAlign: 'center',
    padding: 50
  },
  button: {
    borderRadius: 8,
    height: 40,
    marginTop: 12,
    padding: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    width: '80%'
  },
  text: {
    fontSize: 16,
    color: 'white',
    alignSelf: 'center',
    marginLeft: 5
  },
  availability: {
    textAlign: 'right',
    marginRight: 5,
    color: GlobalStyles.brandSecondary
  },
  actionButton: {
    borderRadius: 8,
    height: 40,
    marginTop: 12,
    margin: '1%',
    padding: 10,
    alignSelf: 'center',
    flexDirection: 'column',
    width: '50%'
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    bottom: 5,
    position: 'absolute',
    width: '90%'
  }
})
