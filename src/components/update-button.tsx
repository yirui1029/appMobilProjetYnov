import * as Updates from "expo-updates";
import { useState } from "react";
import { Alert, Pressable, StyleSheet } from "react-native";

import { Spacing } from "@/constants/theme";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

export function UpdateButton() {
  const [isChecking, setIsChecking] = useState(false);

  async function onCheckUpdates() {
    setIsChecking(true);

    try {
      const update = await Updates.checkForUpdateAsync();

      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      } else {
        Alert.alert("Application à jour", "Aucune mise à jour disponible.");
      }
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Une erreur inconnue est survenue.";

      Alert.alert("Mise à jour impossible", message);
    } finally {
      setIsChecking(false);
    }
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Rechercher les mises à jour"
      accessibilityState={{
        disabled: isChecking,
        busy: isChecking,
      }}
      disabled={isChecking}
      onPress={onCheckUpdates}
      style={({ pressed }) => [styles.pressable, pressed && styles.pressed]}
    >
      <ThemedView type="backgroundElement" style={styles.button}>
        <ThemedText type="smallBold">
          {isChecking ? "Recherche en cours…" : "Rechercher les mises à jour"}
        </ThemedText>
      </ThemedView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    alignSelf: "stretch",
  },

  pressed: {
    opacity: 0.7,
  },

  button: {
    alignItems: "center",
    borderRadius: Spacing.three,
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
  },
});
