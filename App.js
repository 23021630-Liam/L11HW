import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";

const Home = ({ navigation }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
  });

  // Fetch data from the API
  useEffect(() => {
    fetch("https://jsonhost.com/json/1b4bed325d2eb757f851effd61c1abd7")
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((myJson) => {
          console.log("Fetched data:", myJson); // You can log this for testing
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
  }, []);

  // Handle sign-up button press
  const handleSubmit = () => {
    if (formData.username && formData.email && formData.phone) {
      Alert.alert("User Registered", `Username: ${formData.username}`);
      setFormData({ username: "", email: "", phone: "" }); // Reset form
    } else {
      Alert.alert("Error", "Please fill in all fields.");
    }
  };

  return (
      <View style={styles.container}>
        <Text style={styles.header}>Sign Up</Text>
        <TextInput
            style={styles.input}
            placeholder="Username"
            value={formData.username}
            onChangeText={(text) => setFormData({ ...formData, username: text })}
        />
        <TextInput
            style={styles.input}
            placeholder="Email"
            value={formData.email}
            keyboardType="email-address"
            onChangeText={(text) => setFormData({ ...formData, email: text })}
        />
        <TextInput
            style={styles.input}
            placeholder="Phone"
            value={formData.phone}
            keyboardType="phone-pad"
            onChangeText={(text) => setFormData({ ...formData, phone: text })}
        />
        <Button title="Sign Up" onPress={handleSubmit} />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff",
  },
});

export default Home;
