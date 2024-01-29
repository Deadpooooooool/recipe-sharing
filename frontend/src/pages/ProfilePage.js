import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  ModalFooter,
} from "reactstrap";
import PostGrid from "../components/PostGrid";
import useUserStore from "../store/userStore";
import AdminCard from "../components/AdminCard";
import RecipeCard from "../components/RecipeCard";

const ProfilePage = () => {
  const userStore = useUserStore();
  const userProfile = useUserStore((state) => state.userProfile);
  const updateUserProfile = userStore.updateUserProfile;
  const [modalOpen, setModalOpen] = useState(false);
  const [editedUserData, setEditedUserData] = useState({});
  console.log("userProfile", userProfile);

  useEffect(() => {
    userStore.fetchUserProfile();
  }, []);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleInputChange = (e) => {
    setEditedUserData({ ...editedUserData, [e.target.name]: e.target.value });
  };

  const handleProfileEdit = async () => {
    // Call the updateUserProfile function with the edited data
    await updateUserProfile(editedUserData);
    toggleModal();
  };
  if (!userProfile) {
    return <div>Loading...</div>; // Display a loading message or spinner
  }
  return (
    <>
      <div
        style={{
          backgroundColor: "gray",
          height: "250px",
          textAlignLast: "center",
          margin: "20px",
        }}
      >
        <img
          src="https://png.pngtree.com/png-vector/20190223/ourmid/pngtree-vector-avatar-icon-png-image_695765.jpg"
          alt="Avatar"
          width={90}
          height={90}
          style={{ borderRadius: "50px", margin: "10px" }}
        />
        <h3>{userProfile.name}</h3>
        <p>{userProfile.bio}</p>
        <Button style={{ borderRadius: "20px" }} onClick={toggleModal}>
          Edit Profile
        </Button>
      </div>
      <Row>
        <Col md={2}>
          <div
            style={{
              marginLeft: "20px",
              flex: 1,
              width: "250px",
              backgroundColor: "#dddad7",
              marginTop: "15px",
              padding: "25px",
            }}
          >
            <div>
              <span style={{ fontWeight: "bold" }}>Followers</span>
              <button
                style={{
                  float: "right",
                  width: "50px",
                  borderRadius: "15px",
                  marginRight: "5px",
                }}
              >
                {userProfile.followersCount}
              </button>
            </div>
            <br />
            <div>
              <span style={{ fontWeight: "bold" }}>Following</span>
              <button
                style={{
                  float: "right",
                  width: "50px",
                  borderRadius: "15px",
                  marginRight: "5px",
                }}
              >
                {userProfile.followingCount}
              </button>
            </div>
            <br />
            <div>
              <span style={{ fontWeight: "bold" }}>Posts</span>
              <button
                style={{
                  float: "right",
                  width: "50px",
                  borderRadius: "15px",
                  marginRight: "5px",
                }}
              >
                {userProfile.recipesCount}
              </button>
            </div>
            <br />
            {/* <div>
              <span style={{ fontWeight: "bold" }}>Liked Recipes</span>
              <button
                style={{
                  float: "right",
                  width: "50px",
                  borderRadius: "15px",
                  marginRight: "5px",
                }}
              >
                {}
              </button>
            </div> */}
          </div>
        </Col>
        <Col>
          <Row className="ms-3">
            {userProfile.recipes && userProfile.recipes.length > 0 ? (
              userProfile.recipes.map((recipe) => (
                <Col md={4} key={recipe.id}>
                  <RecipeCard recipe={recipe} />{" "}
                  {/* Render each recipe in a RecipeCard */}
                </Col>
              ))
            ) : (
              <Col>
                <p>No recipes found.</p>{" "}
                {/* Display a message if no recipes are available */}
              </Col>
            )}
          </Row>
        </Col>
      </Row>

      <Container>
        <Row>
          <Col>{/* <PostGrid recipes={userRecipes} /> */}</Col>
        </Row>
        <Modal isOpen={modalOpen} toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>Edit Profile</ModalHeader>
          <ModalBody>
            {/* Form for editing profile */}
            <Form>
              {/* Add form fields for editing profile information */}
              <FormGroup>
                <Label for="editUsername">Bio</Label>
                <Input
                  type="text"
                  name="editUsername"
                  id="editUsername"
                  placeholder="Enter new username"
                />
              </FormGroup>
              <FormGroup>
                <Label for="editDetails">Profile Picture </Label>
                <Input
                  type="file"
                  name="editDetails"
                  id="editDetails"
                  placeholder="Enter Details"
                />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={() => handleProfileEdit(/* pass edited data */)}
            >
              Save Changes
            </Button>
            <Button color="secondary" onClick={toggleModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </Container>
    </>
  );
};

export default ProfilePage;
