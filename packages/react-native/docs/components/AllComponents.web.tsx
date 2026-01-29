import React, { useCallback, useEffect, useRef, useState } from 'react';

import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import {
  BellMediumIcon,
  BroadbandMediumIcon,
  CashbackCardMediumIcon,
  ChevronRightMediumIcon,
  EditSmallIcon,
  ElectricityMediumIcon,
  InsuranceMediumIcon,
  MobileMediumIcon,
  ShareSmallIcon,
  TrashSmallIcon,
} from '@utilitywarehouse/hearth-react-native-icons';
// @ts-expect-error - Module missing type declarations
import SpotBillingDark from '@utilitywarehouse/hearth-svg-assets/lib/spot-billing-dark.svg';
// @ts-expect-error - Module missing type declarations
import SpotBillingLight from '@utilitywarehouse/hearth-svg-assets/lib/spot-billing-light.svg';
import { Pressable, ScrollView, View, ViewProps } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import {
  Accordion,
  AccordionItem,
  Alert,
  Avatar,
  Badge,
  Banner,
  BodyText,
  BottomSheet,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
  Box,
  Button,
  Card,
  Carousel,
  CarouselItem,
  Center,
  Checkbox,
  Container,
  CurrencyInput,
  DateInput,
  DatePicker,
  DatePickerInput,
  DateType,
  DescriptionList,
  DescriptionListItem,
  DetailText,
  Divider,
  Expandable,
  ExpandableCard,
  Flex,
  FormField,
  Grid,
  Heading,
  HighlightBanner,
  HighlightBannerImage,
  Icon,
  IconButton,
  IconContainer,
  IndicatorIconButton,
  InlineLink,
  Input,
  LI,
  Link,
  List,
  ListItem,
  Menu,
  MenuItem,
  MenuTrigger,
  Modal,
  OL,
  Pill,
  PillGroup,
  ProgressStep,
  ProgressStepper,
  Radio,
  RadioCard,
  RadioCardGroup,
  RadioGroup,
  SectionHeader,
  Select,
  Skeleton,
  Spinner,
  Switch,
  Tab,
  TabPanel,
  Tabs,
  TabsList,
  Textarea,
  ThemedImage,
  ToastItem,
  ToggleButtonCard,
  ToggleButtonCardGroup,
  UL,
  useColorMode,
  VerificationInput,
} from '../../src';
import { addReactNativePrefix } from '../heplers';

const ComponentWrapper = ({
  name,
  link,
  children,
}: {
  name: string;
  link: string;
  children?: ViewProps['children'];
}) => {
  const navigate = () => {
    let target = link;
    if (
      typeof window !== 'undefined' &&
      window.top?.location.href.includes('hearth.prod.uw.systems/?path=')
    ) {
      target = addReactNativePrefix(link);
    }
    if (window.top) {
      window.top.location.href = target;
    }
  };
  return (
    <View style={styles.component}>
      <View style={styles.componentWrap}>{children}</View>
      <Pressable style={styles.textWrap} onPress={navigate}>
        <BodyText style={styles.text} weight="semibold">
          {name}
        </BodyText>
      </Pressable>
    </View>
  );
};

