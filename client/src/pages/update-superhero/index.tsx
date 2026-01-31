import {
  Button,
  Content,
  Flex,
  Form,
  Heading,
  InlineAlert,
  View,
} from "@adobe/react-spectrum";
import { Fragment } from "react/jsx-runtime";
import { FormHeader } from "../../components/form-header";
import { ImagesForm } from "../../components/new-images-form";
import { SuperheroInfoForm } from "../../components/superhero-info-form";
import { SuperpowersForm } from "../../components/superpowers-form";
import { useUpdateSuperhero } from "./hooks/use-update-superhero";
import { SelectImagesForm } from "./select-images-form";

export default function UpdateSuperheroPage() {
  const {
    info,
    newImages,
    selectedImages,
    linkBack,
    onSubmit,
    superpowers,
    isLoading,
    error,
  } = useUpdateSuperhero();

  return (
    <View paddingX={"size-1000"} paddingY={"size-200"}>
      <Flex justifyContent={"center"}>
        <Flex direction={"column"} alignItems={"start"}>
          <FormHeader
            linkLabel="Go back"
            message="Update superhero"
            linkUrl={linkBack}
          />
          <Form
            width={"size-3600"}
            onSubmit={onSubmit}
            validationBehavior="aria"
            validationErrors={info.errors}
          >
            <SuperheroInfoForm
              data={info.data}
              onBlur={info.onBlur}
              onInfoChanged={info.onInfoChanged}
            />
            <SuperpowersForm superpowers={superpowers} />
            <SelectImagesForm control={selectedImages} />
            <ImagesForm images={newImages} />

            {error ? (
              <InlineAlert variant="negative">
                <Heading>Submission Failed</Heading>
                <Content>{error.message}</Content>
              </InlineAlert>
            ) : (
              <Fragment />
            )}
            <Button
              isPending={isLoading}
              marginTop={"size-400"}
              type="submit"
              variant="accent"
            >
              Submit
            </Button>
          </Form>
        </Flex>
      </Flex>
    </View>
  );
}
