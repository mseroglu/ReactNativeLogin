import { SafeAreaProvider } from "react-native-safe-area-context";
import RootNavigation from "./src/navigation/RootNavigation";
import { store } from "./src/redux/store";
import { Provider } from "react-redux";




export default function App() {


  return (

    <Provider store={store}>
      <SafeAreaProvider>
        <RootNavigation />
      </SafeAreaProvider>
    </Provider>
  );
}


