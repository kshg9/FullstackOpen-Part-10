import { Image, Linking, Pressable, StyleSheet, View } from "react-native";
import Text from "./Text";

const RepositoryItem = ({ item, singleView }) => {
  if (!item) return <Text>Loading...</Text>

  return (
    <View testID="repositoryItem" style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.avatar} source={{ uri: item.ownerAvatarUrl }} />
        <View style={styles.info}>
          <Text style={styles.fullName}>{item.fullName}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.language}>{item.language}</Text>
        </View>
      </View>

      <View style={styles.stats}>
        <Stat label="Stars" count={item.stargazersCount} />
        <Stat label="Forks" count={item.forksCount} />
        <Stat label="Reviews" count={item.reviewCount} />
        <Stat label="Rating" count={item.ratingAverage} />
      </View>

      {
        singleView && (
          <>
            <View style={styles.separator} />
            <Pressable style={styles.button} onPress={() => Linking.openURL(item.url)}>
              <Text color={'textSecondary'} fontWeight={'bold'} >Open in Github</Text>
            </Pressable>
          </>
        )
      }
    </View>
  )
}

const formatCount = (count) => {
  return count >= 1000 ? `${(count / 1000).toFixed(1)}k` : String(count);
}

const Stat = ({ label, count }) => (
  <View style={styles.statsItem}>
    <Text style={styles.statsCount}>{formatCount(count)}</Text>
    <Text style={styles.statsLabel}>{label}</Text>
  </View>
)

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  container: {
    padding: 15,
    marginBottom: 8,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  language: {
    color: '#ffffff',
    alignSelf: 'flex-start',
    backgroundColor: '#0366d6',
    borderRadius: 5,
    padding: 4,
  },
  info: {
    flexShrink: 1,
    marginLeft: 10,
  },
  statsCount: {
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 5,
  },
  statsLabel: {
    color: '#586069',
    alignSelf: 'center',
  },
  fullName: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    color: '#586069',
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  }
});

export default RepositoryItem;
