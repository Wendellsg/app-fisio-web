import { useState } from "react";
import { useUploader } from "../../../src/hooks/useUploader/useUploader";
import styles from "./edit.module.css";
import { RiSave2Fill } from "react-icons/ri";

export default function EditProfilePage() {
  const { upload } = useUploader();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target?.files?.[0];
    setImageFile(file);
    if (!file) return;
    const url = URL?.createObjectURL(file);
    setImageUrl(url);
  };

  return (
    <div className={styles.EditProfileContainer}>
      <div className={styles.EditProfileForm}>
        <div className={styles.EditProfileLine}>
          <div
            className={styles.EditProfileColumn}
            style={{ width: "63px", alignSelf: "flex-start" }}
          >
            <p className={styles.EditProfileLabels}>Nome</p>
            <select name="Dr" id="" className={styles.EditProfileSelect}>
              <option value="Dr.">Dr.</option>
              <option value="Dra.">Dra.</option>
            </select>
          </div>
          <div className={styles.EditProfileColumn}>
            <input
              type="text"
              className={styles.EditProfileInputFild}
              placeholder="Digite seu nome"
            />
          </div>
        </div>

        <div className={styles.EditProfileLine}>
          <div className={styles.EditProfileColumn}>
            <p className={styles.EditProfileLabels}>Especialidade</p>
            <input
              type="text"
              className={styles.EditProfileInputFild}
              placeholder="Neuro funcional"
            />
          </div>
          <div className={styles.EditProfileColumn}>
            <p className={styles.EditProfileLabels}>Crefito</p>
            <input
              type="text"
              className={styles.EditProfileInputFild}
              placeholder="123456-A"
            />
          </div>
        </div>
        <div className={styles.EditProfileLine}>
          <div className={styles.EditProfileColumn}>
            <p className={styles.EditProfileLabels}>Resumo</p>
            <textarea
              className={`${styles["EditProfileInputFild"]} ${styles["EditProfileTextArea"]}`}
              placeholder="Conte um pouco da sua história profissional"
            />
          </div>
        </div>
        <div className={styles.EditProfileLine}>
          <div className={styles.EditProfileColumn}>
            <p className={styles.EditProfileLabels}>Whatsapp</p>
            <input
              type="text"
              className={styles.EditProfileInputFild}
              placeholder="01 92345 6789"
            />
          </div>
          <div className={styles.EditProfileColumn}>
            <p className={styles.EditProfileLabels}>E-mail</p>
            <input
              type="text"
              className={styles.EditProfileInputFild}
              placeholder="seu@email.com"
            />
          </div>
        </div>
        <div className={styles.EditProfileLine}>
          <div className={styles.EditProfileColumn}>
            <p className={styles.EditProfileLabels}>Endereço</p>
            <textarea
              className={`${styles["EditProfileInputFild"]} ${styles["EditProfileEndereco"]}`}
              placeholder="Seu endereço comercial"
            />
          </div>
        </div>
      </div>
      <div className={styles.EditProfileImageSection}>
        <div className={styles.ProfileImageBorder}>
          <img src={imageUrl || "/assets/thais.webp"} alt="Profile Image" />
        </div>
        <div className="ScalableButton">
          <label htmlFor="formId">
            <input
              name=""
              type="file"
              id="formId"
              hidden
              onChange={handleFileChange}
            />
            <h2 className={styles.editProfileUploadButton}>Carregar imagem</h2>
          </label>
        </div>

        <div
          className={`${styles["EditPerfilSaveContainer"]} "ScalableButton"`}
          onClick={() => {
            if (imageFile) {
              upload(imageFile);
            }
          }}
        >
          <p>Salvar</p>
          <RiSave2Fill
            color={"#000"}
            size={40}
            style={{ minWidth: "20px" }}
            className={styles.EditPerfilSaveIcon}
          />
        </div>
      </div>
    </div>
  );
}
