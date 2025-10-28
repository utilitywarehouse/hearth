import type { ViewProps } from 'react-native';

interface ListProps extends ViewProps {
  container?: 'none' | 'subtleWhite' | 'emphasisWhite' | 'subtleWarmWhite' | 'emphasisWarmWhite';
  heading?: string;
  helperText?: string;
  headerTrailingContent?: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
}

export default ListProps;
