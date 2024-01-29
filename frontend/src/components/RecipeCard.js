import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

const RecipeCard = ({ recipe }) => {
  const [selectedRating, setSelectedRating] = useState(recipe.average_rating);
  const [likes, setLikes] = useState(recipe.likes_count);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [comment, setComment] = useState("");
  const isAuthenticated = JSON.parse(localStorage.getItem("isAuthenticated"));

  const handleStarClick = (rating) => {
    setSelectedRating(rating);
  };

  const handleDislikeClick = () => {
    // Toggle between liking and disliking
    if (!disliked) {
      // Increment likes if not already disliked
      setLiked(false); // Reset like state
      setDisliked(true);
      setLikes(likes + 1);
    } else {
      // Decrement likes if already disliked (toggle off)
      setDisliked(false);
      setLikes(likes - 1);
    }
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleSendClick = () => {
    // Handle sending the comment
    // console.log("Comment:", comment);

    // Close the modal
    setModalOpen(false);
  };

  return (
    <Card style={{ width: "18rem", height: "20rem", margin: "10px" }}>
      <Link
        to={{
          pathname: `/recipes/${recipe.id}`,
          state: { recipe },
        }}
        style={{ textDecoration: "none" }}
      >
        <CardTitle>{recipe.difficulty_level}</CardTitle>
        <CardImg
          style={{ width: "100%", height: "10rem" }}
          top
          src={recipe.image}
          alt={recipe.title}
        />
      </Link>

      <CardBody style={{ alignSelf: "center" }}>
        <div>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => handleStarClick(star)}
              style={{
                cursor: "pointer",
                color: star <= selectedRating ? "gold" : "gray",
              }}
            >
              &#9733;
            </span>
          ))}
        </div>
        <CardTitle tag="h5">{recipe.title}</CardTitle>
        <div style={{ textAlign: isAuthenticated ? "right" : "center" }}>
          <Button
            variant="secondary"
            style={{
              fontSize: "15px",
              width: "80px",
              borderRadius: "50px",
              float: isAuthenticated ? "right" : "none", // Adjust the float property
            }}
          >
            {likes} &#10084;
          </Button>
          {isAuthenticated && (
            <>
              <Button
                variant="danger"
                style={{
                  fontSize: "15px",
                  width: "80px",
                  borderRadius: "50px",
                  float: "right",
                  marginLeft: "5px",
                  marginRight: "5px",
                }}
                onClick={handleDislikeClick}
                className={disliked ? "active" : ""}
              >
                <span style={{ color: disliked ? "red" : "inherit" }}>
                  &#9829;
                </span>
              </Button>
              <Button
                variant="secondary"
                style={{
                  fontSize: "15px",
                  width: "80px",
                  borderRadius: "50px",
                  float: "right",
                }}
                onClick={toggleModal}
              >
                {recipe.comments_count}&#9997;
              </Button>
            </>
          )}
        </div>

        {/* Modal for comments */}
        <Modal isOpen={modalOpen} toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>Add Comment</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="commentTextarea">Comment</Label>
              <Input
                type="textarea"
                name="comment"
                id="commentTextarea"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </FormGroup>
            <Button color="primary" onClick={handleSendClick}>
              Send
            </Button>
          </ModalBody>
        </Modal>
      </CardBody>
    </Card>
  );
};

export default RecipeCard;
