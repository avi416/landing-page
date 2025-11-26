import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React from "react";


const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        setLoading(false);
        return;
      }

      // יש משתמש — עכשיו מותר למשוך את roles/admin
      try {
        const rolesDoc = await getDoc(doc(db, "roles", "admin"));
        const adminEmails = rolesDoc.data()?.adminEmails || [];

        console.log("ADMIN EMAILS:", adminEmails);
        console.log("CURRENT USER:", firebaseUser.email);

        setUser({
          ...firebaseUser,
          isAdmin: adminEmails.includes(firebaseUser.email)
        });

      } catch (err) {
        console.error("FAILED TO LOAD ADMIN ROLES:", err);
        setUser({
          ...firebaseUser,
          isAdmin: false
        });
      }

      setLoading(false);
    });

    return () => unsub();
  }, []);

  if (loading) return <p style={{ padding: 20 }}>טוען...</p>;

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
