import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./index.css";
import "./index.css";
import App from "./App.tsx";
import store from "./store";
import { StrictMode } from "react";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
// import { persistStore } from "redux-persist";
import { HelmetProvider } from "react-helmet-async";
import { registerLicense } from "@syncfusion/ej2-base";
// import * as serviceWorker from "./serviceWorker";

registerLicense(
  "Mgo+DSMBaFt/QHRqVVhkVFpFdEBBXHxAd1p/VWJYdVt5flBPcDwsT3RfQF5jSn5Rd0ZmX3pddnJVQQ==;Mgo+DSMBPh8sVXJ0S0J+XE9AflRDX3xKf0x/TGpQb19xflBPallYVBYiSV9jS31TdUVhWHxbdnFWQGheVg==;ORg4AjUWIQA/Gnt2VVhkQlFacldJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxQdkZjW35ddXJQRWdbVkM=;MTI0MjcwMkAzMjMwMmUzNDJlMzBOSXdvWTlHKyt0WWJ4eVRWWW1Sd05FUy80OWhNd1MyNUpVSWZSSDdKWjdzPQ==;MTI0MjcwM0AzMjMwMmUzNDJlMzBPY0w1Q2UrSStKT093TFBIaWNkZEZneWpCMHN5emJOT3hrczVwUGtXaGhVPQ==;NRAiBiAaIQQuGjN/V0Z+WE9EaFtKVmJLYVB3WmpQdldgdVRMZVVbQX9PIiBoS35RdUVgWX1fc3FTQ2NUWUR+;MTI0MjcwNUAzMjMwMmUzNDJlMzBYREo4enczWm1WLzRueS9xZk5WRE94RFkzSUZFWng0TW1tWW9aVTNUT1RNPQ==;MTI0MjcwNkAzMjMwMmUzNDJlMzBTYWhvc21aS2hlc2tGZzZENlRpcWNDS0pTMnpJcTdiaTA2d1FlaHpDOUQwPQ==;Mgo+DSMBMAY9C3t2VVhkQlFacldJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxQdkZjW35ddXJQRWlaVkw=;MTI0MjcwOEAzMjMwMmUzNDJlMzBucEpsejFWeHZPWjNMSHk5WUNPN2g2Snc3b3hNdXRCY2p2WG5rYkhtUVFRPQ==;MTI0MjcwOUAzMjMwMmUzNDJlMzBLVXFpWkJBZFJXVGdyM0R4amlzNTh4b0FCaFhGTVI5REpYai9IYkJnZVpjPQ==;MTI0MjcxMEAzMjMwMmUzNDJlMzBYREo4enczWm1WLzRueS9xZk5WRE94RFkzSUZFWng0TW1tWW9aVTNUT1RNPQ=="
);

// const persistor = persistStore(store);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </HelmetProvider>
  </StrictMode>
);

// serviceWorker.register();