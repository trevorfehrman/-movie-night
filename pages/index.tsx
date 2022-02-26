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
          return <Image src={row.cell.value} height={100} width={66} />;
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
    <div className='flex justify-center'>
      <table {...getTableProps()}>
        <thead>
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
                    <th {...column.getHeaderProps()}>
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
        <tbody {...getTableBodyProps()}>
          {
            // Loop over the table rows
            rows.map(row => {
              // Prepare the row for display
              prepareRow(row);
              return (
                // Apply the row props
                // eslint-disable-next-line react/jsx-key
                <tr {...row.getRowProps()}>
                  {
                    // Loop over the rows cells
                    row.cells.map(cell => {
                      // Apply the cell props
                      return (
                        // eslint-disable-next-line react/jsx-key
                        <td {...cell.getCellProps()}>
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
  );
};

export default Home;
