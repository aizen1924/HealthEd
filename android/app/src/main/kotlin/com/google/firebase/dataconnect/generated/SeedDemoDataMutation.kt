
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



public interface SeedDemoDataMutation :
    com.google.firebase.dataconnect.generated.GeneratedMutation<
      ExampleConnector,
      SeedDemoDataMutation.Data,
      Unit
    >
{
  

  
    @kotlinx.serialization.Serializable
  public data class Data(
  
    val user_insertMany: List<UserKey>,
    val movieList_insertMany: List<MovieListKey>
  ) {
    
    
  }
  

  public companion object {
    public val operationName: String = "SeedDemoData"

    public val dataDeserializer: kotlinx.serialization.DeserializationStrategy<Data> =
      kotlinx.serialization.serializer()

    public val variablesSerializer: kotlinx.serialization.SerializationStrategy<Unit> =
      kotlinx.serialization.serializer()
  }
}

public fun SeedDemoDataMutation.ref(
  
): com.google.firebase.dataconnect.MutationRef<
    SeedDemoDataMutation.Data,
    Unit
  > =
  ref(
    
      Unit
    
  )

public suspend fun SeedDemoDataMutation.execute(
  
  ): com.google.firebase.dataconnect.MutationResult<
    SeedDemoDataMutation.Data,
    Unit
  > =
  ref(
    
  ).execute()


