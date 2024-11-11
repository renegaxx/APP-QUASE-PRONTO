import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';  // Adicionando o Firebase Storage
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAkP-I25nJEg6euMw70y09_7d6SpMQPBL0",
  authDomain: "puthype-server.firebaseapp.com",
  projectId: "puthype-server",
  storageBucket: "puthype-server.appspot.com", // Verifique o nome correto do seu storageBucket
  messagingSenderId: "453444696907",
  appId: "1:453444696907:web:fb9b901e785c56cd97c6ce"
};

// Inicializar o Firebase
const app = initializeApp(firebaseConfig);

// Inicializar o Auth com persistência
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

// Inicializar o Firestore
const db = getFirestore(app);

// Inicializar o Firebase Storage (para gerenciar uploads de imagem)
const storage = getStorage(app);

export { auth, db, storage };
