import { createContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const Context = createContext();

function AuthContext({ children }) {
    const auth = getAuth();
    const [user, setUser] = useState(null); // Initialize user state with null
    const [loading, setLoading] = useState(true); // Set loading to true initially

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setLoading(false);
            setUser(currentUser); // Update user state
            if (currentUser) {
                localStorage.setItem('user', JSON.stringify(currentUser)); // Store user in local storage
            } else {
                localStorage.removeItem('user'); // Remove user from local storage
            }
        });

        return () => {
            unsubscribe(); // Cleanup function
        };
    }, []);

    // Check if user is already authenticated from local storage on initial render
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            setLoading(false);
        }
    }, []);

    const values = {
        user: user,
        setUser: setUser
    };

    return (
        <Context.Provider value={values}>
            {!loading && children}
        </Context.Provider>
    );
}

export default AuthContext;
