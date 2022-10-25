import { Table } from '@tanstack/react-table';
import React, { ButtonHTMLAttributes, FunctionComponent, ReactNode } from 'react';
import { btnStyles } from './Pagination.styles';

export type PaginationButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  outer?: boolean;
  rounded?: 'left' | 'right';
  children: ReactNode | Array<ReactNode>;
};

type PaginationProps = {
  table: Table<any>;
};

export const Pagination: FunctionComponent<PaginationProps> = ({ table }) => {
  return (
    <div className="sticky bottom-0 bg-white p-5 border-t border-b border-b-white">
      <div className="flex items-center text-sm text-gray-500 justify-between">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1">
            <p>Page</p>
            <strong>
              {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </strong>
          </span>
          <span className="flex items-center gap-1">
            | Go to page:
            <input
              type="number"
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
              className="border p-1 rounded w-16"
            />
          </span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center">
          <PaginationButton
            rounded="left"
            outer
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <FirstSvg />
            <span>First</span>
          </PaginationButton>

          <PaginationButton onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            <PrevSvg />
            <span>Prev</span>
          </PaginationButton>

          <PaginationButton onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            <span>Next</span>
            <NextSvg />
          </PaginationButton>

          <PaginationButton
            rounded="right"
            outer
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span>Last</span>
            <LastSvg />
          </PaginationButton>
        </div>
      </div>
    </div>
  );
};

const PaginationButton = React.forwardRef<HTMLButtonElement, PaginationButtonProps>((props, ref) => {
  const { outer, rounded, children, ...rest } = props;
  return (
    <button {...rest} ref={ref} className={btnStyles(props)}>
      <span className="flex items-center gap-2">{children}</span>
    </button>
  );
});

const FirstSvg: FunctionComponent = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-4 h-4"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
    </svg>
  );
};

const LastSvg: FunctionComponent = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-4 h-4"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
    </svg>
  );
};

const PrevSvg: FunctionComponent = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-4 h-4"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
    </svg>
  );
};

const NextSvg: FunctionComponent = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-4 h-4"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
  );
};
