import { Path, Svg } from 'react-native-svg';
import { createIcon } from '../Icon/createIcon';

/**
 * A filled circle icon, used as the selected-state indicator in `Radio` and `RadioCard`. Takes the current
 * text colour.
 */
const CircleIcon = createIcon({
  Root: Svg,
  viewBox: '0 0 24 24',
  path: (
    <Path
      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
});

CircleIcon.displayName = 'CircleIcon';

export default CircleIcon;
