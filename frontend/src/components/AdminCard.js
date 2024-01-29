import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardBody,
  CardImg,
  CardTitle,
  Container,
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import useRecipeStore from '../store/recipeStore';

function AdminCard() {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  
  const [editedRecipe, setEditedRecipe] = useState({
    title: '',
    difficulty_level: '',
    // Add other fields based on your recipe structure
  });

  // Fetch recipes and filters from the store
  const fetchRecipes = useRecipeStore((state) => state.getRecipesByTags);
  const recipes = useRecipeStore((state) => state.recipes);
  const filters = useRecipeStore((state) => state.filters);

  useEffect(() => {
    // Fetch recipes based on filters and update the store
    fetchRecipes(filters);
  }, [fetchRecipes, filters]);

  const toggleEditModal = (recipe) => {
    setSelectedRecipe(recipe);
    setEditModalOpen(!editModalOpen);
  };

  const toggleDeleteModal = (recipe) => {
    setSelectedRecipe(recipe);
    setDeleteModalOpen(!deleteModalOpen);
  };

  const handleEdit = () => {
    // Handle the edit logic here
    console.log('Editing recipe:', selectedRecipe, editedRecipe);
    // Perform API call or other logic to update the recipe with the edited values
    setEditModalOpen(false);
  };

  const handleDelete = () => {
    // Handle the delete logic here
    console.log('Deleting recipe:', selectedRecipe);
    setDeleteModalOpen(false);
  };

  const handleInputChange = (e) => {
    // Handle input changes and update the edited recipe state
    const { name, value } = e.target;
    setEditedRecipe((prevRecipe) => ({
      ...prevRecipe,
      [name]: value,
    }));
  };

  return (
    <Container>
      <Row>
        {recipes.map((recipe) => (
          <Col key={recipe.id} md={3} style={{ marginBottom: '10px' }}>
            <Card style={{ width: '100%', height: '20rem' }}>
              <Link
                to={{
                  pathname: `/recipes/${recipe.id}`,
                  state: { recipe },
                }}
                style={{ textDecoration: 'none' }}
              >
                <CardTitle>{recipe.difficulty_level}</CardTitle>
                <CardImg
                  style={{ width: '100%', height: '10rem' }}
                  top
                  src={recipe.image}
                  alt={recipe.title}
                />
              </Link>
              <CardBody>
                <CardTitle tag="h5">{recipe.title}</CardTitle>
                <Button color="primary" onClick={() => toggleEditModal(recipe)}>
                  <FaEdit />
                </Button>
                <Button color="danger" onClick={() => toggleDeleteModal(recipe)}>
                  <FaTrash />
                </Button>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal isOpen={editModalOpen} toggle={toggleEditModal}>
          <ModalHeader>Edit Recipe</ModalHeader>
          <ModalBody>
            {/* Edit Form */}
            <FormGroup>
              <Label for="editTitle">Title</Label>
              <Input
                type="text"
                name="title"
                id="editTitle"
                value={selectedRecipe ? selectedRecipe.title : ''}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="editDifficulty">Difficulty Level</Label>
              <Input
                type="text"
                name="difficulty_level"
                id="editDifficulty"
                value={selectedRecipe ? selectedRecipe.difficulty_level : ''}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="editDifficulty">Description</Label>
              <Input
                type="text"
                name="description"
                id="editDescription"
                value={selectedRecipe ? selectedRecipe.description : ''}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="editDifficulty">Ingredients</Label>
              <Input
                type="text"
                name="ingredients"
                id="editIngredients"
                value={selectedRecipe ? selectedRecipe.ingredients : ''}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="editDifficulty">Steps</Label>
              <Input
                type="text"
                name="steps"
                id="editSteps"
                value={selectedRecipe ? selectedRecipe.steps : ''}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="editDifficulty">Image</Label>
              <Input
                type="file"
                name="image"
                id="editimage"
                // value={selectedRecipe ? selectedRecipe.image : ''}
                onChange={handleInputChange}
              />
            </FormGroup>
            {/* Add other fields based on your recipe structure */}
            
            {/* Save and Cancel buttons */}
            <Button color="primary" onClick={handleEdit}>
              Save
            </Button>{' '}
            <Button color="secondary" onClick={() => setEditModalOpen(false)}>
              Cancel
            </Button>
          </ModalBody>
        </Modal>

      {/* Delete Modal */}
      <Modal isOpen={deleteModalOpen} toggle={toggleDeleteModal}>
        <ModalHeader>Delete Recipe</ModalHeader>
        <ModalBody>
          {/* Add your delete confirmation content here */}
          <Button color="danger" onClick={handleDelete}>
            Confirm Delete
          </Button>{' '}
          <Button color="secondary" onClick={() => setDeleteModalOpen(false)}>
            Cancel
          </Button>
        </ModalBody>
      </Modal>
    </Container>
  );
}

export default AdminCard;
