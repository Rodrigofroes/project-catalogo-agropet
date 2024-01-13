const PageNavigation = () => {
    const pageNumbers = [];
  
    for (let i = 1; i <= Math.ceil(catalogo.length / postsPerPage); i++) {
      pageNumbers.push(i);
    }
  
    return (
      <div className="pagination">
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={currentPage === pageNumber ? "active" : ""}
          >
            {pageNumber}
          </button>
        ))}
      </div>
    );
  };
  