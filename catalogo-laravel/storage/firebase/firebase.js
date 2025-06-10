v// Firebase SDK
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBdkVDUIPV8vcxcNXQ",
  authDomain: "peapres-77a1b.firebaseapp.com",
  projectId: "peapres-77a1b",
  storageBucket: "peapres-77a1b.appspot.com", 
  messagingSenderId: "122835773477",
  appId: "1:122835773477:web:ce17c58488d74e0f5ab7cc",
  measurementId: "G-VQBGVLCMZL"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

// Subida de imagen al seleccionar archivo
document.getElementById('imagenFile').addEventListener('change', async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const filename = Date.now() + '-' + file.name;
  const storageRef = ref(storage, 'productos/' + filename);

  try {
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);

    document.getElementById('imagenURL').value = url;
    document.getElementById('preview').src = url;
  } catch (error) {
    console.error("Error al subir imagen:", error);
    alert("Error al subir imagen. Intenta de nuevo.");
  }
});
