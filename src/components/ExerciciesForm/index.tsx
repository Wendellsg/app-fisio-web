"use client";
import { useState } from "react";
import { RiSave2Fill } from "react-icons/ri";
import { useExercises } from "../../hooks";
import { useUploader } from "../../hooks/useUploader/useUploader";
import { Exercise } from "../../types";
import { ImageInput } from "../molecules/Imageinput";
import { VideoInput } from "../molecules/VideoInput";
import { Input } from "../ui/input";
import { Select } from "../molecules/Select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

export const ExerciciesForm = ({
  onSubmit,
  exercise,
}: {
  onSubmit: () => void;
  exercise: Exercise;
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

  const { createExercise, updateExercise } = useExercises();

  async function handleSave() {
    setSubmitting(true);

    const payload = {
      ...exercise,
      ...newExercise,
      image: newExercise.image,
      video: newExercise.video,
    };

    if (exercise._id) {
      await updateExercise(payload as Exercise);
      setSubmitting(false);
      return;
    }

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
    <div className="flex w-full justify-start items-start flex-col max-w-full  gap-4 ">
      <Input
        value={newExercise.name}
        name="name"
        onChange={(e) => {
          setNewExercise({
            ...newExercise,
            name: e.target.value,
          });
        }}
        placeholder="Nome do exercício"
        type={"text"}
        width="100%"
      />

      <Select
        value={newExercise.category!}
        onChange={(value) => {
          setNewExercise({
            ...newExercise,
            category: value,
          });
        }}
        placeholder="Categoria"
        options={[
          { value: "Pescoço", label: "Pescoço" },
          { value: "Cabeça", label: "Cabeça" },
          { value: "Perna", label: "Perna" },
        ]}
      />

      <Textarea
        value={newExercise.description}
        name="description"
        onChange={(e) => {
          setNewExercise({
            ...newExercise,
            description: e.target.value,
          });
        }}
        placeholder="Descrição do exercício"
      />

      <Textarea
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
   
        onChange={(file: File) => {
          setVideoFile(file);
          setNewExercise({
            ...newExercise,
            video: URL.createObjectURL(file),
          });
        }}
        classname="w-full h-fit"
        value={newExercise.video}
        label={"Video"}
        name={newExercise.name}
      />
      <div className="flex gap-4 items-center mt-4 w-full justify-center">
        <Button onClick={onSubmit} className="w-36" variant="destructive">
          Cancelar
        </Button>
        <Button
          onClick={handleSave}
          className="w-36"
          disabled={submitting}
          type="submit"
        >
          Salvar <RiSave2Fill />
        </Button>
      </div>
    </div>
  );
};
