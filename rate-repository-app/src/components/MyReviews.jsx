import { useQuery } from "@apollo/client";
import { Alert, FlatList, Pressable, StyleSheet, View } from "react-native";
import { useNavigate } from "react-router-native";
import { ME } from "../graphql/queries";
import useDeleteReview from "../hooks/useDeleteReview";
import Text from "./Text";

const ReviewItem = ({ review }) => {
  const navigate = useNavigate()
  const [deleteReview] = useDeleteReview();
  const formattedDate = new Date(review.repository.createdAt).toLocaleDateString('en-GB')

  const handleDelete = (reviewId) => {
    Alert.alert(
      'Delete review',
      'Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: () => deleteReview(reviewId) },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.reviewCard}>
      <View style={styles.reviewContainer}>
        <View style={styles.ratingCircle}>
          <Text fontWeight={'bold'} color={'textPrimary'}>{review.rating}</Text>
        </View>
        <View style={styles.reviewContent}>
          <Text fontWeight={'bold'}>{review.repository.fullName}</Text>
          <Text style={styles.faintText}>{formattedDate}</Text>
          <Text>{review.text}</Text>
        </View>
      </View>
      <View style={styles.buttonRow}>
        <Pressable style={styles.viewButton} onPress={() => navigate(`/repository/${review.repository.id}`)}>
          <Text color={"textSecondary"} fontWeight={'bold'}>View repository</Text>
        </Pressable>
        <Pressable style={styles.deleteButton} onPress={() => handleDelete(review.id)}>
          <Text color={"textSecondary"} fontWeight={'bold'}>Delete review</Text>
        </Pressable>
      </View>
    </View>
  )
}

const MyReviews = () => {
  const { data, loading } = useQuery(ME, {
    variables: { withReviews: true },
    fetchPolicy: 'cache-and-network'
  })

  if (loading) return <Text>Loading...</Text>
  const reviews = data.me?.reviews?.edges.map(edge => edge.node)

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  )
}


const styles = StyleSheet.create({
  separator: {
    height: 8,
  },
  reviewCard: {
    backgroundColor: '#ffffff',
    marginBottom: 8,
  },
  reviewContainer: {
    flexDirection: 'row',
    padding: 16,

  },
  ratingCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
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
    color: '#7F8CAA',
    marginTop: 4,
    marginBottom: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 12,
  },
  viewButton: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
  },
});

export default MyReviews;
