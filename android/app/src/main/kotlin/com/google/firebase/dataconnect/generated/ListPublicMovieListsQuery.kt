
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


public interface ListPublicMovieListsQuery :
    com.google.firebase.dataconnect.generated.GeneratedQuery<
      ExampleConnector,
      ListPublicMovieListsQuery.Data,
      Unit
    >
{
  

  
    @kotlinx.serialization.Serializable
  public data class Data(
  
    val movieLists: List<MovieListsItem>
  ) {
    
      
        @kotlinx.serialization.Serializable
  public data class MovieListsItem(
  
    val id: @kotlinx.serialization.Serializable(with = com.google.firebase.dataconnect.serializers.UUIDSerializer::class) java.util.UUID,
    val name: String,
    val description: String?,
    val user: User
  ) {
    
      
        @kotlinx.serialization.Serializable
  public data class User(
  
    val id: @kotlinx.serialization.Serializable(with = com.google.firebase.dataconnect.serializers.UUIDSerializer::class) java.util.UUID,
    val displayName: String
  ) {
    
    
  }
      
    
    
  }
      
    
    
  }
  

  public companion object {
    public val operationName: String = "ListPublicMovieLists"

    public val dataDeserializer: kotlinx.serialization.DeserializationStrategy<Data> =
      kotlinx.serialization.serializer()

    public val variablesSerializer: kotlinx.serialization.SerializationStrategy<Unit> =
      kotlinx.serialization.serializer()
  }
}

public fun ListPublicMovieListsQuery.ref(
  
): com.google.firebase.dataconnect.QueryRef<
    ListPublicMovieListsQuery.Data,
    Unit
  > =
  ref(
    
      Unit
    
  )

public suspend fun ListPublicMovieListsQuery.execute(
  
  ): com.google.firebase.dataconnect.QueryResult<
    ListPublicMovieListsQuery.Data,
    Unit
  > =
  ref(
    
  ).execute()


  public fun ListPublicMovieListsQuery.flow(
    
    ): kotlinx.coroutines.flow.Flow<ListPublicMovieListsQuery.Data> =
    ref(
        
      ).subscribe()
      .flow
      ._flow_map { querySubscriptionResult -> querySubscriptionResult.result.getOrNull() }
      ._flow_filterNotNull()
      ._flow_map { it.data }

