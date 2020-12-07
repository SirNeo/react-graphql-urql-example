import React, { useContext } from 'react'
import styled from 'styled-components'

import { useTable, useFilters, useGlobalFilter, useAsyncDebounce } from 'react-table'
import { matchSorter } from 'match-sorter'

import PageContext from '../../Context/Pagination'

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid gray;
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }
    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid gray;
      border-right: 1px solid gray;
      :last-child {
        border-right: 0;
      }
      color: #4c4c4c;
    }
  }
`

// Define a default UI for filtering
function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
  }) {
    const count = preGlobalFilteredRows.length
    const [value, setValue] = React.useState(globalFilter)
    const onChange = useAsyncDebounce(value => {
      setGlobalFilter(value || undefined)
    }, 200)
  
    return (
      <span>
        Search:{' '}
        <input
          value={value || ""}
          onChange={e => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
          placeholder={`${count} records...`}
          style={{
            fontSize: '1.1rem',
            border: '0',
          }}
        />
      </span>
    )
}
  
// Define a default UI for filtering
function DefaultColumnFilter({
    column: { filterValue, preFilteredRows, setFilter },
  }) {
    const count = preFilteredRows.length
  
    return (
      <input
        value={filterValue || ''}
        onChange={e => {
          setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
        }}
        placeholder={`Search ${count} records...`}
      />
    )
}
  
// This is a custom filter UI for selecting a unique option from a list
function SelectColumnFilter({
    column: { filterValue, setFilter, preFilteredRows, id },
  }) {
    // Calculate the options for filtering
    // using the preFilteredRows
    const options = React.useMemo(() => {
      const options = new Set()
      preFilteredRows.forEach(row => {
        options.add(row.values[id])
      })
      return [...options.values()]
    }, [id, preFilteredRows])
  
    // Render a multi-select box
    return (
      <select
        value={filterValue}
        onChange={e => {
          setFilter(e.target.value || undefined)
        }}
      >
        <option value="">All</option>
        {options.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
    )
}
  
function SliderColumnFilter({
    column: { filterValue, setFilter, preFilteredRows, id },
  }) {
    // Calculate the min and max
    // using the preFilteredRows
  
    const [min, max] = React.useMemo(() => {
      let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
      let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
      preFilteredRows.forEach(row => {
        min = Math.min(row.values[id], min)
        max = Math.max(row.values[id], max)
      })
      return [min, max]
    }, [id, preFilteredRows])
  
    return (
      <>
        <input
          type="range"
          min={min}
          max={max}
          value={filterValue || min}
          onChange={e => {
            setFilter(parseInt(e.target.value, 10))
          }}
        />
        <button onClick={() => setFilter(undefined)}>Off</button>
      </>
    )
}

// This is a custom UI for our 'between' or number range
// filter. It uses two number boxes and filters rows to
// ones that have values between the two
function NumberRangeColumnFilter({
    column: { filterValue = [], preFilteredRows, setFilter, id },
  }) {
    const [min, max] = React.useMemo(() => {
      let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
      let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
      preFilteredRows.forEach(row => {
        min = Math.min(row.values[id], min)
        max = Math.max(row.values[id], max)
      })
      return [min, max]
    }, [id, preFilteredRows])
  
    return (
      <div
        style={{
          display: 'flex',
        }}
      >
        <input
          value={filterValue[0] || ''}
          type="number"
          onChange={e => {
            const val = e.target.value
            setFilter((old = []) => [val ? parseInt(val, 10) : undefined, old[1]])
          }}
          placeholder={`Min (${min})`}
          style={{
            width: '70px',
            marginRight: '0.5rem',
          }}
        />
        to
        <input
          value={filterValue[1] || ''}
          type="number"
          onChange={e => {
            const val = e.target.value
            setFilter((old = []) => [old[0], val ? parseInt(val, 10) : undefined])
          }}
          placeholder={`Max (${max})`}
          style={{
            width: '70px',
            marginLeft: '0.5rem',
          }}
        />
      </div>
    )
  }

function fuzzyTextFilterFn(rows, id, filterValue) {
    return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
}
  
// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = val => !val

function TableStructure({ columns, data }) {
  
  const filterTypes = React.useMemo(
        () => ({
          // Add a new fuzzyTextFilterFn filter type.
          fuzzyText: fuzzyTextFilterFn,
          // Or, override the default text filter to use
          // "startWith"
          text: (rows, id, filterValue) => {
            return rows.filter(row => {
              const rowValue = row.values[id]
              return rowValue !== undefined
                ? String(rowValue)
                    .toLowerCase()
                    .startsWith(String(filterValue).toLowerCase())
                : true
            })
          },
        }),
        []
      )

  const defaultColumn = React.useMemo(
      () => ({
        // Let's set up our default Filter UI
        Filter: DefaultColumnFilter,
      }),
      []
    )

  // const [ pageTable, setPageTable] = React.useState(1)

  // Use the state and functions returned from useTable to build your UI
  const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      prepareRow,
      rows, 
      
      // state,
      visibleColumns,
      preGlobalFilteredRows,
      setGlobalFilter,

      state: { filters, globalFilter },

  } = useTable({
          columns,
          data,
          defaultColumn,
          filterTypes,
      },
      useFilters,
      useGlobalFilter
  )

  const info = useContext(PageContext)

  // Render the UI for your table
  return (
    <>
    <span> Found {info.total} rows</span>
    <table {...getTableProps()}>
        <thead>
        {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>
                    {column.render('Header')}
                    <div>{column.canFilter ? column.render('Filter') : null}</div>
                </th>
            ))}
            </tr>
        ))}
        <tr>
            <th
            colSpan={visibleColumns.length}
            style={{
                textAlign: 'left',
            }}
            >
            <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={globalFilter}
                setGlobalFilter={setGlobalFilter}
            />
            </th>
        </tr>
        </thead>
        <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
            prepareRow(row)
            return (
            <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
            </tr>
            )
        })}
        </tbody>
    </table>
    <div className="pagination">
        <button onClick={() => info.setPage(info.page - 1)} disabled={info.page <=  1}>Prev Page</button>  
        &nbsp;Page {info.page} of {info.pages}&nbsp;
        <button onClick={() => info.setPage(info.page + 1)} disabled={info.page >= info.pages}>Next Page</button>
        
        {<select
            value={info.size}
            onChange={e => {
                info.setSize(Number(e.target.value))
                info.setPage(1)
            }}
        >
        {[10, 20, 30, 40, 50].map(size => (
            <option key={size} value={size}>
                Show {size} rows
            </option>
        ))}
        </select> }
    </div>
    <br/>
    <div>
          Pagination:
        <pre>
          <code>{JSON.stringify(info, null, 2)}</code>
        </pre>
    </div>
    <br/>
    <div>
          Filters:
        <pre>
          <code>{JSON.stringify(filters, null, 1)}</code>
        </pre>
    </div>
    </>
  )
}

function filterGreaterThan(rows, id, filterValue) {
    return rows.filter(row => {
        const rowValue = row.values[id]
        return rowValue >= filterValue
    })
}

filterGreaterThan.autoRemove = val => typeof val !== 'number'

function Table({ rows }) {

    rows = rows == null ? [] : rows;

    const cols = [
            {
            Header: 'People',
            columns: [
                {
                    Header: 'ID',
                    accessor: 'id',
                },
                {
                    Header: 'First Name',
                    accessor: 'firstName',
                    filter: 'fuzzyText',
                },
                {
                    Header: 'Last Name',
                    accessor: 'lastName',
                },
                // {
                //     Header: 'Age (Slider)',
                //     accessor: 'age',
                //     Filter: SliderColumnFilter,
                //     filter: 'equals',
                // },
                {
                    Header: 'Age (Number Range)',
                    accessor: 'age',
                    Filter: NumberRangeColumnFilter,
                    filter: 'between',
                },
                // {
                //     Header: 'Age (GreaterThan)',
                //     accessor: 'age',
                //     Filter: SliderColumnFilter,
                //     filter: filterGreaterThan,
                // },
                // {
                //     Header: 'Status',
                //     accessor: 'status',
                //     Filter: SelectColumnFilter,
                //     filter: 'includes',
                // },
            ],
            }
        ]

    const columns = React.useMemo( () => cols, [])

    const data = React.useMemo(() => rows, [])

    return (
        <Styles>
            <TableStructure columns={columns} data={data} />
        </Styles>
    )

}

  export default Table;