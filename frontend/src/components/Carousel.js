import React, { useEffect } from "react";
import { UncontrolledCarousel } from "reactstrap";
import useRecipeStore from "../store/recipeStore";
import "../styles/CarouselComponent.css"; // Make sure to create this CSS file
import useTagStore from "../store/userStore";

const CarouselComponent = () => {
  const recipes = useRecipeStore((state) => state.recipes);

  const { tags, fetchTags } = useTagStore();

  useEffect(() => {
    fetchTags();
  }, [fetchTags]);
  const items = recipes.map((recipe) => ({
    src: recipe.image,
    altText: recipe.title,
    caption: recipe.description,
    header: recipe.title,
    key: recipe.id,
  }));

  return (
    <div className="carousel-container" style={{ position: "relative" }}>
      <UncontrolledCarousel items={items} />
      <div className="carousel-overlay"></div>
    </div>
  );
};

export default CarouselComponent;
