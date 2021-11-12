import initAuthentication from "../Firebase/firebase.init"
import { getAuth, signOut, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, updateProfile, createUserWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";


initAuthentication();


const useFirebase = () => {
    
    const auth = getAuth();
    
    const [user, setUser] = useState(null);
    const [admin, setAdmin] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    
    
    
    const registerNewUser = (email, password, name) => {
        setLoading(true);
        setError("");
        
        return (
            createUserWithEmailAndPassword(auth, email, password)
                .then(() => {
                    setUser(null);
                    saveUser(email, name, 'POST');
                    updateProfile(auth.currentUser, {displayName: name})
                        .catch((error) => {
                            setError(error.message);
                        });
                    logOut();
                })
                .catch((error) => {
                    setError(error.message);
                })
                .finally(() => {
                    setLoading(false);
                })
        );
    }
    
    const loginEmailPass = (email, password) => {
        setLoading(true);
        setError("");
        
        return (
            signInWithEmailAndPassword(auth, email, password)
                .catch((error) => {
                    setError(error.message);
                })
                .finally(() => {
                    setLoading(false);
                })
        );
    }
    
    /* ---------------- Sign In Using Google ---------------- */
    const googleLogin = () => {
        setError('');
        setLoading(true);
        const googleProvider = new GoogleAuthProvider();
        
        return (
            signInWithPopup(auth, googleProvider)
                .then((result) => {
                    const user = result.user;
                    saveUser(user.email, user.displayName, 'PUT');
                })
                .catch((error) => {
                    setError(error.message);
                })
                .finally(() => {
                    setLoading(false);
                })
        );
    };
    
    /* ------------------ Sign Out / Log Out ------------------ */
    const logOut = () => {
        setError('');
        setLoading(true);
        
        signOut(auth)
            .then(() => {
                setUser(null);
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };
    
    /* ---------------- Save Users to Database ---------------- */
    const saveUser = (email, displayName, method) => {
        const user = { email, displayName };
        
        fetch('https://dry-dusk-43936.herokuapp.com/users', {
                method: method,
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(user)
            });
    }
    
    /* -------------- Check if the user is Admin -------------- */
    useEffect(() => {
        fetch(`https://dry-dusk-43936.herokuapp.com/users/${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setAdmin(data.admin);
            });
    }, [user?.email]);
    
    /* ------------ Check Currently signed-in User ------------ */
    useEffect(() => {
        setLoading(true);
        const unsubscribed = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            }
            else {
                setUser(null);
            }
            setLoading(false);
        });
        
        return unsubscribed;
    }, [auth]);
    
    /*----------------- Some Custom Error Message----------------- */
    useEffect(() => {
        if (error === "Firebase: Error (auth/user-not-found).") {
            setError("There is no account with this Email");
        }
        if (error === "Firebase: Error (auth/email-already-in-use).") {
            setError("This email already have an account.");
        }
        if (error === "Firebase: Error (auth/wrong-password).") {
            setError("You have entered wrong Password.");
        }
    }, [error]);
    
    
    return {
        user,
        error,
        admin,
        setError,
        loading,
        logOut,
        googleLogin,
        registerNewUser,
        loginEmailPass
    };
};


export default useFirebase;