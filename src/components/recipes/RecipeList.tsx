import { FlatList, ListRenderItem, StyleSheet, Text, View } from "react-native";
/*import { ScrollView, StyleSheet, Text, View } from "react-native";*/
/*import { FlatList, StyleSheet, Text, View } from "react-native";*/
import { usePerf } from "./perf";
import { MemoRecipeCard } from "./RecipeCard";
import { ALL_RECIPES, Recipe } from "./recipes-api";

/*export function RecipeList() {
  const mounted = usePerf("ScrollView + map");
 
  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.counter}>Cartes montées : {mounted}</Text>
      <ScrollView>
        {ALL_RECIPES.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </ScrollView>
    </View>
  );
}
 
const styles = StyleSheet.create({
  counter: { padding: 8, textAlign: "center", fontWeight: "600" },
});*/

/*export function RecipeList() {
  const mounted = usePerf("FlatList");
 
  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.counter}>Cartes montées : {mounted}</Text>
      <FlatList
        data={ALL_RECIPES}
        renderItem={({ item }) => <RecipeCard recipe={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
 
const styles = StyleSheet.create({
  counter: { padding: 8, textAlign: "center", fontWeight: "600" },
});*/

// Définis hors du composant : les références restent identiques d'un rendu à l'autre
const renderItem: ListRenderItem<Recipe> = ({ item }) => (
  <MemoRecipeCard recipe={item} />
);
const keyExtractor = (item: Recipe) => item.id;

export function RecipeList() {
  const mounted = usePerf("FlatList + memo");

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.counter}>Cartes montées : {mounted}</Text>
      <FlatList
        data={ALL_RECIPES}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        windowSize={21}
       /* initialNumToRender={10}
        maxToRenderPerBatch={10}
        getItemLayout={(_, index) => ({
    length: 180,
    offset: 180 * index,
    index,
  })}
    removeClippedSubviews={false}*/
        
      />
    </View>
  );
}

const styles = StyleSheet.create({
  counter: { padding: 8, textAlign: "center", fontWeight: "600" },
});
