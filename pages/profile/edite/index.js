import styles from './edit.module.css'

export default function EditProfilePage(){
    return(
        <div className={styles.EditProfileContainer}>
            <div className={styles.EditProfileForm}>
                <div className={styles.EditProfileLine}>
                    
                    <div>
                    <p className={[styles.EditProfileLabels]}>Nome</p>
                        <select name="Dr" id="" className={styles.EditProfileSelect}>
                            <option value="Dr.">Dr.</option>
                            <option value="Dra.">Dra.</option>
                        </select>
                        <input type="text" className={[styles.EditProfileInputFild]} placeholder="Digite seu nome" />
                    </div>
                </div>

                <div className={styles.EditProfileLine}>      
                    <div className={styles.EditProfileColumn}>
                        <p className={[styles.EditProfileLabels]}>Especialidade</p>
                        <input type="text" className={[styles.EditProfileInputFild]} placeholder="Neuro funcional" />
                    </div>
                    <div>
                        <p className={[styles.EditProfileLabels]}>Crefito</p>
                        <input type="text" className={[styles.EditProfileInputFild]} placeholder="123456-A" />
                    </div>
                </div>
                <div className={styles.EditProfileLine}>      
                    <div className={styles.EditProfileColumn}>
                        <p className={[styles.EditProfileLabels]}>Resumo</p>
                        <textarea type="text" 
                        className={`${styles["EditProfileInputFild"]} ${styles["EditProfileTextArea"]}`}
                        placeholder="Conte um pouco da sua história profissional"
                        />
                    </div>
                </div>
                <div className={styles.EditProfileLine}>      
                    <div className={styles.EditProfileColumn}>
                        <p className={[styles.EditProfileLabels]}>Whatsapp</p>
                        <input type="text" className={[styles.EditProfileInputFild]} placeholder="01 92345 6789" />
                    </div>
                    <div>
                        <p className={[styles.EditProfileLabels]}>E-mail</p>
                        <input type="text" className={[styles.EditProfileInputFild]} placeholder="seu@email.com" />
                    </div>
                </div>
                <div className={styles.EditProfileLine}>      
                    <div className={styles.EditProfileColumn}>
                        <p className={[styles.EditProfileLabels]}>Endereço</p>
                        <textarea type="text" 
                        className={`${styles["EditProfileInputFild"]} ${styles["EditProfileEndereco"]}`}
                        placeholder="Seu endereço comercial"
                        />
                    </div>
                </div>
            </div>
            <div className={styles.EditProfileImageSection}>
                <div className={styles.ProfileImageBorder}>
                        <img src="/assets/thais.webp" alt="Profile Image" />
                </div>
                <div className='ScalableButton'>
                    <label onChange={()=> console.log('pequei')} htmlFor="formId">
                            <input name="" type="file" id="formId" hidden />
                            <h2 className={styles.editProfileUploadButton}>Carregar imagem</h2>
                    </label>
                </div>

            </div>
        </div>
    )
}