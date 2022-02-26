import * as React from 'react'; /* This example requires Tailwind CSS v2.0+ */
import { NextPage } from 'next';
import { useTable } from 'react-table';
import Image from 'next/image';

import { Movie, useMovies } from 'hooks/useMovies';
import { BASE_IMG_URL_ORIGINAL } from 'constants/imageUrls';

const Home: NextPage = () => {
  const columns = React.useMemo(() => {
    return [
      {
        Header: 'Poster',
        accessor: (d: any) => `${BASE_IMG_URL_ORIGINAL}${d.posterPath}`,
        Cell: (row: any) => {
          console.log(row);
          return <Image alt='Movie poster' src={row.cell.value} height={100} width={66} />;
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
        accessor: 'director',
      },
      {
        Header: 'Year',
        accessor: 'year',
      },
    ];
  }, []);

  const movies = useMovies();

  const tableInstance = useTable({ columns, data: movies });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

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
                {
                  // Loop over the header rows
                  headerGroups.map(headerGroup => (
                    // Apply the header row props
                    // eslint-disable-next-line react/jsx-key
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {
                        // Loop over the headers in each row
                        headerGroup.headers.map(column => (
                          // Apply the header cell props
                          // eslint-disable-next-line react/jsx-key
                          <th
                            className='py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400'
                            {...column.getHeaderProps()}
                          >
                            {
                              // Render the header
                              column.render('Header')
                            }
                          </th>
                        ))
                      }
                    </tr>
                  ))
                }
              </thead>
              {/* Apply the table body props */}
              <tbody
                className='bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700'
                {...getTableBodyProps()}
              >
                {
                  // Loop over the table rows
                  rows.map(row => {
                    // Prepare the row for display
                    prepareRow(row);
                    return (
                      // Apply the row props
                      // eslint-disable-next-line react/jsx-key
                      <tr
                        className='hover:bg-gray-100 dark:hover:bg-gray-700'
                        {...row.getRowProps()}
                      >
                        {
                          // Loop over the rows cells
                          row.cells.map(cell => {
                            // Apply the cell props
                            return (
                              // eslint-disable-next-line react/jsx-key
                              <td
                                className='py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white'
                                {...cell.getCellProps()}
                              >
                                {
                                  // Render the cell contents
                                  cell.render('Cell')
                                }
                              </td>
                            );
                          })
                        }
                      </tr>
                    );
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
