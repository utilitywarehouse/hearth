import { Meta, StoryObj } from '@storybook/react-native';
import { useRef } from 'react';
import { ImageSourcePropType, Platform, View } from 'react-native';
import { Modal, ModalImage } from '.';
import pigs from '../../../docs/assets/pigs.png';
import { ViewWrap } from '../../../docs/components';
import { BottomSheetModal } from '../BottomSheet';
import { Button } from '../Button';

const meta: Meta<typeof ModalImage> = {
  title: 'Stories / ModalImage',
  component: ModalImage,
};

export default meta;
type Story = StoryObj<typeof ModalImage>;

export const Playground: Story = {
  render: () => {
    const modalRef = useRef<BottomSheetModal>(null);

    const openModal = () => {
      modalRef.current?.present();
    };

    return (
      <View style={Platform.OS === 'web' ? { width: 400, height: 400 } : {}}>
        <ViewWrap>
          <Button onPress={openModal}>Open Modal</Button>

          <Modal
            ref={modalRef}
            heading="Modal Heading"
            description="This is a modal description"
            index={1}
            image={<ModalImage source={pigs as ImageSourcePropType} resizeMode="contain" />}
          />
        </ViewWrap>
      </View>
    );
  },
};
