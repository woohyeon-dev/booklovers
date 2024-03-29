import React, { Dispatch, useEffect, useState } from 'react';
import styled from 'styled-components';

interface PaginationProps {
  totalCnt: number;
  currentPage: number;
  setStart: Dispatch<React.SetStateAction<number>>;
  setCurrentPage: Dispatch<React.SetStateAction<number>>;
}

const Pagination = ({ totalCnt, currentPage, setStart, setCurrentPage }: PaginationProps) => {
  const [currentGroup, setCurrentGroup] = useState(0);

  const PAGE_PER = 10;
  const PAGE_GROUP_SIZE = 10;
  const TOTAL_PAGES = Math.ceil(totalCnt / PAGE_PER);

  // pages에 모든 페이지를 저장
  let pages = [];
  for (let i = 1; i <= TOTAL_PAGES; i++) {
    pages.push(i);
  }

  // 10페이지씩 나누어서 pageGroups에 저장
  let pageGroups = [];
  for (let i = 0; i < pages.length; i += PAGE_GROUP_SIZE) {
    pageGroups.push(pages.slice(i, i + PAGE_GROUP_SIZE));
  }

  return (
    <PaginationBox>
      <Btn
        onClick={() => {
          if (currentGroup !== 0) {
            setStart((currentGroup - 1) * PAGE_PER ** 2 + 1);
            setCurrentPage((currentGroup - 1) * PAGE_PER + 1);
            setCurrentGroup(currentGroup - 1);
          }
        }}
      >
        &lt;
      </Btn>
      {pageGroups.length > 0 &&
        pageGroups[currentGroup].map((num) => (
          <Btn
            key={num}
            onClick={() => {
              setCurrentPage(num);
              setStart((num - 1) * PAGE_PER + 1);
            }}
            style={{ backgroundColor: num === currentPage ? '#d5d7db' : '' }}
          >
            {num}
          </Btn>
        ))}
      <Btn
        onClick={() => {
          if (currentGroup !== pageGroups.length - 1) {
            setStart((currentGroup + 1) * PAGE_PER ** 2 + 1);
            setCurrentPage((currentGroup + 1) * PAGE_PER + 1);
            setCurrentGroup(currentGroup + 1);
          }
        }}
      >
        &gt;
      </Btn>
    </PaginationBox>
  );
};

const PaginationBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const Btn = styled.button`
  width: 44px;
  height: 44px;
  border: 1px solid ${(props) => props.theme.borderColor};
  background: ${(props) => props.theme.headerColor};

  &:hover {
    background: ${(props) => props.theme.borderColor};
  }
`;

export default Pagination;
