/* eslint-disable react/jsx-key */
import * as React from 'react';
import { NextPage } from 'next';
import { CellProps, useSortBy, useTable } from 'react-table';
import Image from 'next/image';

import { Movie, useMovies } from 'hooks/useMovies';
import { BASE_IMG_URL_ORIGINAL } from 'constants/imageUrls';

const Home: NextPage = () => {
  const columns = React.useMemo(() => {
    return [
      {
        Header: 'Index',
        accessor: '',
        Cell: (d: CellProps<Movie>) => {
          return <div>{d.rows.length - Number(d.row.id)}</div>;
        },
      },
      {
        Header: 'Poster',
        accessor: (d: any): string => `${BASE_IMG_URL_ORIGINAL}${d.posterPath}`,
        Cell: (row: CellProps<Movie>) => {
          return (
            <Image
              alt='Movie poster'
              src={row.cell.value}
              height={100}
              width={66}
            />
          );
        },
      },
      {
        Header: 'Title',
        accessor: 'title',
      },
      {
        Header: 'Picker',
        accessor: 'picker',
      },
      {
        Header: 'Director',
        accessor: (d: any) => d.director[0],
      },
      {
        Header: 'Country',
        accessor: (d: any) => d.country[0],
      },
      {
        Header: 'Year',
        accessor: 'year',
      },
      {
        Header: 'Rouzies',
        accessor: 'rouzies',
      },
    ];
  }, []);

  const { movies } = useMovies();

  const [moviesList, setMoviesList] = React.useState<Movie[]>([]);

  React.useEffect(() => {
    console.log('hi ');
    if (movies) {
      setMoviesList(movies);
    }
  }, [movies]);

  const tableInstance = useTable(
    { columns: columns as any, data: moviesList },
    useSortBy
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div className='flex flex-col'>
      <div className='overflow-x-auto shadow-md sm:rounded-lg'>
        <div className='inline-block min-w-full align-middle'>
          <div className='overflow-hidden'>
            <table
              className='min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700'
              {...getTableProps()}
            >
              <thead className='bg-gray-100 dark:bg-gray-700'>
                {headerGroups.map(headerGroup => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => {
                      return (
                        <th
                          className='py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400'
                          {...column.getHeaderProps(
                            column.getSortByToggleProps()
                          )}
                        >
                          {column.render('Header')}
                        </th>
                      );
                    })}
                  </tr>
                ))}
              </thead>
              <tbody
                className='bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700'
                {...getTableBodyProps()}
              >
                {rows.map(row => {
                  prepareRow(row);
                  return (
                    <tr
                      className='hover:bg-gray-100 dark:hover:bg-gray-700'
                      {...row.getRowProps()}
                    >
                      {row.cells.map(cell => {
                        return (
                          <td
                            className='py-4 px-6 text-sm font-medium text-gray-900 whitespace-normal break-words dark:text-white'
                            {...cell.getCellProps()}
                          >
                            {cell.render('Cell')}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
