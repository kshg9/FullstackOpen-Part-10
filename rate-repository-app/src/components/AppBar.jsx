import { useQuery } from "@apollo/client";
import Constants from "expo-constants";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Link } from "react-router-native";
import { ME } from "../graphql/queries";
import useSignOut from "../hooks/useSignOut";
import theme from "../theme";

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

const AppBarTab = ({ title, to }) => {
  return (
    <Pressable>
      <Link to={to}>
        <Text style={styles.fontColor}>{title}</Text>
      </Link>
    </Pressable>
  )
}

const AppBar = () => {
  const { data } = useQuery(ME)
  const user = data?.me
  const signout = useSignOut()

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab title={"Repositories"} to={'/'} />
        {
          user ? (
            <Pressable onPress={signout}>
              <Text style={styles.fontColor}>Sign out</Text>
            </Pressable>
          ) : (
            <AppBarTab title={"Sign in"} to={'/signin'} />
          )
        }
      </ScrollView>
    </View>
  )
}

export default AppBar;
