import { FlatList, StyleSheet, View } from "react-native"
import { useParams } from "react-router-native"
import useRepository from "../hooks/useRepository"
import RepositoryItem from "./RepositoryItem"
import Text from "./Text"

const RepositoryInfo = ({ repository }) => {
  return (
    <RepositoryItem item={repository} singleView />
  )
}

const ReviewItem = ({ review }) => {
  const formattedDate = new Date(review.createdAt).toLocaleDateString('en-GB')

  return (
    <View style={styles.reviewContainer}>
      <View style={styles.ratingCircle}>
        <Text fontWeight={'bold'} color={'textPrimary'}>{review.rating}</Text>
      </View>
      <View style={styles.reviewContent}>
        <Text fontWeight={'bold'}>{review.user.username}</Text>
        <Text style={styles.faintText}>{formattedDate}</Text>
        <Text>{review?.text}</Text>
      </View>
    </View>
  )
}

const SingleRepository = () => {
  const { id } = useParams()
  const { repository, loading, fetchMore } = useRepository({ id, first: 5 })
  const reviews = repository?.reviews.edges.map(edge => edge.node)

  if (loading) return <Text>Loading...</Text>
  const onEndReached = () => {
    fetchMore();
  }

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
    />
  )
}

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  reviewContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#ffffff',
  },
  ratingCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: '#0366d6',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  reviewContent: {
    flex: 1,
  },
  faintText: {
    color: '#7F8CAA'
  }
});

export default SingleRepository
