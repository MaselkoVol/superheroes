import {
  Button,
  ButtonGroup,
  Content,
  Dialog,
  DialogTrigger,
  Divider,
  Heading,
  InlineAlert,
  View,
} from "@adobe/react-spectrum";
import { DeleteSuperheroControl } from "../../common/types/superhero";
import { useState } from "react";

export type DeleteSuperheroButtonProps = {
  control: DeleteSuperheroControl;
};

export function DeleteSuperheroButton({ control }: DeleteSuperheroButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <DialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
      <Button variant="negative">Delete</Button>
      <Dialog>
        <Heading>Confirm Deletion</Heading>
        <Divider />
        <Content>
          <View marginBottom="size-200">
            Do you really want to delete this superhero? This action cannot be
            undone.
          </View>
          {control.error && (
            <InlineAlert variant="negative">
              <Heading>Deletion Failed</Heading>
              <Content>{control.error.message}</Content>
            </InlineAlert>
          )}
        </Content>
        <ButtonGroup>
          <Button variant="secondary" onPress={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button
            isPending={control.isDeleting}
            variant="negative"
            onPress={() => {
              setIsOpen(false);
              requestAnimationFrame(control.onDeleted);
            }}
          >
            Confirm
          </Button>
        </ButtonGroup>
      </Dialog>
    </DialogTrigger>
  );
}
