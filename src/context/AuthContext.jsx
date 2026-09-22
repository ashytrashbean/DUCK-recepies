import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [users, setUsers] = useState(() => {
        const storedUsers = localStorage.getItem("duckUsers")
        return storedUsers ? JSON.parse(storedUsers) : []
    })

    const [currentUser, setCurrentUser] = useState(() => {
        const storedUser = localStorage.getItem("currentDuckUser")
        return storedUser ? JSON.parse(storedUser) : null
    })

    function createUser(displayName, email, password) {
        const storedUsers = JSON.parse(localStorage.getItem("duckUsers") ?? "[]")
        const normalizedEmail = email.trim().toLowerCase()

        const alreadyExists = storedUsers.some(
            user => user.email.toLowerCase() === normalizedEmail
        )

        if (alreadyExists) {
            return { ok: false, message: "User already exists" }
        }

        const newUser = {
            id: Date.now(),
            displayName: displayName.trim(),
            email: normalizedEmail,
            password,
            savedRecipes: []
        }

        const updatedUsers = [...storedUsers, newUser]
        setUsers(updatedUsers)
        localStorage.setItem("duckUsers", JSON.stringify(updatedUsers))

        setCurrentUser(newUser)
        localStorage.setItem("currentDuckUser", JSON.stringify(newUser))

        return { ok: true, message: "Account successfully created" }
    }

    function logInUser(email, password) {
        const storedUsers = JSON.parse(localStorage.getItem("duckUsers") ?? "[]")
        const normalizedEmail = email.trim().toLowerCase()

        const foundUser = storedUsers.find(
            user => user.email.toLowerCase() === normalizedEmail && user.password === password
        )

        if (!foundUser) {
            return { ok: false, message: "Wrong email or password" }
        }

        setCurrentUser(foundUser)
        localStorage.setItem("currentDuckUser", JSON.stringify(foundUser))
        return { ok: true, message: "Logged in" }
    }

    function logOutUser() {
        setCurrentUser(null)
        localStorage.removeItem("currentDuckUser")
        return { ok: true, message: "Logged out successfully" }
    }

    function toggleSaved(recipeId) {
        if (!currentUser) {
            return { ok: false, message: "You have to log in to be able to save" }
        }

        const storedUsers = JSON.parse(localStorage.getItem("duckUsers") ?? "[]")
        const savedRecipes = currentUser.savedRecipes ?? []
        const alreadySaved = savedRecipes.includes(recipeId)

        const updatedUsers = storedUsers.map(user => {
            if (user.id !== currentUser.id) return user

            return {
                ...user,
                savedRecipes: alreadySaved
                    ? savedRecipes.filter(id => id !== recipeId)
                    : [...savedRecipes, recipeId]
            }
        })

        setUsers(updatedUsers)
        localStorage.setItem("duckUsers", JSON.stringify(updatedUsers))

        const updatedCurrentUser = updatedUsers.find(user => user.id === currentUser.id)
        setCurrentUser(updatedCurrentUser)
        localStorage.setItem("currentDuckUser", JSON.stringify(updatedCurrentUser))

        return {
            ok: true,
            message: alreadySaved
                ? "Recipe removed from saved recipes"
                : "Recipe saved successfully"
        }
    }

    return (
        <AuthContext.Provider
            value={{users, currentUser, createUser, logInUser, logOutUser, toggleSaved
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