const AllComponents: React.FC = () => {
  const [selectValue, setSelectValue] = React.useState('1');
  const [toggleButtonValue, setToggleButtonValue] = React.useState('');
  const bottomSheetRef = useRef<BottomSheet>(null);
  const handleOpenPress = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);
  const modalRef = useRef<BottomSheetModalMethods>(null);
  const handleModalOpenPress = useCallback(() => {
    modalRef.current?.present();
  }, []);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selected, setSelected] = useState<DateType>();
  const datePickerRef = useRef<BottomSheetModal>(null);
  const handleDatePickerOpenPress = useCallback(() => {
    datePickerRef.current?.present();
  }, []);
  useEffect(() => {
    if (bottomSheetRef.current) {
      setTimeout(() => {
        bottomSheetRef.current?.expand();
      }, 300);
    }
  }, [bottomSheetRef]);
  useEffect(() => {
    if (modalRef.current) {
      setTimeout(() => {
        modalRef.current?.present();
      }, 400);
    }
  }, [modalRef]);
  useEffect(() => {
    if (datePickerRef.current) {
      setTimeout(() => {
        datePickerRef.current?.present();
      }, 500);
    }
  }, [datePickerRef]);
  const [switchEnabled, setSwitchEnabled] = React.useState(false);
  const toggleSwitch = () => setSwitchEnabled(!switchEnabled);
  const menuRef = useRef<any>(null);
  const handleMenuOpenPress = useCallback(() => {
    menuRef.current?.present();
  }, []);
  const [pillValue, setPillValue] = React.useState<string[]>(['energy', 'mobile']);

  const [colorMode] = useColorMode();
  const isDark = colorMode === 'dark';
  return (
    <div className="sb-unstyled">
      <ScrollView contentContainerStyle={styles.container}>
        <Flex direction="row" wrap="wrap" space="md" style={styles.grid}>
          <ComponentWrapper name="Accordion" link="/?path=/docs/components-accordion--docs">
            <Center flex={1} p="200">
              <Accordion type="single">
                <AccordionItem title="Accordion Item 1">
                  <BodyText>Accordion Item 1 Content</BodyText>
                </AccordionItem>
                <AccordionItem title="Accordion Item 2">
                  <BodyText>Accordion Item 2 Content</BodyText>
                </AccordionItem>
              </Accordion>
            </Center>
          </ComponentWrapper>
          <ComponentWrapper name="Alert" link="/?path=/docs/components-alert--docs">
            <Center flex={1}>
              <Alert text="This is an alert" />
            </Center>
          </ComponentWrapper>
          <ComponentWrapper name="Avatar" link="/?path=/docs/components-avatar--docs">
            <Center flex={1} gap="200">
              <Avatar name="John Doe" />
            </Center>
          </ComponentWrapper>
          <ComponentWrapper name="Badge" link="/?path=/docs/components-badge--docs">
            <Center gap="200" flex={1}>
              <View>
                <Badge>This is a badge</Badge>
              </View>
              <View>
                <Badge colorScheme="danger">This is a red badge</Badge>
              </View>
            </Center>
          </ComponentWrapper>
          <ComponentWrapper name="Banner" link="/?path=/docs/components-banner--docs">
            <Center flex={1} p="200">
              <Banner
                icon={ElectricityMediumIcon}
                iconContainerColor="energy"
                heading="I'm a Banner"
                description="This is a banner description"
              />
            </Center>
          </ComponentWrapper>
          <ComponentWrapper name="Body Text" link="/?path=/docs/typography-body-text--docs">
            <Center flex={1}>
              <BodyText>This is some Body Text</BodyText>
            </Center>
          </ComponentWrapper>
          <ComponentWrapper name="Bottom Sheet" link="/?path=/docs/components-bottom-sheet--docs">
            <Center flex={1}>
              <Button onPress={handleOpenPress}>Open Bottom Sheet</Button>
              <BottomSheet ref={bottomSheetRef} index={1}>
                <BottomSheetView>
                  <Box gap="200">
                    <BodyText>This is a bottom sheet with content.</BodyText>
                    <Button onPress={() => bottomSheetRef.current?.close()}>
                      Close Bottom Sheet
                    </Button>
                  </Box>
                </BottomSheetView>
              </BottomSheet>
            </Center>
          </ComponentWrapper>
          <ComponentWrapper name="Box" link="/?path=/docs/primitives-box--docs">
            <Center flex={1}>
              <Box backgroundColor="grey900" padding="300" width={200} height={100}>
                <BodyText color={isDark ? 'grey100' : 'white'} weight="semibold">
                  This is a Box
                </BodyText>
              </Box>
            </Center>
          </ComponentWrapper>
          <ComponentWrapper name="Button" link="/?path=/docs/components-button--docs">
            <Center flex={1}>
              <Button colorScheme="highlight" variant="emphasis" onPress={() => null}>
                Press me
              </Button>
            </Center>
          </ComponentWrapper>
          <ComponentWrapper name="Card" link="/?path=/docs/components-card--docs">
            <Center flex={1}>
              <Card colorScheme="neutralStrong">
                <Heading>I am a card</Heading>
                <BodyText>And do card stuff.</BodyText>
              </Card>
            </Center>
          </ComponentWrapper>
          <ComponentWrapper name="Carousel" link="/?path=/docs/components-carousel--docs">
            <Center flex={1}>
              <Carousel itemWidth={150} centered width={150}>
                <CarouselItem>
                  <Box
                    backgroundColor="blue700"
                    width={150}
                    height={100}
                    px="100"
                    borderRadius="md"
                  >
                    <Center flex={1}>
                      <BodyText color="white" textAlign="center">
                        I'm a carousel item
                      </BodyText>
                    </Center>
                  </Box>
                </CarouselItem>
                <CarouselItem>
                  <Box
                    backgroundColor="purple700"
                    width={150}
                    height={100}
                    px="100"
                    borderRadius="md"
                  >
                    <Center flex={1}>
                      <BodyText color="white" textAlign="center">
                        I'm another carousel item
                      </BodyText>
                    </Center>
                  </Box>
                </CarouselItem>
                <CarouselItem>
                  <Box
                    backgroundColor="green700"
                    width={150}
                    height={100}
                    px="100"
                    borderRadius="md"
                  >
                    <Center flex={1}>
                      <BodyText color="white" textAlign="center">
                        I'm also a carousel item
                      </BodyText>
                    </Center>
                  </Box>
                </CarouselItem>
              </Carousel>
            </Center>
          </ComponentWrapper>
          <ComponentWrapper name="Center" link="/?path=/docs/primitives-center--docs">
            <Center flex={1}>
              <Center backgroundColor="red400" padding="300" width={200} height={100}>
                <BodyText color={isDark ? 'grey1000' : 'white'} weight="semibold">
                  I am in the Center
                </BodyText>
              </Center>
            </Center>
          </ComponentWrapper>

          <ComponentWrapper name="Checkbox" link="/?path=/docs/forms-checkbox--docs">
            <Center flex={1}>
              <View>
                <Checkbox label="I'm a Checkbox" value="" />
              </View>
            </Center>
          </ComponentWrapper>
          <ComponentWrapper name="Container" link="/?path=/docs/primitives-container--docs">
            <Container space="md" backgroundColor="backgroundSecondary">
              <Box h={20} bg="blue300" />
              <Box h={20} bg="blue400" />
              <Box h={20} bg="blue500" />
            </Container>
          </ComponentWrapper>
          <ComponentWrapper name="Currency Input" link="/?path=/docs/forms-currency-input--docs">
            <Center flex={1} padding="200">
              <CurrencyInput />
            </Center>
          </ComponentWrapper>
          <ComponentWrapper name="Date Input" link="/?path=/docs/forms-date-input--docs">
            <Center flex={1} padding="200">
              <DateInput />
            </Center>
          </ComponentWrapper>
          <ComponentWrapper name="Date Picker" link="/?path=/docs/components-date-picker--docs">
            <Center flex={1}>
              <Button onPress={handleDatePickerOpenPress}>Open Date Picker</Button>
              <BottomSheetModalProvider>
                <DatePicker
                  ref={datePickerRef}
                  mode="single"
                  date={selected}
                  onChange={({ date }) => setSelected(date)}
                  onCancel={() => setSelected(undefined)}
                />
              </BottomSheetModalProvider>
            </Center>
          </ComponentWrapper>
          <ComponentWrapper
            name="Date Picker Input"
            link="/?path=/docs/forms-date-picker-input--docs"
          >
            <Center flex={1} padding="200">
              <BottomSheetModalProvider>
                <DatePickerInput placeholder="DD/MM/YYYY" />
              </BottomSheetModalProvider>
            </Center>
          </ComponentWrapper>
          <ComponentWrapper
            name="Description List"
            link="/?path=/docs/components-description-list--docs"
          >
            <Center flex={1} padding="200">
              <DescriptionList>
                <DescriptionListItem heading="This is a" description="Description list" />
                <DescriptionListItem heading="So is this" description="12-34-56" />
              </DescriptionList>
            </Center>
          </ComponentWrapper>
          <ComponentWrapper name="Detail Text" link="/?path=/docs/typography-detail-text--docs">
            <Center flex={1}>
              <DetailText>This is some Detail Text</DetailText>
            </Center>
          </ComponentWrapper>

          <ComponentWrapper name="Divider" link="/?path=/docs/components-divider--docs">
            <Center flex={1} p="300">
              <BodyText>This text is divided</BodyText>
              <Divider space="sm" />
              <BodyText>From this text</BodyText>
            </Center>
          </ComponentWrapper>

          <ComponentWrapper
            name="Expandable"
            link="/?path=/docs/utility-components-expandable--docs"
          >
            <Center flex={1} p="200">
              <Box width={240} gap="100">
                <Button onPress={() => setIsExpanded(!isExpanded)}>
                  {isExpanded ? 'Collapse' : 'Expand'}
                </Button>
                <Expandable expanded={isExpanded} accessibilityLabel="Expandable content section">
                  <Card>
                    <BodyText>This content expands and collapses</BodyText>
                  </Card>
                </Expandable>
              </Box>
            </Center>
          </ComponentWrapper>

          <ComponentWrapper
            name="Expandable Card"
            link="/?path=/docs/components-expandable-card--docs"
          >
            <Center flex={1} p="200">
              <ExpandableCard
                heading="This is an"
                helperText="Expandable Card component"
                leadingIcon={ElectricityMediumIcon}
                expandedContent={
                  <>
                    <BodyText>I'm expanding</BodyText>
                    <BodyText>to show more content</BodyText>
                  </>
                }
                style={{ width: 240 }}
              />
            </Center>
          </ComponentWrapper>

          <ComponentWrapper name="Flex" link="/?path=/docs/primitives-flex--docs">
            <Center flex={1}>
              <Flex direction="row" space="md">
                <Box w={40} h={40} bg="blue300" />
                <Box w={40} h={40} bg="blue400" />
                <Box w={40} h={40} bg="blue500" />
                <Box w={40} h={40} bg="blue600" />
              </Flex>
            </Center>
          </ComponentWrapper>
          <ComponentWrapper name="Form Field" link="/?path=/docs/forms-form-field--docs">
            <Center flex={1}>
              <FormField
                validationStatus="invalid"
                label="This is a form field"
                validText="Valid form field text"
                invalidText="And an invalid error message"
              >
                <Input onChange={() => console.log('###')} placeholder="" />
              </FormField>
            </Center>
          </ComponentWrapper>
          <ComponentWrapper name="Grid" link="/?path=/docs/primitives-grid--docs">
            <Center flex={1}>
              <Box width={100}>
                <Grid columns={2} space="md">
                  <Box w={40} h={40} bg="blue300" />
                  <Box w={40} h={40} bg="blue400" />
                  <Box w={40} h={40} bg="blue500" />
                  <Box w={40} h={40} bg="blue600" />
                </Grid>
              </Box>
            </Center>
          </ComponentWrapper>
          <ComponentWrapper name="Heading" link="/?path=/docs/typography-heading--docs">
            <Center flex={1}>
              <Heading>This is a Heading</Heading>
            </Center>
          </ComponentWrapper>
          <ComponentWrapper
            name="Highlight Banner"
            link="/?path=/docs/components-highlight-banner--docs"
          >
            <Center flex={1} p="200">
              <HighlightBanner
                heading="Featured Content"
                headingColor="energy"
                imageContainerHeight={40}
                image={
                  <HighlightBannerImage
                    source={{
                      uri: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80',
                    }}
                  />
                }
                description="Banner description goes here."
              />
            </Center>
          </ComponentWrapper>
          <ComponentWrapper
            name="Indicator Icon Button"
            link="/?path=/docs/components-indicator-icon-button--docs"
          >
            <Center flex={1}>
              <IndicatorIconButton icon={BellMediumIcon} onPress={() => null} indicator={true} />
            </Center>
          </ComponentWrapper>
          <ComponentWrapper name="Icon Button" link="/?path=/docs/components-icon-button--docs">
            <Center flex={1}>
              <IconButton icon={ChevronRightMediumIcon} size="md" onPress={() => null} />
            </Center>
          </ComponentWrapper>
          <ComponentWrapper
            name="Icon Container"
            link="/?path=/docs/components-icon-container--docs"
          >
            <Center flex={1}>
              <Flex direction="row" space="sm">
                <IconContainer
                  icon={ElectricityMediumIcon}
                  size="sm"
                  variant="emphasis"
                  color="energy"
                />
                <IconContainer
                  icon={BroadbandMediumIcon}
                  size="sm"
                  variant="emphasis"
                  color="broadband"
                />
                <IconContainer
                  icon={MobileMediumIcon}
                  size="sm"
                  variant="emphasis"
                  color="mobile"
                />
                <IconContainer
                  icon={InsuranceMediumIcon}
                  size="sm"
                  variant="emphasis"
                  color="insurance"
                />
                <IconContainer
                  icon={CashbackCardMediumIcon}
                  size="sm"
                  variant="emphasis"
                  color="cashback"
                />
              </Flex>
            </Center>
          </ComponentWrapper>

          <ComponentWrapper name="Icons" link="/?path=/docs/components-icons--docs">
            <Center flex={1}>
              <Flex direction="row" space="lg">
                <Icon as={ElectricityMediumIcon} color="energyBlue700" />
                <Icon as={MobileMediumIcon} color="mobileRose700" />
                <Icon as={BroadbandMediumIcon} color="broadbandGreen700" />
                <Icon as={InsuranceMediumIcon} color="insuranceOrange700" />
              </Flex>
            </Center>
          </ComponentWrapper>
          <ComponentWrapper
            name="Inline Link"
            link="/?path=/docs/utility-components-inline-link--docs"
          >
            <Center flex={1}>
              <InlineLink href="https://www.utilitywarehouse.co.uk" target="_blank">
                This is an inline link
              </InlineLink>
            </Center>
          </ComponentWrapper>
          <ComponentWrapper name="Input" link="/?path=/docs/forms-input--docs">
            <Center flex={1}>
              <Input placeholder="This is an input" />
            </Center>
          </ComponentWrapper>
          <ComponentWrapper name="Link" link="/?path=/docs/components-link--docs">
            <Center flex={1}>
              <Link href="https://www.utilitywarehouse.co.uk" target="_blank">
                This is a link
              </Link>
            </Center>
          </ComponentWrapper>
          <ComponentWrapper name="List" link="/?path=/docs/components-list--docs">
            <Center flex={1} p="300">
              <List>
                <ListItem heading="List Item 1" onPress={() => console.log('item pressed')} />
                <ListItem heading="List Item 2" onPress={() => console.log('item pressed')} />
              </List>
            </Center>
          </ComponentWrapper>
          <ComponentWrapper name="Menu" link="/?path=/docs/components-menu--docs">
            <Center flex={1}>
              <BottomSheetModalProvider>
                <MenuTrigger onPress={handleMenuOpenPress}>
                  <Button>Open Menu</Button>
                </MenuTrigger>
                <Menu ref={menuRef} heading="Actions">
                  <MenuItem icon={EditSmallIcon} text="Edit" onPress={() => console.log('Edit')} />
                  <MenuItem
                    icon={ShareSmallIcon}
                    text="Share"
                    onPress={() => console.log('Share')}
                  />
                  <MenuItem
                    icon={TrashSmallIcon}
                    text="Delete"
                    colorScheme="destructive"
                    onPress={() => console.log('Delete')}
                  />
                </Menu>
              </BottomSheetModalProvider>
            </Center>
          </ComponentWrapper>
          <ComponentWrapper name="Modal" link="/?path=/docs/components-modal--docs">
            <Center flex={1}>
              <Button onPress={handleModalOpenPress}>Open Modal</Button>
              <BottomSheetModalProvider>
                <Modal
                  ref={modalRef}
                  heading="This is a Modal"
                  description="This is a modal description"
                  primaryButtonText="Primary"
                  secondaryButtonText="Close"
                  index={0}
                />
              </BottomSheetModalProvider>
            </Center>
          </ComponentWrapper>
          <ComponentWrapper
            name="Ordered List"
            link="/?path=/docs/utility-components-ul-ol-lists--docs"
          >
            <Center flex={1}>
              <OL>
                <LI>
                  <BodyText>List Item 1</BodyText>
                </LI>
                <LI>
                  <BodyText>List Item 2</BodyText>
                </LI>
              </OL>
            </Center>
          </ComponentWrapper>
          <ComponentWrapper name="Pill Group" link="/?path=/docs/components-pill-group--docs">
            <Center flex={1} p="200">
              (
              <PillGroup
                value={pillValue}
                onChange={v => setPillValue(v as string[])}
                wrap={false}
                multiple
              >
                <Pill value="all" label="All" />
                <Pill value="energy" label="Energy" icon={ElectricityMediumIcon} />
                <Pill value="broadband" label="Broadband" icon={BroadbandMediumIcon} />
                <Pill value="mobile" label="Mobile" icon={MobileMediumIcon} />
              </PillGroup>
              );
            </Center>
          </ComponentWrapper>
          <ComponentWrapper
            name="Progress Stepper"
            link="/?path=/docs/components-progress-stepper--docs"
          >
            <Center flex={1} px="300">
              <ProgressStepper>
                <ProgressStep id="customer-data" status="complete" />
                <ProgressStep id="shipping-data" status="complete" />
                <ProgressStep id="payment-data" status="active" />
                <ProgressStep id="summary" status="incomplete" />
              </ProgressStepper>
            </Center>
          </ComponentWrapper>
          <ComponentWrapper name="Radio" link="/?path=/docs/forms-radio--docs">
            <Center flex={1}>
              <RadioGroup>
                <Radio label="I'm a Radio" value="1" />
                <Radio label="Me too" value="2" />
              </RadioGroup>
            </Center>
          </ComponentWrapper>
          <ComponentWrapper name="Radio Card" link="/?path=/docs/components-radio-card--docs">
            <Center flex={1}>
              <RadioCardGroup aria-label="Select Tariff" nativeID="RadioCard-group">
                <RadioCard
                  value="fixed"
                  aria-label="Debit Card Payment"
                  label="I'm a Radio Card"
                ></RadioCard>
              </RadioCardGroup>
            </Center>
          </ComponentWrapper>
          <ComponentWrapper
            name="Section Header"
            link="/?path=/docs/components-section-header--docs"
          >
            <Center flex={1} p="300">
              <SectionHeader
                heading="Heading"
                helperText="Supporting text"
                trailingContent={<Link href="#">More</Link>}
              />
            </Center>
          </ComponentWrapper>
          <ComponentWrapper name="Select" link="/?path=/docs/forms-select--docs">
            <Center flex={1}>
              <BottomSheetModalProvider>
                <Select
                  label="Choose an option"
                  placeholder="Select an option"
                  options={[
                    { label: 'Option 1', value: '1' },
                    { label: 'Option 2', value: '2' },
                    { label: 'Option 3', value: '3' },
                  ]}
                  value={selectValue}
                  onValueChange={setSelectValue}
                />
              </BottomSheetModalProvider>
            </Center>
          </ComponentWrapper>
          <ComponentWrapper name="Skeleton" link="/?path=/docs/components-skeleton--docs">
            <Center flex={1}>
              <Flex direction="row" space="sm">
                <Skeleton width={30} height={30} />
                <Flex space="sm">
                  <Skeleton width={120} height={15} />
                  <Skeleton width={100} height={15} />
                </Flex>
              </Flex>
            </Center>
          </ComponentWrapper>
          <ComponentWrapper name="Spinner" link="/?path=/docs/components-spinner--docs">
            <Center flex={1}>
              <Spinner size="lg" />
            </Center>
          </ComponentWrapper>
          <ComponentWrapper name="Switch" link="/?path=/docs/components-switch--docs">
            <Center flex={1}>
              <Switch value={switchEnabled} onValueChange={toggleSwitch} />
            </Center>
          </ComponentWrapper>
          <ComponentWrapper name="Tabs" link="/?path=/docs/components-tabs--docs">
            <Center flex={1}>
              <Tabs defaultValue="tab-1">
                <TabsList>
                  <Tab value="tab-1">Tab 1</Tab>
                  <Tab value="tab-2">Tab 2</Tab>
                  <Tab value="tab-3">Tab 3</Tab>
                </TabsList>
                <TabPanel value="tab-1">
                  <BodyText>I'm the first tab's content</BodyText>
                </TabPanel>
                <TabPanel value="tab-2">
                  <BodyText>I'm the second tab's content</BodyText>
                </TabPanel>
                <TabPanel value="tab-3">
                  <BodyText>I'm the third tab's content</BodyText>
                </TabPanel>
              </Tabs>
            </Center>
          </ComponentWrapper>
          <ComponentWrapper name="Textarea" link="/?path=/docs/forms-textarea--docs">
            <Center flex={1}>
              <Textarea numberOfLines={3} placeholder="This is a textarea" />
            </Center>
          </ComponentWrapper>
          <ComponentWrapper
            name="Themed Image"
            link="/?path=/docs/utility-components-themed-image--docs"
          >
            <Center flex={1} p="300">
              <ThemedImage
                light={<SpotBillingLight width={160} height={160} />}
                dark={<SpotBillingDark width={160} height={160} />}
              />
            </Center>
          </ComponentWrapper>
          <ComponentWrapper name="Toast" link="/?path=/docs/components-toast--docs">
            <Center flex={1} p="200">
              <ToastItem
                onClose={() => {}}
                toast={{ id: 'tst', text: "I'm a toast", duration: 0 }}
              />
            </Center>
          </ComponentWrapper>
          <ComponentWrapper
            name="Toggle Button Card"
            link="/?path=/docs/components-toggle-button-card--docs"
          >
            <Center flex={1}>
              <ToggleButtonCardGroup
                aria-label="Select Tariff"
                value={toggleButtonValue}
                onChange={setToggleButtonValue}
                nativeID="ToggleButtonCard-group"
              >
                <ToggleButtonCard value="1" label="Toggle me" gap="200">
                  <BodyText size="md">I'm a toggle button card</BodyText>
                </ToggleButtonCard>
              </ToggleButtonCardGroup>
            </Center>
          </ComponentWrapper>

          <ComponentWrapper
            name="Unorderd List"
            link="/?path=/docs/utility-components-ul-ol-lists--docs"
          >
            <Center flex={1}>
              <UL>
                <LI>
                  <BodyText>List Item 1</BodyText>
                </LI>
                <LI>
                  <BodyText>List Item 2</BodyText>
                </LI>
              </UL>
            </Center>
          </ComponentWrapper>
          <ComponentWrapper
            name="Verification Input"
            link="/?path=/docs/forms-verificationinput--docs"
          >
            <Center flex={1} padding="200">
              <VerificationInput onChangeText={() => {}} />
            </Center>
          </ComponentWrapper>
        </Flex>
      </ScrollView>
    </div>
  );
};

const styles = StyleSheet.create(theme => ({
  container: {},
  grid: {
    _web: {
      display: 'grid',
      gridTemplateColumns: {
        xs: '1fr',
        md: 'repeat(3, 1fr)',
        lg: 'repeat(auto-fit, minmax(300px, 1fr))',
      },
      gap: theme.space['200'],
    },
  },
  component: {
    borderColor: theme.color.warmWhite[300],
    borderWidth: theme.borderWidth['1'],
    borderRadius: theme.borderRadius['lg'],
    overflow: 'hidden',
    flexGrow: 1,
    height: 200,
    flexBasis: {
      xs: '100%',
      md: 300,
    },
  },
  componentWrap: {
    flexGrow: 1,
    flex: 1,
  },
  text: {},
  textWrap: {
    borderTopColor: theme.color.warmWhite[300],
    borderTopWidth: theme.borderWidth['1'],
    paddingHorizontal: theme.space['200'],
    paddingVertical: theme.space['100'],
    backgroundColor: theme.color.warmWhite[100],
    _web: {
      _hover: {
        backgroundColor: theme.color.warmWhite[200],
      },
    },
  },
}));

export default AllComponents;
