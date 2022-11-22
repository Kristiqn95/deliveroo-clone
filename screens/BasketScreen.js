import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React, { useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { removeFromBasket, selectBasketItems, selectBasketTotal } from "../features/basketSlice";
import { useSelector, useDispatch } from "react-redux";
import { selectRestaurant } from "../features/restaurantSlice";
import tw from "twrnc";
import { XCircleIcon } from "react-native-heroicons/solid";
import { urlFor } from "../sanity";
import Currency from "react-currency-formatter";

const BasketScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const items = useSelector(selectBasketItems);
  const basketTotal = useSelector(selectBasketTotal);
  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);
  const dispatch = useDispatch();

  useMemo(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});

    setGroupedItemsInBasket(groupedItems);
  }, [items]);
  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <View style={tw`flex-1 bg-gray-100`}>
        <View style={tw`p-5 border-b border-[#00CCBB] bg-white shadow`}>
          <View>
            <Text style={tw`text-lg font-bold text-center`}>Basket</Text>
            <Text style={tw`text-center text-gray-400`}>
              {restaurant.title}
            </Text>
          </View>

          <TouchableOpacity
            onPress={navigation.goBack}
            style={tw`rounded-full bg-gray-100 absolute top-3 right-5`}
          >
            <XCircleIcon color="#00CCBB" height={50} width={50} />
          </TouchableOpacity>
        </View>

        <View style={tw`flex-row items-center px-4 py-4 bg-white my-5`}>
          <Image
            source={{
              uri: "https://links.papareact.com/wru",
            }}
            style={tw`h-7 w-7 bg-gray-300 p-4 rounded-full mr-3`}
          />
          <Text style={tw`flex-1`}>Deliver in 30-50 min</Text>
          <TouchableOpacity>
            <Text style={tw`text-[#00CCBB]`}>Change</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          {Object.entries(groupedItemsInBasket).map(([key, items]) => (
            <View
              key={key}
              style={tw`flex-row items-center bg-white py-2 px-5`}
            >
              <Text style={tw`text-[#00CCBB]`}>{items.length} x</Text>
              <Image
                source={{ uri: urlFor(items[0]?.image).url() }}
                style={tw`h-12 w-12 rounded-full ml-3`}
              />
              <Text style={tw`flex-1 ml-3`}>{items[0]?.name}</Text>

              <Text style={tw`text-gray-600 mr-4`}>
                <Currency quantity={items[0]?.price} currency="BGN" />
              </Text>

              <TouchableOpacity>
                <Text
                  style={tw`text-[#00CCBB] text-xs`}
                  onPress={() => dispatch(removeFromBasket({ id: key }))}
                >
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <View style={tw`p-5 bg-white mt-5`}>
          <View style={tw`flex-row justify-between my-2`}>
            <Text style={tw`text-gray-400`}>Subtotal</Text>
            <Text style={tw`text-gray-400`}>
              <Currency quantity={basketTotal} currency="BGN" />
            </Text>
          </View>

          <View style={tw`flex-row justify-between my-2`}>
            <Text style={tw`text-gray-400`}>Delivery Fee</Text>
            <Text style={tw`text-gray-400`}>
              <Currency quantity={5.99} currency="BGN" />
            </Text>
          </View>

          <View style={tw`flex-row justify-between my-2`}>
            <Text>Order Total</Text>
            <Text style={tw`font-extrabold`}>
              <Currency quantity={basketTotal + 5.99} currency="BGN" />
            </Text>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate("PreparingOrderScreen")} style={tw`rounded-lg bg-[#00CCBB] p-4 my-1`}>
            <Text style={tw`text-center text-white text-lg font-bold`}>Place Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BasketScreen;
