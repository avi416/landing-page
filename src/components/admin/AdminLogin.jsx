import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider, db } from "../../firebase/config";
import { getDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import React from "react";


export default function AdminLogin() {
  const navigate = useNavigate();
  const { user } = useAuth();

  // אם כבר מחובר ויש הרשאה – גש לדשבורד
  useEffect(() => {
    if (user?.isAdmin) {
      navigate("/admin/dashboard");
    }
  }, [user]);

  const login = async () => {
    try {
      // 1) התחברות עם גוגל
      const result = await signInWithPopup(auth, googleProvider);
      const email = result.user.email;

      // 2) שליפת הרשאות מ-Firestore
      const rolesDoc = await getDoc(doc(db, "roles", "admin"));
      const adminEmails = rolesDoc.data()?.adminEmails || [];

      // 3) האם האימייל נמצא ברשימת האדמינים?
      if (!adminEmails.includes(email)) {
        alert("אין לך הרשאה. פנה לאדמין לקבל הרשאה.");
        await auth.signOut();
        return;
      }

      // 4) מותר → דשבורד
      navigate("/admin/dashboard");

    } catch (err) {
      console.error(err);
      alert("שגיאה בהתחברות");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>

        <h2 style={styles.title}>התחברות אדמין</h2>
        <p style={styles.subtitle}>רק בעלי הרשאות יכולים לגשת</p>

        <button onClick={login} style={styles.btn}>
          התחברות עם Google
        </button>

      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f5f5",
    direction: "rtl"
  },
  box: {
    background: "#fff",
    padding: "40px 50px",
    borderRadius: "12px",
    boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
    textAlign: "center",
    maxWidth: "350px",
    width: "100%"
  },
  title: {
    marginBottom: "10px",
    fontSize: "26px",
  },
  subtitle: {
    marginBottom: "25px",
    color: "#555",
    fontSize: "16px"
  },
  btn: {
    background: "#4285F4",
    color: "#fff",
    padding: "12px 20px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "17px",
    width: "100%",
  }
};
