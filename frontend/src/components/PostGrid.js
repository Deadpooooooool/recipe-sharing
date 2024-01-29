import React from 'react';
import { Row, Col } from 'reactstrap';
import RecipeCard from './RecipeCard'; // Assuming you have a RecipeCard component

const PostGrid = ({ recipes }) => {
    return (
        <Row>
            {recipes.map(recipe => (
                <Col sm="12" md="4" lg="3" key={recipe.id} style={{width:'auto'}}>
                    <RecipeCard recipe={recipe} />
                </Col>
            ))}
        </Row>
    );
};

export default PostGrid;
