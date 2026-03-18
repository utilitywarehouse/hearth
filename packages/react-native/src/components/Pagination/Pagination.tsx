import {
  ChevronLeftSmallIcon,
  ChevronRightSmallIcon,
  SkipFirstSmallIcon,
  SkipLastSmallIcon,
} from '@utilitywarehouse/hearth-react-native-icons';
import { ComponentType, useState } from 'react';
import { Pressable, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { BodyText } from '../BodyText';
import { UnstyledIconButton } from '../UnstyledIconButton';
import type PaginationProps from './Pagination.props';
import { ELLIPSIS, generatePageNumbers } from './Pagination.utils';

interface PaginationItemProps {
  label: number;
  selected?: boolean;
  onPress: () => void;
}

const PaginationItem = ({ label, selected = false, onPress }: PaginationItemProps) => {
  const [isFocused, setIsFocused] = useState(false);

  styles.useVariants({ selected });

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Go to page ${label}`}
      accessibilityState={{ selected }}
      onBlur={() => setIsFocused(false)}
      onFocus={() => setIsFocused(true)}
      onPress={onPress}
      style={({ pressed }) => [
        styles.pageItem,
        pressed && !selected && styles.pageItemPressed,
        isFocused && styles.pageItemFocused,
      ]}
    >
      <BodyText size="md" style={styles.pageItemText}>
        {label}
      </BodyText>
    </Pressable>
  );
};

const PaginationArrowButton = ({
  accessibilityLabel,
  disabled,
  icon,
  onPress,
}: {
  accessibilityLabel: string;
  disabled: boolean;
  icon: ComponentType;
  onPress: () => void;
}) => {
  return (
    <UnstyledIconButton
      accessibilityLabel={accessibilityLabel}
      disabled={disabled}
      icon={icon}
      onPress={onPress}
      size="sm"
      style={styles.arrowButton}
    />
  );
};

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  condensed = false,
  hideSkipButtons = false,
  style,
  ...props
}: PaginationProps) => {
  const pages = generatePageNumbers(currentPage, totalPages);

  const handleFirst = () => {
    if (currentPage !== 1) {
      onPageChange(1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handleLast = () => {
    if (currentPage !== totalPages) {
      onPageChange(totalPages);
    }
  };

  return (
    <View accessibilityLabel="Pagination" style={[styles.container, style]} {...props}>
      <View style={styles.controllers}>
        {!hideSkipButtons ? (
          <PaginationArrowButton
            accessibilityLabel="Go to first page"
            disabled={currentPage === 1}
            icon={SkipFirstSmallIcon}
            onPress={handleFirst}
          />
        ) : null}
        <PaginationArrowButton
          accessibilityLabel="Go to previous page"
          disabled={currentPage === 1}
          icon={ChevronLeftSmallIcon}
          onPress={handlePrevious}
        />
      </View>

      {condensed ? (
        <BodyText size="md">
          Page {currentPage} of {totalPages}
        </BodyText>
      ) : (
        <View style={styles.pages}>
          {pages.map((page, index) => {
            if (page === ELLIPSIS) {
              return (
                <BodyText key={`ellipsis-${index}`} size="md" style={styles.ellipsis}>
                  {ELLIPSIS}
                </BodyText>
              );
            }

            return (
              <PaginationItem
                key={page}
                label={page}
                onPress={() => onPageChange(page)}
                selected={page === currentPage}
              />
            );
          })}
        </View>
      )}

      <View style={styles.controllers}>
        <PaginationArrowButton
          accessibilityLabel="Go to next page"
          disabled={currentPage === totalPages}
          icon={ChevronRightSmallIcon}
          onPress={handleNext}
        />
        {!hideSkipButtons ? (
          <PaginationArrowButton
            accessibilityLabel="Go to last page"
            disabled={currentPage === totalPages}
            icon={SkipLastSmallIcon}
            onPress={handleLast}
          />
        ) : null}
      </View>
    </View>
  );
};

PaginationItem.displayName = 'PaginationItem';
Pagination.displayName = 'Pagination';

const styles = StyleSheet.create(theme => ({
  container: {
    width: '100%',
    minHeight: theme.components.pagination.item.height,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.components.pagination.gap,
  },
  controllers: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.components.pagination.gap,
  },
  arrowButton: {
    width: theme.components.pagination.item.width,
    height: theme.components.pagination.item.height,
  },
  pages: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: theme.components.pagination.gap,
  },
  pageItem: {
    width: theme.components.pagination.item.width,
    height: theme.components.pagination.item.height,
    borderRadius: theme.components.pagination.item.radius,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    _web: {
      _hover: {
        backgroundColor: theme.color.interactive.functional.surface.subtle.hover,
      },
    },
    variants: {
      selected: {
        true: {
          backgroundColor: theme.color.interactive.brand.surface.strong.default,
        },
      },
    },
  },
  pageItemPressed: {
    backgroundColor: theme.color.interactive.functional.surface.subtle.active,
  },
  pageItemFocused: {
    outlineWidth: 2,
    outlineOffset: -2,
    outlineColor: theme.color.border.strong,
    outlineStyle: 'solid',
  },
  pageItemText: {
    variants: {
      selected: {
        true: {
          color: theme.color.text.inverted,
        },
        false: {
          color: theme.color.text.primary,
        },
      },
    },
  },
  ellipsis: {
    minWidth: theme.components.pagination.item.width,
    textAlign: 'center',
    color: theme.color.text.primary,
  },
}));

export default Pagination;
