import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { ListItem } from "react-native-elements";
import axios from "axios";

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: [],
      url: "http://localhost:5000/",
    };
  }

  componentDidMount() {
    this.getStars();
  }

  getStars = async () => {
    //const { url } = this.state;
    await axios
      .get("http://localhost:5000/")
      .then((response) => {
        return this.setState({
          listData: response.data.data,
        });
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  };

  renderItem = ({ item, index }) => (
    /* <ListItem
      key={index}
      title={`Planet : ${item.name}`}
      subtitle={`Distance from earth : ${item.distance_from_earth}`}
      titleStyle={styles.title}
      containerStyle={styles.listContainer}
      bottomDivider
      chevron
      onPress={() =>
        this.props.navigation.navigate("Details", { star_name: item.name })
      }
    />*/
    <View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "white",
          padding:30
        }}
      >
        <View>
          <Text>{`Star : ${item.name}`}</Text>
          <Text>{`Distance from earth : ${item.distance_from_earth}`}</Text>
        </View>

        <View>
          <TouchableOpacity onPress={() => null}>
            <Text>click here</Text>
          </TouchableOpacity>
        </View>
      </View>


      <View
        style={{ borderWidth: 2, borderColor: "grey", width: "100%" }}
      ></View>


    </View>
  );

  keyExtractor = (item, index) => index.toString();

  render() {
    const { listData } = this.state;

    if (listData.length === 0) {
      console.log("loading");
      this.getPlanets();
      return (
        <View style={styles.emptyContainer}>
          <Text>Loading</Text>
        </View>
      );
    } else {
      console.log("Working");
      return (
        <View style={styles.container}>
          <SafeAreaView />
          <View style={styles.upperContainer}>
            <Text style={styles.headerText}>Stars World</Text>
          </View>
          <View style={styles.lowerContainer}>
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.listData}
              renderItem={this.renderItem}
            />
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#edc988",
  },
  upperContainer: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#132743",
  },
  lowerContainer: {
    flex: 0.9,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainerText: {
    fontSize: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#d7385e",
  },
  listContainer: {
    backgroundColor: "#eeecda",
  },
});
