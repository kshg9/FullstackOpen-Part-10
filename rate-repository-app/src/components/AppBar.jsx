import { View, StyleSheet, Text, Pressable, ScrollView } from "react-native";
import Constants from "expo-constants";
import theme from "../theme";
import { Link } from "react-router-native";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 5,
    backgroundColor: theme.colors.primary,
  },
  fontColor: {
    color: theme.colors.textSecondary,
    backgroundColor: "#24292e",
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
    padding: 10,
  },
})

const AppBarTab = ({title, to}) => {
  return (
    <Pressable onPress={() => console.log(`${title} pressed`)}>
      <Link to={to}>
        <Text style={styles.fontColor}>{title}</Text>
      </Link>
    </Pressable>
  )
}

const AppBar = () => {
  return (
  <View style={styles.container}>
    <ScrollView horizontal>
      <AppBarTab title={"Repositories"} to={'/'}/>
      <AppBarTab title={"Sign in"} to={'/signin'} />
    </ScrollView>
  </View>
  )
}

export default AppBar;