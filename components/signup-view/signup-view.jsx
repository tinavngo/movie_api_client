import React from "react";
import{ useState } from "react";

export const SignupView = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();  //This prevents the default behavior of the form which is to reload the entire page

        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        };

        fetch("https://tinflicks-2bf7ff98613b.herokuapp.com/users", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((response) => {
            if (response.ok) {
                alert("Signup successful");
                window.location.reload();
            } else {
                alert("Signup failed");
            }
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    minLength="3"
                />    
            </label>
            <br></br>
            <label>
                Email:
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <br></br>
                <label>
                    Birthday:
                    <input
                        type="date"
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                    />
                </label>
                <br></br>
                <label>
                    Password:
                    <input
                        type="password"
                        minLength={8}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        />
                </label>
                <br></br>
                <button type="submit">Sign Up</button>
            </label>
        </form>
    );
    }