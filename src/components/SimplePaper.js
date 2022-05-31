import * as React from 'react';
import Paper from '@mui/material/Paper';
import styles from "./SimplePaper.module.css";

export default function SimplePaper(props) {
  const { children } = props;
  return (
    <Paper className={styles.simplepaper} elevation={3}>
      {children}
    </Paper>
  );
}


