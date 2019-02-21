import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import TablePaginationActions from './TablePaginationActions';
import {mockData} from './mockData';

let counter = 0;
function createData(name, language, rating, duration, trailerURL) {
  counter += 1;
  return { id: counter, name, language, rating, duration, trailerURL };
}

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 500,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: 'darkgray',
    color: 'black',
    marginRight: theme.spacing.unit * 2,
    margin: '20px',
    width: '80%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: '40%',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
});

class PaginationComponent extends React.Component {
  state = {
    rows: mockData.movies.map((data) => createData(data.name,data.language,data.rating, data.duration, data.trailerURL))
    .sort((a, b) => (a.rating > b.rating ? -1 : 1)),
    page: 0,
    rowsPerPage: 5,
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { rows, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
          <div className={classes.search}>
          <div className={classes.searchIcon}>
                <SearchIcon />
          </div>
             <InputBase
                placeholder="Search by name…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                onChange={this.searchMovie.bind(this)}
          />
        </div>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
              <TableHead>
                <TableRow>
                    <TableCell align="left"><h1>Movie Name</h1></TableCell>
                    <TableCell align="left"><h1>Rating</h1></TableCell>
                    <TableCell align="left"><h1>Language</h1></TableCell>
                    <TableCell align="left"><h1>Duration</h1></TableCell>
                    <TableCell align="left"><h1>Trailer</h1></TableCell>
                </TableRow>
                </TableHead>
            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="left">{row.rating}</TableCell>
                  <TableCell align="left">{row.language}</TableCell>
                  <TableCell align="left">{row.duration ? row.duration : '-'}</TableCell>
                  <TableCell align="left">
                      <a href={row.trailerURL} target='blank'> {row.trailerURL? 'Watch trailer' : '-'} </a>
                  </TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 48 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  colSpan={3}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    native: true,
                  }}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </Paper>
    );
  }
  searchMovie(e) {
        let searchTerm = e.target.value;
        let searchedMovies = mockData.movies.filter((movie)=> movie.name
        .toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
        this.setState({
            rows: searchedMovies.map((data) => createData(data.name,data.language,data.rating, data.duration, data.trailerURL))
                    .sort((a, b) => (a.rating > b.rating ? -1 : 1)),
        });
    }
}

PaginationComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PaginationComponent);
