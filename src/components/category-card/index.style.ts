import { StyleSheet } from "react-native";

export default StyleSheet.create({
  wrapper: {
    flexDirection: 'column',
    marginTop: 8,
    marginHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 4
  },
  title: {
    fontSize: 16,
    marginBottom: 16
  },
  row: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputRow: {
    flex: 1
  },
  typeRowWrapper: {
    flex: 1,
    borderRadius: 0,
    borderColor: '#E0E0E0',
    borderStyle: 'solid',
    borderWidth: 1,
    marginTop: 6,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  typeRowText: {
    fontSize: 12,
    color: '#5700E9',
    textTransform: 'uppercase',
    letterSpacing: 1
  },
  deleteIcon: {
    marginRight: 0
  },
  titleFieldButton: {
    marginTop: 8,
    borderRadius: 4
  },
  addFieldButton: {
    borderRadius: 4
  },
  menuText: {
    textTransform: "capitalize"
  }
});