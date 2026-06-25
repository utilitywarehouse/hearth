# Modal

A `Modal` overlays content to request a decision or inform users of important information. When
users need to interact with the application without navigating to a new page or disrupting their
workflow, a `Modal` creates a floating layer over the current page to gather feedback or display
information.

- [Usage Guidelines](#usage-guidelines)
- [Content](#content)
- [Accessibility](#accessibility)
- [Uncontrolled usage](#uncontrolled-usage)
- [Controlled usage](#controlled-usage)
- [With Image](#with-image)
- [Loading](#loading)
- [Preventing dismissal](#preventing-dismissal)
- [API](#api)

```tsx
<ModalRoot>
  <ModalTrigger>
    <Button>Open modal</Button>
  </ModalTrigger>
  <Modal {...args}>
    <ModalFooter>
      <ModalClose>
        <Button variant="ghost" colorScheme="functional">
          Cancel
        </Button>
      </ModalClose>
      <ModalClose>
        <Button variant="solid" colorScheme="highlight">
          Primary
        </Button>
      </ModalClose>
    </ModalFooter>
  </Modal>
</ModalRoot>
```

## Usage Guidelines

`Modal` comprises a number of components you can compose together, and can be
used as either a controlled or uncontrolled component.

- `ModalRoot` must wrap all parts of the modal, providing context to its children.
- `ModalTrigger` wraps a `Button` component and is used to open the modal.
- `Modal` is the main component where you should place your content.
- `ModalContent` is a container for any long content within the modal, ensuring it is scrollable.
- `ModalFooter` is a container for any actions, typically buttons.
- `ModalClose` wraps a `Button` component and is used to close the modal.

`Modal` uses portals to render a popup. Please make sure you have portals
setup properly in the root of your application. See the **Getting Started**
guide for more details.

## Content

The `Modal` component accepts a `heading` and `description` prop for the main
content. It is recommended that you use these props to ensure proper spacing
and alignment of content within the modal. However you can also pass custom
content as children to the `Modal` component, alongside a `ModalFooter`, in
which case you may need to handle the layout and spacing of the content
yourself.

If you have a lot of content within the modal, it is recommended to wrap the
content in a `ModalContent` component. This will ensure that the content is
scrollable and fits within the viewport.

If you have long content that needs to scroll on mobile, you need to set the
`fullScreen` prop to `true`, which will make the modal take up the full screen
on mobile, and ensure the content scrolls correctly.

```tsx
<ModalRoot defaultOpen={viewMode === 'docs' ? undefined : true}>
  <ModalTrigger>
    <Button>Open modal</Button>
  </ModalTrigger>
  <Modal {...args}>
    <ModalContent>
      <BodyText paragraphSpacing size="md">
        <Strong>Cheapest variable energy:</Strong> when you take energy and two other eligible
        bundle services vs standard variable tariffs offered by major suppliers (large and medium
        suppliers as defined by Ofgem), for sale nationally, excl. existing customer tariffs. Based
        on Ofgem&apos;s typical domestic usage. Payment by Direct Debit. Correct as of 13/10/2025.
        Contact us to verify. <InlineLink href="#">See UW terms and conditions.</InlineLink>
      </BodyText>
      <BodyText paragraphSpacing size="md">
        <Strong>UW Price Pledge:</Strong> Eligible new customers (from 22/04/24) who take 3 or more
        qualifying services and regularly use their Cashback Card. If a customer doesn&apos;t save
        with UW (incl. Cashback) in their first year vs their previous provider (or cheapest major
        provider where applicable), they can apply to claim the UW Price Pledge between 12 - 15
        months after their sign-up date; the pledge & no exit fees only applies to qualifying
        services taken at sign-up. When you claim, we&apos;ll assume an average Cashback Card saving
        of £160 a year (based on customer usage data from 03.04.23 to 31.03.24, for users who earned
        Cashback at least at least once a week, excluding promotional activities) or your actual
        Cashback saving if higher. Full details, eligibility and terms available{' '}
        <InlineLink href="#">here.</InlineLink>
      </BodyText>
      <BodyText paragraphSpacing size="md">
        <Strong>£400 to help you switch:</Strong> When you take a 3 or 4+ Service Bundle, we&apos;ll
        give you credit up to £400 towards any termination fees (excluding Home Insurance) you have
        to pay your current providers. You&apos;ll need to return any equipment and pay for services
        you used before you cancel. Additional requirements apply to customers who are tenants.
        Further terms apply see our Residential Products and Services{' '}
        <InlineLink href="#">terms and conditions.</InlineLink>
      </BodyText>
      <BodyText paragraphSpacing size="md">
        <Strong>Cheapest variable energy:</Strong> when you take energy and two other eligible
        bundle services vs standard variable tariffs offered by major suppliers (large and medium
        suppliers as defined by Ofgem), for sale nationally, excl. existing customer tariffs. Based
        on Ofgem&apos;s typical domestic usage. Payment by Direct Debit. Correct as of 13/10/2025.
        Contact us to verify. <InlineLink href="#">See UW terms and conditions.</InlineLink>
      </BodyText>
      <BodyText paragraphSpacing size="md">
        <Strong>UW Price Pledge:</Strong> Eligible new customers (from 22/04/24) who take 3 or more
        qualifying services and regularly use their Cashback Card. If a customer doesn&apos;t save
        with UW (incl. Cashback) in their first year vs their previous provider (or cheapest major
        provider where applicable), they can apply to claim the UW Price Pledge between 12 - 15
        months after their sign-up date; the pledge & no exit fees only applies to qualifying
        services taken at sign-up. When you claim, we&apos;ll assume an average Cashback Card saving
        of £160 a year (based on customer usage data from 03.04.23 to 31.03.24, for users who earned
        Cashback at least at least once a week, excluding promotional activities) or your actual
        Cashback saving if higher. Full details, eligibility and terms available{' '}
        <InlineLink href="#">here.</InlineLink>
      </BodyText>
      <BodyText paragraphSpacing size="md">
        <Strong>£400 to help you switch:</Strong> When you take a 3 or 4+ Service Bundle, we&apos;ll
        give you credit up to £400 towards any termination fees (excluding Home Insurance) you have
        to pay your current providers. You&apos;ll need to return any equipment and pay for services
        you used before you cancel. Additional requirements apply to customers who are tenants.
        Further terms apply see our Residential Products and Services{' '}
        <InlineLink href="#">terms and conditions.</InlineLink>
      </BodyText>
      <BodyText paragraphSpacing size="md">
        <Strong>Cheapest variable energy:</Strong> when you take energy and two other eligible
        bundle services vs standard variable tariffs offered by major suppliers (large and medium
        suppliers as defined by Ofgem), for sale nationally, excl. existing customer tariffs. Based
        on Ofgem&apos;s typical domestic usage. Payment by Direct Debit. Correct as of 13/10/2025.
        Contact us to verify. <InlineLink href="#">See UW terms and conditions.</InlineLink>
      </BodyText>
      <BodyText paragraphSpacing size="md">
        <Strong>UW Price Pledge:</Strong> Eligible new customers (from 22/04/24) who take 3 or more
        qualifying services and regularly use their Cashback Card. If a customer doesn&apos;t save
        with UW (incl. Cashback) in their first year vs their previous provider (or cheapest major
        provider where applicable), they can apply to claim the UW Price Pledge between 12 - 15
        months after their sign-up date; the pledge & no exit fees only applies to qualifying
        services taken at sign-up. When you claim, we&apos;ll assume an average Cashback Card saving
        of £160 a year (based on customer usage data from 03.04.23 to 31.03.24, for users who earned
        Cashback at least at least once a week, excluding promotional activities) or your actual
        Cashback saving if higher. Full details, eligibility and terms available{' '}
        <InlineLink href="#">here.</InlineLink>
      </BodyText>
      <BodyText paragraphSpacing size="md">
        <Strong>£400 to help you switch:</Strong> When you take a 3 or 4+ Service Bundle, we&apos;ll
        give you credit up to £400 towards any termination fees (excluding Home Insurance) you have
        to pay your current providers. You&apos;ll need to return any equipment and pay for services
        you used before you cancel. Additional requirements apply to customers who are tenants.
        Further terms apply see our Residential Products and Services{' '}
        <InlineLink href="#">terms and conditions.</InlineLink>
      </BodyText>
    </ModalContent>
    <ModalFooter>
      <ModalClose>
        <Button variant="ghost" colorScheme="functional">
          Cancel
        </Button>
      </ModalClose>
      <ModalClose>
        <Button variant="solid" colorScheme="highlight">
          Primary
        </Button>
      </ModalClose>
    </ModalFooter>
  </Modal>
</ModalRoot>
```

## Accessibility

Follows the [WAI-ARIA Dialog (Modal)](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) Pattern.

Due to the size of the Modal, all entrance and exit animations adhere to the users [reduce motion](https://www.w3.org/WAI/WCAG21/Techniques/css/C39) preference.

It is strongly recommended the modal includes a visible element which closes
the modal. By default the `Modal` has a close icon button. You can hide this
button using the `hideCloseButton` prop, so that there will always be a button
that closes the modal available to keyboard users. However we do recommend
that you only do this when providing a visible alternative, such as a `Cancel`
button.

```tsx
<ModalRoot>
  <ModalTrigger>
    <Button>Open modal</Button>
  </ModalTrigger>
  <Modal {...args}>
    <ModalFooter>
      <ModalClose>
        <Button variant="ghost" colorScheme="functional">
          Cancel
        </Button>
      </ModalClose>
      <ModalClose>
        <Button variant="solid" colorScheme="highlight">
          Primary
        </Button>
      </ModalClose>
    </ModalFooter>
  </Modal>
</ModalRoot>
```

## Uncontrolled usage

This is the recommended approach. You can use the `open` & `onOpenChange` props
on the `ModalRoot` component with your event handlers.

```tsx
<ModalRoot>
  <ModalTrigger>
    <Button>Open modal</Button>
  </ModalTrigger>
  <Modal
    heading="Hearth modal"
    description="Overlays content to request a decision or inform users of important information"
  >
    <ModalFooter>
      <ModalClose>
        <Button variant="ghost" colorScheme="grey">
          Cancel
        </Button>
      </ModalClose>
      <ModalClose>
        <Button variant="solid" colorScheme="yellow">
          Primary
        </Button>
      </ModalClose>
    </ModalFooter>
  </Modal>
</ModalRoot>
```

## Controlled usage

If you need more control over elements of the modal, then you can combine
state with the `open` and `onOpenChange` props, and control the opening and
closing of the modal outside the `ModalRoot` context.

```tsx
<div>
  <Button onClick={() => setOpen(true)}>Open modal</Button>
  <ModalRoot open={open} onOpenChange={(o: boolean) => setOpen(o)}>
    <Modal heading="Controlled modal">
      <ModalFooter>
        <Button variant="ghost" colorScheme="functional" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button variant="solid" colorScheme="highlight" onClick={() => setOpen(false)}>
          Primary
        </Button>
      </ModalFooter>
    </Modal>
  </ModalRoot>
</div>
```

## With Image

You can pass an image, such as an SVG illustration, to the `image` prop. The
`Modal` layout will automatically adjust to accommodate the image, taking up
more of the viewport height, and centre aligning the text and actions.

```tsx
<ModalRoot defaultOpen={viewMode === 'docs' ? undefined : true}>
  <ModalTrigger>
    <Button>Open modal</Button>
  </ModalTrigger>
  <Modal {...args} image={<img src={SpotSavings} alt="Savings Pig" />}>
    <ModalFooter>
      <ModalClose>
        <Button variant="outline" colorScheme="functional">
          Cancel
        </Button>
      </ModalClose>
      <ModalClose>
        <Button variant="solid" colorScheme="highlight">
          Primary
        </Button>
      </ModalClose>
    </ModalFooter>
  </Modal>
</ModalRoot>
```

## Loading

Use the `loading` and `loadingText` props to indicate a loading state within the modal.

When `loading` is `true` the `loadingText` is required for accessibility purposes.

```tsx
<ModalRoot defaultOpen={viewMode === 'docs' ? undefined : true}>
  <ModalTrigger>
    <Button>Open modal</Button>
  </ModalTrigger>
  <Modal {...args} />
</ModalRoot>
```

## Preventing dismissal

If you need users to follow the modal flow without being able to dismiss the
modal, you can use the `onPointerDownOutside`, `onEscapeKeyDown` &
`onInteractOutside` props on `Modal` to prevent the modal from closing when
users click outside of the modal or press the escape key.

```tsx
<Modal
  onPointerDownOutside={event => event.preventDefault()}
  onEscapeKeyDown={event => event.preventDefault()}
  onInteractOutside={event => event.preventDefault()}
>
  {/* Modal content */}
</Modal>
```

```tsx
<ModalRoot>
  <ModalTrigger>
    <Button>Open modal</Button>
  </ModalTrigger>
  <Modal
    {...args}
    onEscapeKeyDown={e => e.preventDefault()}
    onPointerDownOutside={e => e.preventDefault()}
    hideCloseButton
  >
    <ModalFooter>
      <ModalClose>
        <Button variant="ghost" colorScheme="functional">
          Cancel
        </Button>
      </ModalClose>
      <ModalClose>
        <Button variant="solid" colorScheme="highlight">
          Primary
        </Button>
      </ModalClose>
    </ModalFooter>
  </Modal>
</ModalRoot>
```

### ModalRoot

This component is based on [Radix UI's Dialog primitive](https://www.radix-ui.com/primitives/docs/components/dialog).

### Modal

This component is based on Radix UI's Dialog primitive and supports the following common props:

- Margin

| Prop                   | Type                                                              | Default | Description                                                                                                                                                                               |
| ---------------------- | ----------------------------------------------------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `image`                | `ReactNode`                                                       | —       |                                                                                                                                                                                           |
| `container`            | `Element \| DocumentFragment \| null`                             | —       | Specify a container element to portal the content into.                                                                                                                                   |
| `forceMount`           | `true`                                                            | —       | Used to force mounting when more control is needed. Useful when controlling animation with React animation libraries.                                                                     |
| `heading`              | `string`                                                          | —       |                                                                                                                                                                                           |
| `onEscapeKeyDown`      | `((event: KeyboardEvent) => void)`                                | —       | Event handler called when the escape key is down. Can be prevented.                                                                                                                       |
| `onPointerDownOutside` | `((event: PointerDownOutsideEvent) => void)`                      | —       | Event handler called when the a `pointerdown` event happens outside of the `DismissableLayer`. Can be prevented.                                                                          |
| `onFocusOutside`       | `((event: FocusOutsideEvent) => void)`                            | —       | Event handler called when the focus moves outside of the `DismissableLayer`. Can be prevented.                                                                                            |
| `onInteractOutside`    | `((event: PointerDownOutsideEvent \| FocusOutsideEvent) => void)` | —       | Event handler called when an interaction happens outside the `DismissableLayer`. Specifically, when a `pointerdown` event happens outside or focus moves outside of it. Can be prevented. |
| `onOpenAutoFocus`      | `((event: Event) => void)`                                        | —       | Event handler called when auto-focusing on open. Can be prevented.                                                                                                                        |
| `onCloseAutoFocus`     | `((event: Event) => void)`                                        | —       | Event handler called when auto-focusing on close. Can be prevented.                                                                                                                       |
| `description`          | `string`                                                          | —       |                                                                                                                                                                                           |
| `hideCloseButton`      | `boolean`                                                         | —       |                                                                                                                                                                                           |
| `fullScreen`           | `boolean`                                                         | —       |                                                                                                                                                                                           |
| `loadingText`          | `string`                                                          | —       | @deprecated Please use loadingHeading and loadingDescription instead                                                                                                                      |
| `loadingHeading`       | `string`                                                          | —       |                                                                                                                                                                                           |
| `loadingDescription`   | `string`                                                          | —       |                                                                                                                                                                                           |
| `loading`              | `boolean`                                                         | —       |                                                                                                                                                                                           |
