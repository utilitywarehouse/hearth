# Dialog

## Associated components

Decisions here may have an impact on the following components:

- Modal
- BottomSheet
- Select

## Design

[Figma](https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=1-166&m=dev)

## Implementation constraints

- [Radix UI Dialog primitive](https://www.radix-ui.com/primitives/docs/components/dialog)

## API

```tsx
<Dialog>
  <DialogTrigger>
    <Button>Edit profile</Button>
  </DialogTrigger>

  <DialogContent
    heading="Edit profile"
    description="Make changes to your profile."
  >
    {...}
    <DialogFooter>
      <DialogClose>
        <Button>Cancel</Button>
      </DialogClose>
      <DialogClose>
        <Button>Save</Button>
      </DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

**Notes**

- I'm assuming the `DialogTrigger` can be left out if the component is controlled?
- Same with the `DialogClose` components
- We can apply `asChild` internally on both of the above
- a controlled component (which is possibly going to be more likely?) will require less sub-components, as the open/close can be controlled via state.
- we don't need an onClose, this can be handled with onOpenChange
- I'm not sure we need an onClose prop that hooks up to the close button icon,
  this should be handled with the onOpenChange prop
- We can have a `hideClose` prop which hides the close icon button but keeps it
  available to screenreaders

```tsx
<Dialog.Root
  open={open}
  onOpenChange={open => {
    // Do stuff when the dialog is closed
    if (!open) {
      doStuff();
    }
    // Set the new state
    setOpen(open);
  }}
/>
```

**Uncontrolled**

```tsx
<Dialog>
  <DialogTrigger>
		<Button>Edit profile</Button>
	</DialogTrigger>
  <DialogContent
    heading="Edit profile"
    description="Make changes to your profile."
    hideClose
  >

    <BodyText>{...}</BodyText>

    <DialogFooter>
      <DialogClose>
        <Button>Cancel</Button>
      </DialogClose>
      <DialogClose>
        <Button>Save</Button>
      </DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

**Controlled**

```tsx
const [open, setOpen] = React.useState(false);

<Button onClick={()=> setOpen(true)}>Edit profile</Button>

<Dialog>
  <DialogContent
    heading="Edit profile"
    description="Make changes to your profile."
    hideClose
  >
    <DialogFooter>
      <Button onClick={()=>setOpen(false)}>Cancel</Button>
      <Button onClick={()=>setOpen(false)}>Save</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```
