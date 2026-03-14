import React from "react";
import Link from "next/link";
import "@/assets/pagination.css"

const Pagination = ({ page, total, limit }) => {
  const totalPage = Math.ceil(total / limit);

  return (
    <section className="pagination">
      {page > 1 ? (
        <Link className="links pag-btn" href={`/recipes?page=${page - 1}`}>Previous</Link>
      ) : null}

      <span>
        Page {page} of {totalPage}
      </span>

      {page < totalPage ? (
        <Link className="links pag-btn" href={`/recipes?page=${page + 1}`}>Next</Link>
      ) : null}
    </section>
  );
};

export default Pagination;
