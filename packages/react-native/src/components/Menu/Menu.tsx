import { forwardRef, useCallback, useImperativeHandle, useMemo, useRef } from 'react';
import { StyleSheet } from 'react-native-unistyles';
import { BodyText } from '../BodyText';
import { BottomSheetModal, BottomSheetScrollView } from '../BottomSheet';
import { MenuContext } from './Menu.context';
import type MenuProps from './Menu.props';
import type { MenuMethods } from './Menu.props';

const Menu = forwardRef<MenuMethods, MenuProps>(({ heading, children, ...props }, ref) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  useImperativeHandle(
    ref,
    () => ({
      present: () => bottomSheetModalRef.current?.present(),
      dismiss: () => bottomSheetModalRef.current?.dismiss(),
    }),
    []
  );

  const handleClose = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  const contextValue = useMemo(() => ({ close: handleClose }), [handleClose]);

  return (
    <BottomSheetModal ref={bottomSheetModalRef} {...props}>
      <BottomSheetScrollView contentContainerStyle={styles.container}>
        <MenuContext.Provider value={contextValue}>
          {heading && (
            <BodyText size="md" weight="semibold">
              {heading}
            </BodyText>
          )}
          {children}
        </MenuContext.Provider>
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
});

Menu.displayName = 'Menu';

const styles = StyleSheet.create(theme => ({
  container: {
    gap: theme.components.bottomSheet.gap,
  },
}));

export default Menu;
