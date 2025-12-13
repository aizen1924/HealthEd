
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


import kotlinx.coroutines.flow.filterNotNull as _flow_filterNotNull
import kotlinx.coroutines.flow.map as _flow_map


public interface GetMyReviewsQuery :
    com.google.firebase.dataconnect.generated.GeneratedQuery<
      ExampleConnector,
      GetMyReviewsQuery.Data,
      Unit
    >
{
  

  
    @kotlinx.serialization.Serializable
  public data class Data(
  
    val reviews: List<ReviewsItem>
  ) {
    
      
        @kotlinx.serialization.Serializable
  public data class ReviewsItem(
  
    val id: @kotlinx.serialization.Serializable(with = com.google.firebase.dataconnect.serializers.UUIDSerializer::class) java.util.UUID,
    val rating: Int,
    val review: String?,
    val movie: Movie
  ) {
    
      
        @kotlinx.serialization.Serializable
  public data class Movie(
  
    val id: @kotlinx.serialization.Serializable(with = com.google.firebase.dataconnect.serializers.UUIDSerializer::class) java.util.UUID,
    val title: String
  ) {
    
    
  }
      
    
    
  }
      
    
    
  }
  

  public companion object {
    public val operationName: String = "GetMyReviews"

    public val dataDeserializer: kotlinx.serialization.DeserializationStrategy<Data> =
      kotlinx.serialization.serializer()

    public val variablesSerializer: kotlinx.serialization.SerializationStrategy<Unit> =
      kotlinx.serialization.serializer()
  }
}

public fun GetMyReviewsQuery.ref(
  
): com.google.firebase.dataconnect.QueryRef<
    GetMyReviewsQuery.Data,
    Unit
  > =
  ref(
    
      Unit
    
  )

public suspend fun GetMyReviewsQuery.execute(
  
  ): com.google.firebase.dataconnect.QueryResult<
    GetMyReviewsQuery.Data,
    Unit
  > =
  ref(
    
  ).execute()


  public fun GetMyReviewsQuery.flow(
    
    ): kotlinx.coroutines.flow.Flow<GetMyReviewsQuery.Data> =
    ref(
        
      ).subscribe()
      .flow
      ._flow_map { querySubscriptionResult -> querySubscriptionResult.result.getOrNull() }
      ._flow_filterNotNull()
      ._flow_map { it.data }

