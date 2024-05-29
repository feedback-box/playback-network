/* eslint-disable */
"use client";
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  SwitchField,
  TextAreaField,
  TextField,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { createTask } from "./graphql/mutations";
const client = generateClient();
export default function TaskCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    mediaId: "",
    aiModelId: "",
    walletAddress: "",
    medias: "",
    name: "",
    description: "",
    difficulty: "",
    app: "",
    appImage: "",
    priceListed: "",
    status: "",
    published: false,
    createdAt: "",
  };
  const [mediaId, setMediaId] = React.useState(initialValues.mediaId);
  const [aiModelId, setAiModelId] = React.useState(initialValues.aiModelId);
  const [walletAddress, setWalletAddress] = React.useState(
    initialValues.walletAddress
  );
  const [medias, setMedias] = React.useState(initialValues.medias);
  const [name, setName] = React.useState(initialValues.name);
  const [description, setDescription] = React.useState(
    initialValues.description
  );
  const [difficulty, setDifficulty] = React.useState(initialValues.difficulty);
  const [app, setApp] = React.useState(initialValues.app);
  const [appImage, setAppImage] = React.useState(initialValues.appImage);
  const [priceListed, setPriceListed] = React.useState(
    initialValues.priceListed
  );
  const [status, setStatus] = React.useState(initialValues.status);
  const [published, setPublished] = React.useState(initialValues.published);
  const [createdAt, setCreatedAt] = React.useState(initialValues.createdAt);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setMediaId(initialValues.mediaId);
    setAiModelId(initialValues.aiModelId);
    setWalletAddress(initialValues.walletAddress);
    setMedias(initialValues.medias);
    setName(initialValues.name);
    setDescription(initialValues.description);
    setDifficulty(initialValues.difficulty);
    setApp(initialValues.app);
    setAppImage(initialValues.appImage);
    setPriceListed(initialValues.priceListed);
    setStatus(initialValues.status);
    setPublished(initialValues.published);
    setCreatedAt(initialValues.createdAt);
    setErrors({});
  };
  const validations = {
    mediaId: [],
    aiModelId: [],
    walletAddress: [],
    medias: [{ type: "JSON" }],
    name: [],
    description: [],
    difficulty: [],
    app: [],
    appImage: [],
    priceListed: [],
    status: [],
    published: [],
    createdAt: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  const convertToLocal = (date) => {
    const df = new Intl.DateTimeFormat("default", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      calendar: "iso8601",
      numberingSystem: "latn",
      hourCycle: "h23",
    });
    const parts = df.formatToParts(date).reduce((acc, part) => {
      acc[part.type] = part.value;
      return acc;
    }, {});
    return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}`;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          mediaId,
          aiModelId,
          walletAddress,
          medias,
          name,
          description,
          difficulty,
          app,
          appImage,
          priceListed,
          status,
          published,
          createdAt,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: createTask.replaceAll("__typename", ""),
            variables: {
              input: {
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "TaskCreateForm")}
      {...rest}
    >
      <TextField
        label="Media id"
        isRequired={false}
        isReadOnly={false}
        value={mediaId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              mediaId: value,
              aiModelId,
              walletAddress,
              medias,
              name,
              description,
              difficulty,
              app,
              appImage,
              priceListed,
              status,
              published,
              createdAt,
            };
            const result = onChange(modelFields);
            value = result?.mediaId ?? value;
          }
          if (errors.mediaId?.hasError) {
            runValidationTasks("mediaId", value);
          }
          setMediaId(value);
        }}
        onBlur={() => runValidationTasks("mediaId", mediaId)}
        errorMessage={errors.mediaId?.errorMessage}
        hasError={errors.mediaId?.hasError}
        {...getOverrideProps(overrides, "mediaId")}
      ></TextField>
      <TextField
        label="Ai model id"
        isRequired={false}
        isReadOnly={false}
        value={aiModelId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              mediaId,
              aiModelId: value,
              walletAddress,
              medias,
              name,
              description,
              difficulty,
              app,
              appImage,
              priceListed,
              status,
              published,
              createdAt,
            };
            const result = onChange(modelFields);
            value = result?.aiModelId ?? value;
          }
          if (errors.aiModelId?.hasError) {
            runValidationTasks("aiModelId", value);
          }
          setAiModelId(value);
        }}
        onBlur={() => runValidationTasks("aiModelId", aiModelId)}
        errorMessage={errors.aiModelId?.errorMessage}
        hasError={errors.aiModelId?.hasError}
        {...getOverrideProps(overrides, "aiModelId")}
      ></TextField>
      <TextField
        label="Wallet address"
        isRequired={false}
        isReadOnly={false}
        value={walletAddress}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              mediaId,
              aiModelId,
              walletAddress: value,
              medias,
              name,
              description,
              difficulty,
              app,
              appImage,
              priceListed,
              status,
              published,
              createdAt,
            };
            const result = onChange(modelFields);
            value = result?.walletAddress ?? value;
          }
          if (errors.walletAddress?.hasError) {
            runValidationTasks("walletAddress", value);
          }
          setWalletAddress(value);
        }}
        onBlur={() => runValidationTasks("walletAddress", walletAddress)}
        errorMessage={errors.walletAddress?.errorMessage}
        hasError={errors.walletAddress?.hasError}
        {...getOverrideProps(overrides, "walletAddress")}
      ></TextField>
      <TextAreaField
        label="Medias"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              mediaId,
              aiModelId,
              walletAddress,
              medias: value,
              name,
              description,
              difficulty,
              app,
              appImage,
              priceListed,
              status,
              published,
              createdAt,
            };
            const result = onChange(modelFields);
            value = result?.medias ?? value;
          }
          if (errors.medias?.hasError) {
            runValidationTasks("medias", value);
          }
          setMedias(value);
        }}
        onBlur={() => runValidationTasks("medias", medias)}
        errorMessage={errors.medias?.errorMessage}
        hasError={errors.medias?.hasError}
        {...getOverrideProps(overrides, "medias")}
      ></TextAreaField>
      <TextField
        label="Name"
        isRequired={false}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              mediaId,
              aiModelId,
              walletAddress,
              medias,
              name: value,
              description,
              difficulty,
              app,
              appImage,
              priceListed,
              status,
              published,
              createdAt,
            };
            const result = onChange(modelFields);
            value = result?.name ?? value;
          }
          if (errors.name?.hasError) {
            runValidationTasks("name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("name", name)}
        errorMessage={errors.name?.errorMessage}
        hasError={errors.name?.hasError}
        {...getOverrideProps(overrides, "name")}
      ></TextField>
      <TextField
        label="Description"
        isRequired={false}
        isReadOnly={false}
        value={description}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              mediaId,
              aiModelId,
              walletAddress,
              medias,
              name,
              description: value,
              difficulty,
              app,
              appImage,
              priceListed,
              status,
              published,
              createdAt,
            };
            const result = onChange(modelFields);
            value = result?.description ?? value;
          }
          if (errors.description?.hasError) {
            runValidationTasks("description", value);
          }
          setDescription(value);
        }}
        onBlur={() => runValidationTasks("description", description)}
        errorMessage={errors.description?.errorMessage}
        hasError={errors.description?.hasError}
        {...getOverrideProps(overrides, "description")}
      ></TextField>
      <TextField
        label="Difficulty"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={difficulty}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              mediaId,
              aiModelId,
              walletAddress,
              medias,
              name,
              description,
              difficulty: value,
              app,
              appImage,
              priceListed,
              status,
              published,
              createdAt,
            };
            const result = onChange(modelFields);
            value = result?.difficulty ?? value;
          }
          if (errors.difficulty?.hasError) {
            runValidationTasks("difficulty", value);
          }
          setDifficulty(value);
        }}
        onBlur={() => runValidationTasks("difficulty", difficulty)}
        errorMessage={errors.difficulty?.errorMessage}
        hasError={errors.difficulty?.hasError}
        {...getOverrideProps(overrides, "difficulty")}
      ></TextField>
      <TextField
        label="App"
        isRequired={false}
        isReadOnly={false}
        value={app}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              mediaId,
              aiModelId,
              walletAddress,
              medias,
              name,
              description,
              difficulty,
              app: value,
              appImage,
              priceListed,
              status,
              published,
              createdAt,
            };
            const result = onChange(modelFields);
            value = result?.app ?? value;
          }
          if (errors.app?.hasError) {
            runValidationTasks("app", value);
          }
          setApp(value);
        }}
        onBlur={() => runValidationTasks("app", app)}
        errorMessage={errors.app?.errorMessage}
        hasError={errors.app?.hasError}
        {...getOverrideProps(overrides, "app")}
      ></TextField>
      <TextField
        label="App image"
        isRequired={false}
        isReadOnly={false}
        value={appImage}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              mediaId,
              aiModelId,
              walletAddress,
              medias,
              name,
              description,
              difficulty,
              app,
              appImage: value,
              priceListed,
              status,
              published,
              createdAt,
            };
            const result = onChange(modelFields);
            value = result?.appImage ?? value;
          }
          if (errors.appImage?.hasError) {
            runValidationTasks("appImage", value);
          }
          setAppImage(value);
        }}
        onBlur={() => runValidationTasks("appImage", appImage)}
        errorMessage={errors.appImage?.errorMessage}
        hasError={errors.appImage?.hasError}
        {...getOverrideProps(overrides, "appImage")}
      ></TextField>
      <TextField
        label="Price listed"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={priceListed}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              mediaId,
              aiModelId,
              walletAddress,
              medias,
              name,
              description,
              difficulty,
              app,
              appImage,
              priceListed: value,
              status,
              published,
              createdAt,
            };
            const result = onChange(modelFields);
            value = result?.priceListed ?? value;
          }
          if (errors.priceListed?.hasError) {
            runValidationTasks("priceListed", value);
          }
          setPriceListed(value);
        }}
        onBlur={() => runValidationTasks("priceListed", priceListed)}
        errorMessage={errors.priceListed?.errorMessage}
        hasError={errors.priceListed?.hasError}
        {...getOverrideProps(overrides, "priceListed")}
      ></TextField>
      <TextField
        label="Status"
        isRequired={false}
        isReadOnly={false}
        value={status}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              mediaId,
              aiModelId,
              walletAddress,
              medias,
              name,
              description,
              difficulty,
              app,
              appImage,
              priceListed,
              status: value,
              published,
              createdAt,
            };
            const result = onChange(modelFields);
            value = result?.status ?? value;
          }
          if (errors.status?.hasError) {
            runValidationTasks("status", value);
          }
          setStatus(value);
        }}
        onBlur={() => runValidationTasks("status", status)}
        errorMessage={errors.status?.errorMessage}
        hasError={errors.status?.hasError}
        {...getOverrideProps(overrides, "status")}
      ></TextField>
      <SwitchField
        label="Published"
        defaultChecked={false}
        isDisabled={false}
        isChecked={published}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              mediaId,
              aiModelId,
              walletAddress,
              medias,
              name,
              description,
              difficulty,
              app,
              appImage,
              priceListed,
              status,
              published: value,
              createdAt,
            };
            const result = onChange(modelFields);
            value = result?.published ?? value;
          }
          if (errors.published?.hasError) {
            runValidationTasks("published", value);
          }
          setPublished(value);
        }}
        onBlur={() => runValidationTasks("published", published)}
        errorMessage={errors.published?.errorMessage}
        hasError={errors.published?.hasError}
        {...getOverrideProps(overrides, "published")}
      ></SwitchField>
      <TextField
        label="Created at"
        isRequired={false}
        isReadOnly={false}
        type="datetime-local"
        value={createdAt && convertToLocal(new Date(createdAt))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              mediaId,
              aiModelId,
              walletAddress,
              medias,
              name,
              description,
              difficulty,
              app,
              appImage,
              priceListed,
              status,
              published,
              createdAt: value,
            };
            const result = onChange(modelFields);
            value = result?.createdAt ?? value;
          }
          if (errors.createdAt?.hasError) {
            runValidationTasks("createdAt", value);
          }
          setCreatedAt(value);
        }}
        onBlur={() => runValidationTasks("createdAt", createdAt)}
        errorMessage={errors.createdAt?.errorMessage}
        hasError={errors.createdAt?.hasError}
        {...getOverrideProps(overrides, "createdAt")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
