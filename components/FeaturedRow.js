import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import tw from "twrnc";
import RestourantCard from "./RestaurantCard";
import sanityClient from "../sanity";

const FeaturedRow = ({
  id,
  title,
  description,
  // featuredCategory
}) => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    sanityClient.fetch(
      `
            *[_type == "featured" && _id == $id] {
                ...,
                restaurants[]->{
                  ...,
                  dishes[]->,
                  type-> {
                    none
                  }
                },
              }[0]
            `,
      { id }
    ).then(data => {
        setRestaurants(data?.restaurants);
    });
  }, []);

  return (
    <View>
      <View style={tw`mt-4 flex-row items-center justify-between px-4`}>
        <Text style={tw`font-bold text-lg `}>{title}</Text>
        <ArrowRightIcon color="00CCBB" />
      </View>

      <Text style={tw`text-xs text-gray-500 px-4`}>{description}</Text>

      <ScrollView
        horizontal
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        showsHorizontalScrollIndicator={false}
        style={tw`pt-4`}
      >

        {/* RestourantCards */}
        {restaurants?.map((restaurant) => (
             <RestourantCard
             key={restaurant._id}
             id={restaurant._id}
             imgUrl={restaurant.image}
             title={restaurant.name}
             rating={restaurant.rating}
             genre={restaurant.type?.name}
             address={restaurant.address}
             short_description={restaurant.short_description}
             dishes={restaurant.dishes}
             long={restaurant.long}
             lat={restaurant.lat}
           />
        ))}
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;