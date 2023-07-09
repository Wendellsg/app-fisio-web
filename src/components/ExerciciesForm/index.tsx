import { useState } from "react";
import { RiSave2Fill } from "react-icons/ri";
import { useExercises } from "../../hooks";
import { useUploader } from "../../hooks/useUploader/useUploader";
import { Exercise } from "../../types";
import { Box } from "../atoms/layouts";
import { DefaultButton } from "../molecules/Buttons";
import { ImageInput } from "../molecules/Imageinput";
import { Select } from "../molecules/Select";
import { VideoInput } from "../molecules/VideoInput";
import { Input, TextArea } from "../molecules/forms";

export const ExerciciesForm = ({
  onSubmit,
  exercise,
}: {
  onSubmit: () => void;
  exercise?: Exercise;
}) => {
  const [newExercise, setNewExercise] = useState<Partial<Exercise>>({
    name: exercise?.name || "",
    category: exercise?.category || "",
    description: exercise?.description || "",
    image:
      exercise?.image ||
      "https://static.vecteezy.com/system/resources/previews/001/981/092/original/interracial-athletes-exercising-together-free-vector.jpg",
    summary: exercise?.summary || "",
    video: exercise?.video || "",
  });

  const [submitting, setSubmitting] = useState<boolean>(false);

  const { upload } = useUploader();

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const { createExercise } = useExercises();

  async function handleSave() {
    setSubmitting(true);

    const payload = {
      ...newExercise,
      image: newExercise.image,
      video: newExercise.video,
    };

    if (imageFile) {
      const imageUploaded = await upload(imageFile);
      payload.image = imageUploaded;
    }

    if (videoFile) {
      const videoUploaded = await upload(videoFile);
      payload.video = videoUploaded;
    }

    await createExercise(payload as Exercise);
    setSubmitting(false);

    onSubmit();
  }

  return (
    <Box
      width="100%"
      justifyContent="flex-start"
      alignItems="flex-start"
      gap="1.5rem"
      flexDirection="column"
    >
      <Box gap="1rem" width="100%">
        <Input
          value={newExercise.name}
          name="name"
          label="Nome do exercício"
          onChange={(e) => {
            setNewExercise({
              ...newExercise,
              name: e.target.value,
            });
          }}
          minWidth="4rem"
          placeholder="Nome do exercício"
          type={"text"}
          width="100%"
        />

        <Select
          label="Categoria"
          value={{
            value: newExercise.category,
            label: newExercise.category,
          }}
          onChange={(value) => {
            setNewExercise({
              ...newExercise,
              category: value.value,
            });
          }}
          width="150px"
          minWidth="150px"
          options={[
            { value: "Pescoço", label: "Pescoço" },
            { value: "Cabeça", label: "Cabeça" },
            { value: "Perna", label: "Perna" },
          ]}
        />
      </Box>

      <TextArea
        label="Descrição"
        value={newExercise.description}
        name="description"
        onChange={(e) => {
          setNewExercise({
            ...newExercise,
            description: e.target.value,
          });
        }}
        placeholder="Descrição do exercício"
        width="100%"
      />

      <TextArea
        label="Sumário"
        value={newExercise.summary}
        name="summary"
        onChange={(e) => {
          setNewExercise({
            ...newExercise,
            summary: e.target.value,
          });
        }}
        placeholder="Sumário do exercício"
      />
      <ImageInput
        width={"250px"}
        height={"360px"}
        Border={"2px dotted black"}
        onChange={(file: File) => {
          setImageFile(file);
          setNewExercise({
            ...newExercise,
            image: URL.createObjectURL(file),
          });
        }}
        value={newExercise.image}
        label={"Imagem"}
        name={"image"}
        borderRadius={"10px"}
        placeholder={"Imagem do exercício"}
      />
      <VideoInput
        width={"100%"}
        height={"auto"}
        onChange={(file: File) => {
          setVideoFile(file);
          setNewExercise({
            ...newExercise,
            video: URL.createObjectURL(file),
          });
        }}
        value={newExercise.video}
        label={"Video"}
        name={newExercise.name}
      />
      <Box
        gap="1rem"
        flexWrap="wrap"
        style={{
          marginTop: "1rem",
        }}
        width="100%"
        alignItems="center"
        justifyContent="center"
      >
        <DefaultButton
          onClick={onSubmit}
          width="150px"
          text="Cancelar"
          type="negation"
        />
        <DefaultButton
          onClick={handleSave}
          width="150px"
          text="Salvar"
          isLoading={submitting}
          type="submit"
          icon={<RiSave2Fill />}
        />
      </Box>
    </Box>
  );
};
