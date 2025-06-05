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
   <!-- I'm assuming this can be left out if the component is controlled? -->
	<DialogTrigger> <!--  apply asChild internally -->
		<Button>Edit profile</Button>
	</DialogTrigger>

	<DialogContent
    heading="Edit profile"
    description="Make changes to your profile."
    close/closeable/dissmissable
  >
		{...}
		<Flex gap="300" justifyContent="end">
			<DialogClose> <!--  apply asChild internally -->
				<Button>
					Cancel
				</Button>
			</DialogClose>
      <!--  or -->
			<DialogButton primary>Save</DialogButton>
		</Flex>
      <!--  or -->
    <DialogActions> <!--  this is probably clearer, we're going to need to know which button has been clicked -->
      <DialogButton>Cancel</DialogButton>
      <DialogButton primary>Save</DialogButton>
    </DialogActions>
	</DialogContent>
</Dialog>
```

**Notes**

- a controlled component (which is possibly going to be more likely?) will require less sub-components, as the open/close can be controlled via state.
- we don't need an onClose, this can be handled with onOpenChange

```tsx
<Dialog.Root
  open={open}
  onOpenChange={(open) => {
    // Do stuff when the dialog is closed
    if (!open) {
      doStuff();
    }
    // Set the new state
    setOpen(open);
  }}
>
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
    // hideClose
    onClose={handleClose}
  >
    <BodyText>{...}</BodyText>
    <DialogFooter>
      <DialogButton>
        <Button>Cancel</Button>
      </DialogButton>
      <DialogButton>
        <Button>Save</Button>
      </DialogButton>
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
    maxWidth="450px"
    heading="Edit profile"
    description="Make changes to your profile."
    // hideClose
    onClose={handleClose}
  >
    <DialogFooter>
      <Button onClick={()=>setOpen(false)}>Cancel</Button>
      <Button onClick={()=>setOpen(false)}>Save</Button>
    </DialogFooter>
	</DialogContent>
</Dialog>
```




