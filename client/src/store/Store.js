import { createStore } from "redux";
import RootRecucer from "./RootReducer";

const Store = createStore(
  RootRecucer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

export default Store; 
