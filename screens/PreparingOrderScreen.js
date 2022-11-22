import { View, Text, SafeAreaView } from "react-native";
import React, { useEffect } from "react";
import tw from "twrnc";
import * as Animatable from "react-native-animatable";
import * as Progress from "react-native-progress";
import { useNavigation } from "@react-navigation/native";

const PreparingOrderScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Delivery");
    }, 4000);
  }, []);
  
  return (
    <SafeAreaView style={tw`bg-[#FFEADF] flex-1 justify-center items-center`}>
      <Animatable.Image
        source={require("../assets/delivery.gif")}
        animation="slideInUp"
        iterationCount={1}
        style={tw`h-86 w-94`}
      />

      <Animatable.Text
        animation="slideInUp"
        iterationCount={1}
        style={tw`text-lg text-[#00CCBB] font-bold text-center`}
      >
        Waiting for Restaurant to accept your order!
      </Animatable.Text>

      <Progress.Circle size={60} indeterminate={true} color="#00CCBB" />
    </SafeAreaView>
  );
};

export default PreparingOrderScreen;
