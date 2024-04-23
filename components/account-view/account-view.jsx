import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { Col, Row, Container } from "react-bootstrap";
import { Button, Card, Form } from "react-bootstrap";

export const AccountView = ({ user, setUser }) => {

    const [username, setUsername] = useState(user.Username);
    const [email, setEmail] = useState(user.Email);
    const [birthday, setBirthday] = useState(user.Birthday);

    // Navigate
    const nav = useNavigate();

    // Token
    const token = localStorage.getItem('token');

    const handleUpdate = (event) => {
        event.preventDefault();

        const user = JSON.parse(localStorage.getItem("user"));

        const data = {
            Username: username,
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
        }).then(async (response) => {
            console.log(response)
            if (response.ok) {
                const updatedUser = await response.json();
                localStorage.setItem('user', JSON.stringify(updatedUser));
                setUser(updatedUser);
                alert("Update was successful");
            } else {
                alert("Update failed")
            }
        }).catch(error => {
            console.error('Error: ', error);
        });
    };


    //DELETE user account
    const handleDelete = () => {
        fetch(`https://tinflicks-2bf7ff98613b.herokuapp.com/users/${user.Username}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            if (response.ok) {
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
            <br />
            <Row>
                <Col md={6} sm={2}>
                    <Card>
                        <Card.Body>
                            <Card.Title>{user.Username}</Card.Title>
                            <br />
                            <Card.Img variant="top" src="https://i.redd.it/8khu7i1cwtrb1.jpg" className="w-50 rounded" />
                            <hr />
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
                        <br />
                        <Button type="submit" onClick={handleUpdate} className="mt-3 bottom-0">Update</Button>
                        <br />
                        <br />
                        <hr />
                        <Button onClick={handleDelete} className="btn-delete mt-3 bg-danger border-danger text-white" size="sm" >Delete Account</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};