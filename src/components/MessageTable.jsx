import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function BasicTable({ messages }) {
  const classes = useStyles();

  const messagesToRows = messages => {
    const priority1 = messages.filter(message => message.priority === 1);
    const priority2 = messages.filter(message => message.priority === 2);
    const priority3 = messages.filter(message => message.priority === 3);

    const rowCount = [
      priority1.length,
      priority2.length,
      priority3.length,
    ].sort()[2];

    const rows = [];

    for (let row = 0; row < rowCount; row++) {
      rows[row] = {
        priority1: priority1[row],
        priority2: priority2[row],
        priority3: priority3[row],
      };
    }

    return rows;
  };

  const rows = messagesToRows(messages);

  const priority1 = messages.filter(message => message.priority === 1);
  const priority2 = messages.filter(message => message.priority === 2);
  const priority3 = messages.filter(message => message.priority === 3);

  const prio1Count = priority1.length;
  const prio2Count = priority2.length;
  const prio3Count = priority3.length;

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">
              Error Type 1 <br />
              {prio1Count}
            </TableCell>
            <TableCell align="left">
              Warning Type 2 <br />
              {prio2Count}
            </TableCell>
            <TableCell align="left">
              Info Type 3 <br />
              {prio3Count}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.name}>
              <TableCell align="left">
                {row.priority1 ? (
                  <Alert severity="error">
                    {row.priority1 ? row.priority1.message : undefined}
                  </Alert>
                ) : (
                  ""
                )}
              </TableCell>
              <TableCell align="left">
                {row.priority2 ? (
                  <Alert severity="warning">
                    {row.priority2 ? row.priority2.message : undefined}
                  </Alert>
                ) : (
                  ""
                )}
              </TableCell>
              <TableCell align="left">
                {row.priority3 ? (
                  <Alert severity="success">
                    {row.priority3 ? row.priority3.message : undefined}
                  </Alert>
                ) : (
                  ""
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
