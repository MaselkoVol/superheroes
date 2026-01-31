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
import { useCreateSuperhero } from "./hooks/use-create-superhero";
import { ImagesForm } from "../../components/new-images-form";
import { SuperheroInfoForm } from "../../components/superhero-info-form";
import { SuperpowersForm } from "../../components/superpowers-form";
import { FormHeader } from "../../components/form-header";
import { routes } from "../../common/routes";

export default function CreateSuperheroPage() {
  const { info, images, onSubmit, superpowers, isLoading, error } =
    useCreateSuperhero();

  return (
    <View paddingX={"size-1000"} paddingY={"size-200"}>
      <Flex justifyContent={"center"}>
        <Flex direction={"column"} alignItems={"start"}>
          <FormHeader
            linkLabel="Go home"
            linkUrl={routes.goHome()}
            message="Create superhero"
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
            <ImagesForm images={images} />

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
