
@file:kotlin.Suppress(
  "KotlinRedundantDiagnosticSuppress",
  "LocalVariableName",
  "MayBeConstant",
  "RedundantVisibilityModifier",
  "RemoveEmptyClassBody",
  "SpellCheckingInspection",
  "LocalVariableName",
  "unused",
)

package com.google.firebase.dataconnect.generated



public interface CreateReviewMutation :
    com.google.firebase.dataconnect.generated.GeneratedMutation<
      ExampleConnector,
      CreateReviewMutation.Data,
      CreateReviewMutation.Variables
    >
{
  
    @kotlinx.serialization.Serializable
  public data class Variables(
  
    val movieId: @kotlinx.serialization.Serializable(with = com.google.firebase.dataconnect.serializers.UUIDSerializer::class) java.util.UUID,
    val rating: Int,
    val review: String,
    val watchId: @kotlinx.serialization.Serializable(with = com.google.firebase.dataconnect.serializers.UUIDSerializer::class) java.util.UUID
  ) {
    
    
  }
  

  
    @kotlinx.serialization.Serializable
  public data class Data(
  
    val review_insert: ReviewKey
  ) {
    
    
  }
  

  public companion object {
    public val operationName: String = "CreateReview"

    public val dataDeserializer: kotlinx.serialization.DeserializationStrategy<Data> =
      kotlinx.serialization.serializer()

    public val variablesSerializer: kotlinx.serialization.SerializationStrategy<Variables> =
      kotlinx.serialization.serializer()
  }
}

public fun CreateReviewMutation.ref(
  
    movieId: java.util.UUID,rating: Int,review: String,watchId: java.util.UUID,
  
  
): com.google.firebase.dataconnect.MutationRef<
    CreateReviewMutation.Data,
    CreateReviewMutation.Variables
  > =
  ref(
    
      CreateReviewMutation.Variables(
        movieId=movieId,rating=rating,review=review,watchId=watchId,
  
      )
    
  )

public suspend fun CreateReviewMutation.execute(
  
    movieId: java.util.UUID,rating: Int,review: String,watchId: java.util.UUID,
  
  
  ): com.google.firebase.dataconnect.MutationResult<
    CreateReviewMutation.Data,
    CreateReviewMutation.Variables
  > =
  ref(
    
      movieId=movieId,rating=rating,review=review,watchId=watchId,
  
    
  ).execute()


