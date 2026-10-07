import { FlashList } from "@shopify/flash-list";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { usePerf } from "./perf";
import { MemoRecipeCard } from "./RecipeCard";
import { fetchRecipes, Recipe } from "./recipes-api";
/*import { FlashList } from "@shopify/flash-list";
import { StyleSheet, Text, View } from "react-native";
import { FlatList, ListRenderItem, StyleSheet, Text, View } from "react-native";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { usePerf } from "./perf";
import { MemoRecipeCard } from "./RecipeCard";
import { ALL_RECIPES, Recipe } from "./recipes-api";
import { ALL_RECIPES } from "./recipes-api";*/

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
/*const renderItem: ListRenderItem<Recipe> = ({ item }) => (
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
       initialNumToRender={10}
        maxToRenderPerBatch={10}
        getItemLayout={(_, index) => ({
    length: 180,
    offset: 180 * index,
    index,
  })}
    removeClippedSubviews={false}
        
      />
    </View>
  );
}

const styles = StyleSheet.create({
  counter: { padding: 8, textAlign: "center", fontWeight: "600" },
});*/

	/*export function RecipeList() {
  const mounted = usePerf("FlashList");
 
  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.counter}>Cartes montées : {mounted}</Text>
      <FlashList
        data={ALL_RECIPES}
        renderItem={({ item }) => <MemoRecipeCard recipe={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
 
const styles = StyleSheet.create({
  counter: { padding: 8, textAlign: "center", fontWeight: "600" },
});*/

	export function RecipeList() {
  const mounted = usePerf("FlashList paginée");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const nextPage = useRef(0);
  const isLoading = useRef(false);
 
  async function load(reset: boolean) {

    console.log(nextPage.current)
    // Garde-fou : un seul chargement à la fois, et rien après la dernière page
    if (isLoading.current || (!reset && !hasMore)) return;
    isLoading.current = true;
    if (reset) {
      nextPage.current = 0;
      setIsRefreshing(true);
    }
 
    const result = await fetchRecipes(nextPage.current);
    nextPage.current += 1;
    setRecipes((previous) => (reset ? result.items : [...previous, ...result.items]));
    setHasMore(result.hasMore);
    setIsRefreshing(false);
    isLoading.current = false;
  }
 
  useEffect(() => {
    load(true);
  }, []);
 
  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.counter}>
        Chargées : {recipes.length} · Montées : {mounted}
      </Text>
      <FlashList
        data={recipes}
        renderItem={({ item }) => <MemoRecipeCard recipe={item} />}
        keyExtractor={(item) => item.id}
        onEndReached={() => load(false)}
        onEndReachedThreshold={0.2}
        refreshing={isRefreshing}
        onRefresh={() => load(true)}
        ListFooterComponent={hasMore ? <ActivityIndicator style={styles.footer} /> : null}
      />
    </View>
  );
}
 
const styles = StyleSheet.create({
  counter: { padding: 8, textAlign: "center", fontWeight: "600" },
  footer: { padding: 16 },
});

