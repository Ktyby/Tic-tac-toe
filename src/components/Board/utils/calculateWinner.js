import { LINES } from '../constants';

const calculateWinner = (squares) => {
  const [ winner ] = LINES.filter(([ a, b, c ]) => squares[ a ] && squares[ a ] === squares[ b ] && squares[ a ] === squares[ c ]);

  return winner || null;
}

export default calculateWinner;
