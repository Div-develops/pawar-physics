import { createContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const Context = createContext();

function AuthContext({ children }) {
    const auth = getAuth();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setLoading(false);
            setUser(currentUser);
            if (currentUser) {
                localStorage.setItem('user', JSON.stringify(currentUser));
            } else {
                localStorage.removeItem('user');
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            setLoading(false);
        }
    }, []);

    // Check if the logged-in user has the specified email address
    const isUserWithEmail = (email) => {
        return user && user.email === email;
    };

    const values = {
        user: user,
        setUser: setUser,
        isUserWithEmail: isUserWithEmail
    };

    return (
        <Context.Provider value={values}>
            {!loading && children}
        </Context.Provider>
    );
}

export default AuthContext;
