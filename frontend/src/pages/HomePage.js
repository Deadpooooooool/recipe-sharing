import React, { useEffect } from "react";
import CarouselComponent from "../components/Carousel";
import Filters from "../components/Filters";
import PostGrid from "../components/PostGrid";
import useRecipeStore from "../store/recipeStore"; // Import the Zustand store
import Sidebar from "../components/Sidebar";
import MainLayout from "../layouts/MainLayout";

const HomePage = () => {
  const recipes = useRecipeStore((state) => state.recipes);
  const filters = useRecipeStore((state) => state.filters);
  // const currentPage = useRecipeStore((state) => state.pagination.currentPage);
  const totalPages = useRecipeStore((state) => state.pagination.lastPage);
  const { currentPage, lastPage } = useRecipeStore((state) => state.pagination);

  // console.log("totalPages",lastPage);
  console.log("currentPage",currentPage);

  useEffect(() => {
    useRecipeStore.getState().getRecipesByTags(filters, currentPage);
  }, [filters, currentPage]);

  const handlePageChange = (newPage) => {
    // Only change pages if the new page number is valid
    if (newPage > 0 && newPage <= lastPage) {
      // Call the changePage action from your Zustand store
      useRecipeStore.getState().getRecipesByTags(filters, newPage);
    }
  };

  return (
    <>
      <CarouselComponent />
      <MainLayout sidebar={<Sidebar />}>
        <div>
          <PostGrid recipes={recipes} />

          {/* Pagination UI */}
          <div>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage <= 1} // Disable if on the first page
            >
              Previous
            </button>
            <span>
              {" "}
              Page {currentPage} of {lastPage}{" "}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= lastPage} // Disable if on the last page
            >
              Next
            </button>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default HomePage;
