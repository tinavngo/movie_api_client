import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { Col, Row, Container } from "react-bootstrap";
import { Button, Card, Form } from "react-bootstrap";

export const AccountView = ({ user, token, setUser }) => {
    const [username, setUsername] = useState(user.Username);
    const [password, setPassword] = useState(user.Password);
    const [email, setEmail] = useState(user.Email);
    const [birthday, setBirthday] = useState(user.Birthday);

    const nav = useNavigate();

    const handleUpdate = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        };

        //UPDATE user data
        fetch(`https://tinflicks-2bf7ff98613b.herokuapp.com/users/${user.Username}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
            .then(async (response) => {
                if (response.ok) {
                    response.json();
                    alert("Update was successful");
                    window.location.reload();
                } else {
                    alert("Update failed")
                }
            });
    };


        //DELETE user account
        const handleDelete = () => {
            fetch(`https://tinflicks-2bf7ff98613b.herokuapp.com/users/${user.Username}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((response) => {
                if (response.ok) {
                    setUser(null);
                    alert("User has been deleted")
                    localStorage.clear();
                    nav('/'); //Back to login/signup
                } else {
                    alert("Something went wrong.")
                }
            })
        }


    return (
        <Container className="my-5">
            <h2>Profile</h2>
            <br/>
            <Row>
                <Col md={6} sm={2}>
                    <Card>
                        <Card.Body>
                            <Card.Title>{user.Username}</Card.Title>
                            <br/>
                            <Card.Img variant="top" src="https://i.redd.it/8khu7i1cwtrb1.jpg" className="w-50 rounded" />
                            <hr/>
                            <Card.Text>Email: {user.Email}</Card.Text>
                            <Card.Text>Birthday: {user.Birthday}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={5} sm={2}>
                    <Form onSubmit={handleUpdate}>
                        <Form.Group controlId="formUsername">
                            <Form.Label>Username:</Form.Label>
                            <Form.Control
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                minLength="3"
                                placeholder={user.Username}
                            />
                        </Form.Group>
                        <Form.Group controlId="formPassword">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="*******"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email:</Form.Label>
                            <Form.Control
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={user.Email}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBirthday">
                            <Form.Label>Birthday:</Form.Label>
                            <Form.Control
                                type="date"
                                value={birthday}
                                onChange={(e) => setBirthday(e.target.value)}
                                placeholder={user.Birthday}
                            />
                        </Form.Group>
                        <br/>
                        <Button type="submit" onClick={handleUpdate} className="mt-3 bottom-0">Update</Button>
                        <br/>
                        <br/>
                        <hr/>
                        <Button onClick={handleDelete} className="btn-delete mt-3 bg-danger border-danger text-white" size="sm" >Delete Account</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};