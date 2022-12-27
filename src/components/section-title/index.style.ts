import { StyleSheet } from "react-native";

export default StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 8,
    paddingHorizontal: 16,
    paddingBottom: 8,
    backgroundColor: "#F8F8FE",
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#424242',
    letterSpacing: 1,
    flex: 1
  },
  line: {
    height: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#BDBDBD",
    marginHorizontal: 16
  }
});