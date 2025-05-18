import { configureStore, combineReducers } from "@reduxjs/toolkit";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";
// import storage from "redux-persist/lib/storage";

import articleReducer from "./slices/articleSlice";
import authReducer from "./slices/authSlice";
import categoryReducer from "./slices/categorySlice";
import formReducer from "./slices/formSlice";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["isLogin", "isAdmin", "user"],
};

const articlePersistConfig = {
  key: "article",
  storage,
  whitelist: [
    "articles",
    "publishArticles",
    "draftArticles",
    "userArticles",
    "userDraftArticles",
  ],
};

const categoryPersistConfig = {
  key: "category",
  storage,
  whitelist: ["categories"],
};

const formPersistConfig = {
  key: "form",
  storage,
  whitelist: ["mode", "electedFormData"],
};

// filepath: src/redux/store.js
const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  article: persistReducer(articlePersistConfig, articleReducer),
  category: persistReducer(categoryPersistConfig, categoryReducer),
  form: persistReducer(formPersistConfig, formReducer),
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore redux-persist actions in serializable check
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/REGISTER",
        ],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
