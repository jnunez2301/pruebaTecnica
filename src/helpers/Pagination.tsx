import React from "react";
import PaginationStyles from "./Pagination.module.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
  setCurrentPage: (pageNumber: number) => void; // Make sure to include this prop in the interface
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  setCurrentPage,
}) => {
  const pageNumbers: number[] = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handleNextPageChange = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleLastPageChange = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <ul className={PaginationStyles.container}>
      <button
        onClick={handleLastPageChange}
        className={`${PaginationStyles.navigationBtn} ${currentPage === 1 ? PaginationStyles.disabled : ""}`}
        disabled={currentPage === 1}
      >
        {"<"}
      </button>
      {pageNumbers.map((number) => (
        <li
          key={number}
          className={currentPage === number ? PaginationStyles.active : ""}
        >
          <button onClick={() => onPageChange(number)}>{number}</button>
        </li>
      ))}
      <button
        onClick={handleNextPageChange}
        className={`${PaginationStyles.navigationBtn} ${currentPage === totalPages ? PaginationStyles.disabled : ""}`}
        disabled={currentPage === totalPages}
      >
        {">"}
      </button>
    </ul>
  );
};

export default Pagination;
