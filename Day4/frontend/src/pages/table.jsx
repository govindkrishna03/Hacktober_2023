import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';

function GridTable() {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell> {/* empty cell for top left corner */}
            {[...Array(9)].map((_, index) => (
              <TableCell key={index} align="center">Column {index + 1}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {[...Array(9)].map((_, rowIndex) => (
            <TableRow key={rowIndex}>
              <TableCell component="th" scope="row">Row {rowIndex + 1}</TableCell>
              {[...Array(9)].map((_, colIndex) => (
                <TableCell key={colIndex} align="center" style={{ border: '1px solid black' }}>
                  ({rowIndex + 1}, {colIndex + 1})
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default GridTable;