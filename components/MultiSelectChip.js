import React from "react";
import { Chip } from "react-native-paper";

import { StyleSheet, View } from "react-native";

const onPressItem = (
  item,
  dataSource,
  setState,
  selectedArray,
  selectedArrayName
) => {
  if (item.selected === true) {
    item.style = { backgroundColor: "#FFF" };
    setState(
      selectedArrayName,
      selectedArray.filter((txt) => txt !== item.name)
    );
  } else {
    item.style = { backgroundColor: "#ffc909" };
    setState(selectedArrayName, selectedArray.concat(item.name));
  }

  //Updating the item selected/unselected in the datasource
  item.selected = !item.selected;
  const index = dataSource.findIndex((i) => item.name === i.name);
  dataSource[index] = item;
  setState(dataSource, dataSource);
};

const MultiSelectChip = ({
  dataSource,
  setState,
  selectedArray,
  selectedArrayName,
}) => (
  <View
    style={{
      flexWrap: "wrap",
      flexDirection: "row",
    }}
  >
    {dataSource.map((item, index) => {
      return (
        <View style={styles.chipContainer}>
          <Chip
            key={index}
            style={item.style}
            mode="outlined"
            height={30}
            selected={item.selected}
            onPress={() =>
              onPressItem(
                item,
                dataSource,
                setState,
                selectedArray,
                selectedArrayName
              )
            }
          >
            {item.name}
          </Chip>
        </View>
      );
    })}
  </View>
);

const styles = StyleSheet.create({
  chipContainer: {
    margin: 5,
    flexWrap: "wrap",
  },
});

export default MultiSelectChip;
