import { RootState } from '../ddadda';
import { defaultAsync } from '../ddadda/actions';
import { useSelector, useDispatch } from 'react-redux';

export default function useDefault() {
  const dispatch = useDispatch();
  const defaultData = useSelector((state: RootState) => state.defaultData.default);

  const onDefaultData = () => dispatch(defaultAsync.request());

  return { defaultData, onDefaultData };
}
