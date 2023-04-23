import { AppRouter } from "./router/AppRouter";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="containerApp">
          <AppRouter />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
