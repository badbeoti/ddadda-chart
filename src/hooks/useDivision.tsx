import { RootState } from '../ddadda';
import { selectDivision } from '../ddadda/actions';
import { useSelector, useDispatch } from 'react-redux';

export default function useDivision() {
  const dispatch = useDispatch();
  const divisionList = useSelector((state: RootState) => state.selectDivision.default.data);

  const onDivisionList = () => dispatch(selectDivision());

  return { divisionList, onDivisionList };
}
